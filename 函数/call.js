// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数

Function.prototype.Call = function (pointer, ...rest) {
  //  防止传入的是非对象类型
  // 指定为 null 或 undefined 时会自动替换为指向全局对象(window)，原始值会被包装。
  const object =
    pointer !== undefined && pointer !== null ? Object(pointer) : window;

  // 给指针新增一个symbol属性以免覆盖原有属性
  const key = Symbol();

  // 绑定为使用的函数
  object[key] = this;

  // 使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined
  const result = object[key](...rest);

  // 删除该属性
  delete object[key];

  return result;
};

function bar(a, b) {
  console.log(a + b);
  console.log(this);
}

bar.call("this", 10, 20);
bar.Call("this", 10, 20);
