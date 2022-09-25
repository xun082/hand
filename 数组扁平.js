// arr为传入的数组,deep为扁平的深度
const myFlat = (arr = [], deep = 1) => {
  let result = [];

  arr.forEach((item) => {
    // 如果遍历的结果还是数组且深度大于0
    if (Array.isArray(item) && deep > 0) {
      result = [...result, ...myFlat(item, deep - 1)];
    } else {
      result.push(item);
    }
  });

  return result;
};

const arr = [1, 2, 3, 4, 5, [5, 6, 8, 7, 4, ["a", ["b"]]]];

console.log(myFlat(arr, 3));
