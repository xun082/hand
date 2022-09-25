// apply() 方法使用一个指定的 this 值和 参数数组

Function.prototype.Apply = function (pointer, argArray = []) {
  // 防止传入的是非对象类型
  const object =
    pointer !== undefined && pointer !== null ? Object(pointer) : window;

  // 给指针新增一个symbol 属性以免覆盖原有属性
  const key = Symbol();

  // 绑定为调用的函数
  object[key] = this;

  // 获取返回值
  const result = object[key](...argArray);

  delete object[key];

  return result;
};

function foo(a, b) {
  console.log(this);
}

foo.apply("aaa");
foo.Apply("aaa");
