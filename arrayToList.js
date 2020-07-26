const list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

console.log(list);

const listToArray = (list) => {
  if (list.rest === null) return [list.value];
  return [list.value, ...listToArray(list.rest)];
};
console.log(listToArray(list));
