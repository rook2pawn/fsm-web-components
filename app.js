const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

const Stoplight = require("./components/stoplight");

module.exports = () => {
  const app = choo();
  const stoplight = new Stoplight();
  function mainView(state, emit) {
    if (state.logger) {
      console.log("mainView:state", state);
    }
    return html`<body>
      ${stoplight.render({ state, emit })}
    </body>`;
  }
  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  app.use(require("./components/stoplight/setup"));
  app.route("/", mainView);
  app.mount("body");
};
