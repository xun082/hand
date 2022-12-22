function currying(fn) {
  function curried(...args) {
    // 判断当前接收的参数的个数,也可以参数本身需要接收的参数是否一致
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      // 没有达到个数时,需要返回一个新的函数,继续来接收参数
      return function (...rest) {
        // 接收到参数后,需要递归调用来检查函数的个数是否达到
        return curried.apply(this, [...args, ...rest]);
      };
    }
  }

  return curried;
}

// 测试
function add(x, y, z) {
  return x + y + z;
}

const cur = currying(add);
console.log(cur(10)(20)(30));
