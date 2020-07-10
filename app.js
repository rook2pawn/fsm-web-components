const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

const Toggle = require("./components/toggle");
const FSMRender = require("./components/fsmRender");

module.exports = () => {
  const app = choo();
  const toggle = new Toggle();
  const fsm_toggle = new FSMRender();
  fsm_toggle.fsm = toggle.fsm;
  function mainView(state, emit) {
    if (state.logger) {
      console.log("mainView:state", state);
    }
    return html`<body>
      <div style="display:flex;">
        ${toggle.render({ state, emit })} ${fsm_toggle.render({ state, emit })}
      </div>
    </body>`;
  }
  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  app.use(require("./components/stoplight/setup"));
  app.use(require("./components/toggle/setup"));

  app.route("/", mainView);
  app.mount("body");
};
