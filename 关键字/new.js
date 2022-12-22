function myNew(func, ...args) {
  // 判断方法体
  if (typeof func !== "function") {
    throw "第一个参数必须是方法体";
  }

  // 创建新对象
  // 这个对象的[[prototype]](隐式原型 __proto__)指向 func 这个类的原型对象 prototype
  // 即实例可以访问构造函数原型 obj.constructor === Person
  const object = Object.create(func.prototype);

  // 构造函数内部的this被赋值为这个新对象
  const result = func.apply(object, args);

  // 如果构造函数返回的结果是引用数据类型，则返回运行后的结果
  // 否则返回新创建的 obj
  const isObject = typeof result === "object" && result !== null;
  const isFunction = typeof result === "function";

  return isObject || isFunction ? result : object;
}

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(`my name is ${this.name}`);
};

const me = myNew(Person, "lang");
me.sayName();
