//https://stackoverflow.com/questions/30003353/can-es6-template-literals-be-substituted-at-runtime-or-reused

const fillTemplate = require("es6-dynamic-template");
const greeting = fillTemplate("Hi ${firstName}", { firstName: "Joe" });
console.log(greeting);
