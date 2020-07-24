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
    const openState = nanostate("closed", {
      closed: { open: "open", light_push: "ajar" },
      ajar: { close: "closed", open: "open" },
      open: { close: "closed" },
    });
    const lockState = nanostate("unlocked", {
      unlocked: { lock: "locked" },
      locked: { unlock: "unlocked" },
    });
    openState.guard("open", () => {
      return lockState.state === "unlocked";
    });
    openState.guard("light_push", () => {
      return lockState.state === "unlocked";
    });

    this.fsm = nanostate.parallel({
      open: openState,
      lock: lockState,
    });
  }

  createElement({ state, emit }) {
    return html`<div class="door">
      <h4>Door</h4>
    </div>`;
  }

  load(el) {
    this.el = el;
    this._loadedResolve();
  }

  update() {
    return false;
  }
}

module.exports = exports = Component;
