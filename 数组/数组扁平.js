function myFlat(arr) {
  const res = [];
  const stack = [].concat(arr); // 将数组元素拷贝至栈，直接赋值会改变原数组
  while (stack.length !== 0) {
    // 如果栈不为空，则循环遍历
    const value = stack.pop(); // 弹出栈顶元素
    if (Array.isArray(val)) {
      stack.push(...val); // 如果当前元素为数组，将其扩展后再入栈
    } else {
      res.unshift(val); // 如果当前元素不是数组，就将其取出来放入结果数组中
    }
  }
  return res;
}

const array = [1, 2, 3, 4, 5, [5, 6, 8, 7, 4, ["a", ["b"]]]];

console.log(myFlat(array, 3));
const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  "string",
  { name: "前端收割机" },
];

Array.prototype.myFlat = function (num = 1) {
  if (!Number(num) || Number(num) < 0) return this;

  let arr = this.concat(); // 获得调用 myFlat 函数的数组
  while (num > 0) {
    if (arr.some((x) => Array.isArray(x))) arr = [].concat.apply([], arr);
    else break;
    num--;
  }

  return arr;
};

console.log(arr.myFlat(2));
