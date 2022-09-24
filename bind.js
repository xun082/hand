// bind() 方法创建一个新的函数，在 bind() 被调用时，
// 这个新函数的 this 被指定为 bind() 的第一个参数，
// 而其余参数将作为新函数的参数，供调用时使用。

Function.prototype.Bind = function (pointer, ...argArray) {
  //  防止传入的是非对象类型
  // 指定为 null 或 undefined 时会自动替换为指向全局对象(window)，原始值会被包装。
  const object =
    pointer !== undefined && pointer !== null ? Object(pointer) : window;

  // 给指针新增一个symbol属性以免覆盖原有属性
  const key = Symbol();

  // 绑定为调用的函数
  object[key] = this;

  // 返回一个新函数,这个新函数的this被指定为bind() 的第一个参数
  function proxyFn(...args) {
    // 调用bind()时传入的参数 argArray 和 返回的 新函数的 参数进行合并
    const finalArgs = [...argArray, ...args];

    const result = object[key](...finalArgs);

    delete object[key];

    return result;
  }

  return proxyFn;
};

function bar(a, b) {
  console.log(this);

  return a + b;
}

const bin = bar.Bind("嗨", 10);

console.log(bin(10));
