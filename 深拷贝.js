function deepCopy(target) {
  let result;

  // 如果当前需要深拷贝的是一个对象
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (const key in target) {
        result.push(arguments.callee(target[key]));
      }
      // 判断当前的值是null的话,直接赋值null
    } else if (target === null) {
      result = null;

      // 如果当前的值是一个RegExp
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普遍对象
      result = {};
      for (const key in target) {
        result[key] = arguments.callee(target[key]);
      }
    }

    // 如果不是对象的话,直接赋值
  } else {
    result = target;
  }

  return result;
}

const test = {
  name: "xun",
  foo: function () {
    console.log(1111);
  },
};

const result = deepCopy(test);

console.log(test);
console.log(result);

result.name = "moment";
console.log("--------------");
console.log(test);
console.log(result);
