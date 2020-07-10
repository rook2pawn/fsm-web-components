const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.fsm;
  }

  createElement({ state, emit }) {
    return html`<div class="fsm">
      <div class="currentState">currentState ${this.fsm && this.fsm.state}</div>
      <div class="states">
        ${Object.keys(this.fsm.transitions).map((key) => {
          return html`<div>
            <span class="key ${key === this.fsm.state ? "active" : ""}"
              >${key}</span
            ><span class="value"
              >${JSON.stringify(this.fsm.transitions[key])}</span
            >
          </div>`;
        })}
      </div>
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
