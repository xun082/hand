// Object.prototype[Symbol.iterator] = function () {
//   let properties = Reflect.ownKeys(this);

//   let i = 0;

//   return {
//     next: () => {
//       const result =
//         properties.length > i
//           ? { value: [properties[i], this[properties[i]]], done: false }
//           : { value: undefined, done: true };

//       i++;

//       return result;
//     },
//   };
// };

// const obj = {
//   a: 1,
//   b: 2,
// };

Object.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};
let obj = { a: 1, b: 2 };

for (const i of obj) {
  console.log(i);
}
