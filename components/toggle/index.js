const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };
    this.fsm = nanostate("off", {
      on: { switch: "off" },
      off: { switch: "on" },
    });
    this.fsm.on("on", () => {
      this.state.toggle = true;
      this.rerender();
      this.emit("render");
    });
    this.fsm.on("off", () => {
      this.state.toggle = false;
      this.rerender();
      this.emit("render");
    });
  }
  createElement({ emit }) {
    this.emit = emit;
    return html` <div
      class="toggle"
      style="width:120px;"
      onclick=${() => {
        this.fsm.emit("switch");
      }}
    >
      <div class="toggleLine ${this.state.toggle ? "toggle" : ""}">
        <div class="slider"></div>
      </div>
    </div>`;
  }

  update() {
    return false;
  }
}

module.exports = exports = Component;
