// bind() 方法创建一个新的函数，在 bind() 被调用时，
// 这个新函数的 this 被指定为 bind() 的第一个参数，
// 而其余参数将作为新函数的参数，供调用时使用。

Function.prototype.Bind = function (pointer) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  // 将参数转换为数组
  const args = Array.prototype.slice.call(arguments, 1);

  const self = this;
  const NewFunc = function () {};

  const fBound = function () {
    return self.apply(
      // 如果是 new 操作符,则重新绑定this
      this instanceof NewFunc && pointer ? this : pointer,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  NewFunc.prototype = this.prototype;
  fBound.prototype = new NewFunc();

  return fBound;
};

function bar(a, b) {
  console.log(this);
  return a + b;
}

const bin = bar.Bind("嗨", 10);

console.log(bin(10));
console.log();
