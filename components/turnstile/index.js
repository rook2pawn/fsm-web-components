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
    this.emit;
    this.fsm.on("locked", () => {
      this.rerender();
      this.emit("render");
    });
    this.fsm.on("unlocked", () => {
      this.rerender();
      this.emit("render");
    });
  }

  createElement({ state, emit }) {
    this.emit = emit;
    return html`<div class="turnstile">
      <h4>Turnstile</h4>
      <input
        type="button"
        value="insert coin"
        onclick=${() => {
          this.fsm.emit("coin");
        }}
      />
      <input
        type="button"
        value="push"
        onclick=${() => {
          this.state.push = true;
          this.rerender();
          setTimeout(() => {
            this.state.push = false;
            this.fsm.emit("push");
          }, 2000);
        }}
      />
      <div>${this.state.push ? "Pushing" : this.fsm.state}</div>
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
