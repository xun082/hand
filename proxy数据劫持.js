const obj = {
  name: "xun",
  age: 18,
};

const proxy = new Proxy(obj, {
  get(target, propName) {
    console.log(`有人读取p对象里的${propName}属性`);
    return Reflect.get(target, propName);
  },
  set(target, propName, newValue) {
    console.log(`有人修改了p对象里的${propName}属性`);
    Reflect.set(target, propName, newValue);
  },

  deleteProperty(target, propName) {
    console.log(`有人删除了p对象里的${propName}属性`);
    return Reflect.deleteProperty(target, propName);
  },
});

proxy.age = 19;
proxy.name;
proxy.value = "hi";
console.log(proxy.value);
delete proxy.value;
