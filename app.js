const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

const Toggle = require("./components/toggle");
const Turnstile = require("./components/turnstile");

const FSMRender = require("./components/fsmRender");

module.exports = () => {
  const app = choo();
  const toggle = new Toggle();
  const fsm_toggle = new FSMRender();
  fsm_toggle.fsm = toggle.fsm;

  const turnstile = new Turnstile();
  const fsm_turnstile = new FSMRender();
  fsm_turnstile.fsm = turnstile.fsm;

  function mainView(state, emit) {
    if (state.logger) {
      console.log("mainView:state", state);
    }
    return html`<body>
      <div style="display:flex;flex-direction:column; width:600px;">
        <div
          style="display:flex; justify-content:space-between; margin-bottom:20px;"
        >
          ${toggle.render({ state, emit })}
          ${fsm_toggle.render({ state, emit })}
        </div>
        <div
          style="display:flex; justify-content:space-between;margin-bottom:20px;"
        >
          ${turnstile.render({ state, emit })}
          ${fsm_turnstile.render({ state, emit })}
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
