const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.fsm = nanostate("green", {
      green: { timer: "yellow" },
      yellow: { timer: "red" },
      red: { timer: "green" },
    });
    this.fsm.event(
      "powerOutage",
      nanostate("flashingRed", {
        flashingRed: { powerRestored: "green" },
      })
    );
  }

  createElement({ state, emit }) {
    const fsm_state = this.fsm.state;
    return html`<div class="stoplightContainer">
      <div class="blackBacking"></div>
      <div
        class="light red ${fsm_state === "red" ? "active" : ""} ${fsm_state ===
        "flashingRed"
          ? "flashing"
          : ""} "
      ></div>
      <div
        class="glare red ${fsm_state === "red" ? "active" : ""} ${fsm_state ===
        "flashingRed"
          ? "flashing"
          : ""}"
      ></div>

      <div class="light yellow ${fsm_state === "yellow" ? "active" : ""}"></div>
      <div class="glare yellow ${fsm_state === "yellow" ? "active" : ""}"></div>

      <div class="light green ${fsm_state === "green" ? "active" : ""}"></div>
      <div class="glare green  ${fsm_state === "green" ? "active" : ""}"></div>

      <div class="stoplight"></div>
    </div>`;
  }

  load(el) {
    this.el = el;
    this._loadedResolve();
  }

  update() {
    return true;
  }
}

module.exports = exports = Component;
