Array.prototype._forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const that = this;
  const length = this.length;
  let index = 0;
  while (index < length) {
    // 使用call调用函数
    callback.call(thisArg, that[index], index, that);
    index++;
  }
};

[1, 2, 3]._forEach((item, index) => {
  console.log(item);
  console.log(index);
  console.log("------");
});
