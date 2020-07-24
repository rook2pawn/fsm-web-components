const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this.fsm = nanostate("off", {
      on: { switch: "off" },
      off: { switch: "on" },
    });
  }
  createElement({ emit }) {
    return html` <div
      class="toggle"
      style="width:120px;"
      onclick=${() => {
        this.fsm.emit("switch");
        emit("render");
      }}
    >
      <div class="toggleLine ${this.fsm.state === "on" ? "toggle" : ""}">
        <div class="slider"></div>
      </div>
    </div>`;
  }

  update() {
    return true;
  }
}

module.exports = exports = Component;
