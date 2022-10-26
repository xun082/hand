function is(value1, value2) {
  if (value1 === value2) {
    //  此时只需要识别 +0 和 -0
    // 通过1/0 =infinity 和 -infinity的原则识别
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }

  // 识别Nan
  return value1 !== value1 && value2 !== value2;
}

console.log(is(NaN, NaN));
