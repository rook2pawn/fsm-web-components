const fsm = require("nanostate");

const apple = {
  uneaten: { bite: "eaten" },
  eaten: {},
};

const apple_fsm = fsm("uneaten", apple);

const apple = {
  unsold: { purchase: "sold" },
  sold: { returned: "unsold" },
};

const apple_fsm = fsm("unsold", apple);
apple_fsm.on("sold", transmitFunds);
apple_fsm.event(
  "FDA_recall",
  fsm("recalled", {
    recalled: { recall_expired: "unsold" },
  })
);
