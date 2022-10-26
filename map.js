Array.prototype._map = function (callback, thisArg) {
  // 判断this不等于null  this为传入的数组
  if (this === null) {
    throw new TypeError(callback + " is not a function");
  }

  // 判断callback是不是一个函数
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const that = this;
  const length = this.length;

  const result = [];

  let index = 0;
  while (index < length) {
    result[index] = callback.call(thisArg, that[index], index, this);
    index++;
  }

  return result;
};

console.log([1, 2, 3]._map((item, index) => item * 2));
