// 递归
// function deepCopy(target) {
//   let result;

//   // 如果当前需要深拷贝的是一个对象
//   if (typeof target === "object") {
//     // 如果是一个数组的话
//     if (Array.isArray(target)) {
//       result = []; // 将result赋值为一个数组，并且执行遍历
//       for (const key in target) {
//         result.push(arguments.callee(target[key]));
//       }
//       // 判断当前的值是null的话,直接赋值null
//     } else if (target === null) {
//       result = null;

//       // 如果当前的值是一个RegExp
//     } else if (target.constructor === RegExp) {
//       result = target;
//     } else {
//       // 否则是普遍对象
//       result = {};
//       for (const key in target) {
//         result[key] = arguments.callee(target[key]);
//       }
//     }

//     // 如果不是对象的话,直接赋值
//   } else {
//     result = target;
//   }

//   return result;
// }

// 深拷贝3.0 使用是WeakMap弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

function deepCopy(target, map = new WeakMap()) {
  // 判断是否为null或者undefined
  if (typeof target == null) return target;

  // 判断是否为日期
  if (target instanceof Date) return new Date(target);

  // 判断是否为正则
  if (target instanceof RegExp) return new RegExp(target);

  if (typeof target === "object") {
    const isArray = Array.isArray(target);

    // 是数组就分配数组,不是则分配空对象
    const data = isArray ? [] : {};

    // 检查map有没有克隆过的对象
    if (map.get(target)) {
      return map.get(target);
    }

    // 没有 - 将当前对象作为key，克隆对象作为value进行存储
    const keys = isArray ? undefined : Object.keys(target);
    map.set(data, target);

    function forEach(array, iteratee) {
      let index = -1;
      const length = array.length;
      while (++index < length) {
        iteratee(array[index], index);
      }
      return array;
    }

    forEach(keys || target, (value, key) => {
      if (keys) key = value;

      data[key] = deepCopy(target[key], map);
    });
    return data;
  } else {
    return target;
  }
}

const test = {
  name: "xun",
  foo: function () {
    z;
    console.log(1111);
  },
  field2: undefined,
  f: {
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } },
  },
};

const result = deepCopy(test);

console.log(test);
console.log(result);

result.name = "moment";
console.log("--------------");
console.log(test);
console.log(result);
