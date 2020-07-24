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
    this.lockAudio = new Audio("components/door/lock.mp3");
    this.unlockAudio = new Audio("components/door/unlock.mp3");
    this.openAudio = new Audio("components/door/open.mp3");
    this.closeAudio = new Audio("components/door/close2.mp3");
    this.ajarAudio = new Audio("components/door/ajar.mp3");
    lockState.on("locked", () => {
      this.lockAudio.play();
    });
    lockState.on("unlocked", () => {
      this.unlockAudio.play();
    });
    openState.on("ajar", () => {
      this.ajarAudio.play();
    });

    openState.on("open", () => {
      this.openAudio.play();
    });
    openState.on("closed", () => {
      this.closeAudio.play();
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
    const openState = this.fsm.transitions.open.state;

    return html`<div>
      <h4>Door</h4>
      <div class="door ${openState}"></div>
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
