const pp = require("preprocess");
const fs = require("fs");

const list = fs.readdirSync("./components").map((item) => {
  return item.slice(0, 1).toUpperCase().concat(item.slice(1));
});

pp.preprocessFileSync("./app-pre.js", "./app-post.js", {
  LIST: list.toString(),
  myFunction: (x) => {
    console.log("X is:", x);
    x.toLowerCase();
  },
});
