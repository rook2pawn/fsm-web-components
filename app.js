const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

const Turnstile = require('./components/turnstile');
const Stoplight = require('./components/stoplight');
const Door = require('./components/door');
const Toggle = require('./components/toggle');

const FSMRender = require("./fsmRender");
const FSMControls = require("./fsmControls");

module.exports = () => {
  const app = choo();

      const turnstile = new Turnstile();
    const fsm_turnstile = new FSMRender(turnstile);
    const controls_turnstile = new FSMControls(turnstile);

    const stoplight = new Stoplight();
    const fsm_stoplight = new FSMRender(stoplight);
    const controls_stoplight = new FSMControls(stoplight);

    const door = new Door();
    const fsm_door = new FSMRender(door);
    const controls_door = new FSMControls(door);

    const toggle = new Toggle();
    const fsm_toggle = new FSMRender(toggle);
    const controls_toggle = new FSMControls(toggle);



  function mainView(state, emit) {
    if (state.logger) {
      console.log("mainView:state", state);
    }
    return html`<body>
      <div style="display:flex;flex-direction:column; width:800px;">
       <div style='display:flex; justify-content:space-between; margin-bottom:20px;'>
         <div style='border:thin dotted #ccc;'> <h4>Turnstile</h4>
             ${turnstile.render({state, emit})}
             ${controls_turnstile.render({state, emit})}
         </div>
         ${fsm_turnstile.render({state, emit})}
     </div>
     <div style='display:flex; justify-content:space-between; margin-bottom:20px;'>
         <div style='border:thin dotted #ccc;'> <h4>Stoplight</h4>
             ${stoplight.render({state, emit})}
             ${controls_stoplight.render({state, emit})}
         </div>
         ${fsm_stoplight.render({state, emit})}
     </div>
     <div style='display:flex; justify-content:space-between; margin-bottom:20px;'>
         <div style='border:thin dotted #ccc;'> <h4>Door</h4>
             ${door.render({state, emit})}
             ${controls_door.render({state, emit})}
         </div>
         ${fsm_door.render({state, emit})}
     </div>
     <div style='display:flex; justify-content:space-between; margin-bottom:20px;'>
         <div style='border:thin dotted #ccc;'> <h4>Toggle</h4>
             ${toggle.render({state, emit})}
             ${controls_toggle.render({state, emit})}
         </div>
         ${fsm_toggle.render({state, emit})}
     </div>

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
