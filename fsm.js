const fsm = require("nanostate");

const items = [
  {
    initial: "unsold",
    name: "bought",
    states: {
      unsold: { purchase: "sold" },
      sold: { returned: "unsold" },
    },
  },
  {
    initial: "new",
    name: "usage",
    states: {
      new: { next: "lightly_used" },
      lightly_used: { next: "moderately_used" },
      moderately_used: { next: "heavily_used" },
      heavily_used: {},
    },
  },
];

const obj = {};
items.forEach((item) => {
  obj[item.name] = fsm(item.initial, item.states);
});
const m2 = fsm.parallel(obj);
console.log(m2.state);
m2.emit("usage:next");
console.log(m2.state);

var machine = fsm.parallel({
  bold: fsm("off", {
    on: { toggle: "off" },
    off: { toggle: "on" },
  }),
  underline: fsm("off", {
    on: { toggle: "off" },
    off: { toggle: "on" },
  }),
  italics: fsm("off", {
    on: { toggle: "off" },
    off: { toggle: "on" },
  }),
  list: fsm("none", {
    none: { bullets: "bullets", numbers: "numbers" },
    bullets: { none: "none", numbers: "numbers" },
    numbers: { bullets: "bullets", none: "none" },
  }),
});

machine.emit("bold:toggle");
console.log(machine.state);
