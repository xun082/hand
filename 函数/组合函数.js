function compose(...fns) {
  // 函数的个数
  const length = fns.length;

  // 类型检测
  for (let i = 0; i < length; i++) {
    if (typeof fns[i] !== "function") {
      throw new TypeError("Expect arguments must be function");
    }
  }

  // 先执行第一个参数的函数
  return function (...args) {
    let index = 0;

    // 获取第一个函数返回的结果
    let result = length ? fns[index].apply(this, args) : args;
    // 从第二个函数开始
    while (++index < length) {
      result = fns[index].call(this, result);
    }

    // 返回最终结果
    return result;
  };
}

// 测试
function double(m) {
  return m * 2;
}

function square(n) {
  return n ** 2;
}

const fn = compose(double, square);
console.log(fn(10));
