function myInstanceof(left, right) {
  let leftProto = right.prototype; //取右表达式的prototype值
  left = left.__proto__; // 取左表达式的__proto__值

  while (true) {
    if (left === null) {
      // 没有找到
      return null;
    }
    if (left === leftProto) {
      // 找到了
      return true;
    }
    left = left.__proto__;
  }
}

myInstanceof(Object, Object);
