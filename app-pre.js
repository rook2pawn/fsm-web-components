const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

<? 
my $path = "./components";
opendir my $dir, $path or die "Cannot open directory: $!";

my @rawdir = readdir($dir);
close $dir;
my @dir;

foreach(@rawdir){
    if ($_  eq '.' or $_ eq '..') {
       next;
    }
    if (-f $path . "/" . $_ ){
#        print $_,"   : file\n";
    }elsif(-d $path . "/" . $_){
        push @dir, $_;
#        print $_,"   : folder\n";
    }else{
#        print $_,"   : other\n";
    }
}

foreach (@dir) {
    my $lcname = $_;
    my $ucname = ucfirst $_;
    print "const $ucname = require('./components/$lcname');\n";
}
?>
const FSMRender = require("./fsmRender");
const FSMControls = require("./fsmControls");

module.exports = () => {
  const app = choo();

  <?
    foreach (@dir) {
        my $lcname = $_;
        my $ucname = ucfirst $_;
        print "    const $lcname = new $ucname();\n";
        print "    const fsm_$lcname = new FSMRender($lcname);\n";
        print "    const controls_$lcname = new FSMControls($lcname);\n\n";
    }
  ?>

  function mainView(state, emit) {
    if (state.logger) {
      console.log("mainView:state", state);
    }
    return html`<body>
      <div style="display:flex;flex-direction:column; width:800px;">
  <?
    foreach (@dir) {
        my $ucname = ucfirst $_;
        print "     <div style='display:flex; justify-content:space-between; margin-bottom:20px;'>\n";
        print "         <div style='border:thin dotted #ccc;'> <h4>$ucname</h4>\n";

        my $lcname = $_;
        print "             \${$lcname.render({state, emit})}\n";
        print "             \${controls_$lcname.render({state, emit})}\n";
        print "         </div>\n";
        print "         \${fsm_$lcname.render({state, emit})}\n";
        print "     </div>\n";
    }
  ?>
      </div>
    </body>`;
  }
  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  app.route("/", mainView);
  app.mount("body");
};
