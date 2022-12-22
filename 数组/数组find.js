Array.prototype._find = function (callback, thisArg) {
  if (this === null) {
    throw TypeError("this is null or not a function");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  const length = array.length;

  let index = 0;
  while (index < length) {
    if (callback.call(thisArg, array[index], index, array)) {
      return array[index];
    }
    index++;
  }

  return undefined;
};

Array.prototype._findIndex = function (callback, thisArg) {
  if (this === null) {
    throw TypeError("this is null or not a function");
  }

  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const array = this;
  const length = array.length;

  let index = 0;
  while (index < length) {
    if (callback.call(thisArg, array[index], index, array)) {
      return index;
    }
    index++;
  }

  return -1;
};

console.log([5, 12, 8, 130, 44]._find((item) => item % 2 === 0));
console.log([5, 12, 8, 130, 44]._findIndex((item) => item % 2 === 0));
