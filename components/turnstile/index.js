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
    this.fsm = nanostate("locked", {
      locked: { coin: "unlocked", push: "locked" },
      unlocked: { coin: "unlocked", push: "locked" },
    });
    this.state = {
      push: false,
    };
  }

  createElement({ state, emit }) {
    return html`<div class="turnstile">
      <h4>Turnstile</h4>
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
