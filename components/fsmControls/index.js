const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
css("./component.css");

class Component extends Nanocomponent {
  constructor(machine) {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.fsm = machine.fsm;
  }
  renderFSM(fsm) {
    const state = fsm.state;
    const list = Object.keys(fsm.transitions[state]);
    return html`<div class="fsmControls">
      ${list.map((controlName) => {
        return html`<input
          value="${controlName}"
          type="button"
          onclick=${() => {
            fsm.emit(controlName);
            this.emit("render");
          }}
        />`;
      })}
    </div>`;
  }
  createElement({ state, emit }) {
    this.emit = emit;
    switch (typeof this.fsm.state) {
      case "string":
        return this.renderFSM(this.fsm);
        break;
      case "object":
        const scopes = this.fsm.scopes;
        return html`<div>
          ${scopes.map((scope) => {
            return this.renderFSM(this.fsm.transitions[scope]);
          })}
        </div>`;
        break;
      default:
        break;
    }
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
