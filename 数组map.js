// 在手写map方法时，我们需要注意如下问题。
// 1、回调函数必须是一个函数
// 2、调用该方法的对象必须是数组。
// 3、如果数组的大小为0，则直接返回空数组。

Array.prototype.myMap = function (callback, thisArg) {
  // 传入数组的长度
  let length = this.length;

  const result = [];

  if (!Array.isArray(this)) throw TypeError("this is not an array");

  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }

  if (length === 0) {
    return result;
  }

  for (let i = 0; i < length; i++) {
    result[i] = callback.call(thisArg, this[i], i, this);
  }

  return result;
};

const allArr = [1, 2, 3, 4, 5];
console.log(allArr.myMap((item) => item * 2));
