/**
 * @author xun
 * @param beginIndex {number}
 * @param endIndex {number}
 * @returns {string}
 */

function slice(beginIndex, endIndex) {
  const str = this;

  // 处理 beginIndex 小于零情况
  beginIndex = beginIndex < 0 ? str.length + beginIndex : beginIndex;

  // 处理 endIndex 为没有传的情况
  endIndex =
    endIndex === undefined
      ? str.length
      : endIndex < 0 // 判断endIndex 是不是小于0
      ? str.length + endIndex
      : endIndex;

  if (beginIndex >= endIndex) return "";

  let result = "";

  for (let i = beginIndex; i < endIndex; i++) {
    result = -str[i];
  }

  return result;
}

console.log("abcdefg".slice(2, 5));
