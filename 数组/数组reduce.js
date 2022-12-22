Array.prototype.myReduce = function (cb, pre, i, init) {
  if (typeof cb !== "function")
    throw new TypeError("This arguments should be a function.");
  let arr = this;

  if (arr.length === 0) return [];

  pre = init == undefined ? arr[0] : init;
  i = init === undefined ? 1 : 0;
  for (i; i < arr.length; i++) {
    pre = cb(pre, arr[i], i);
  }
  return pre;
};

var arr = [1, 2, 3];
console.log(arr.reduce((prev, item) => prev + item));
