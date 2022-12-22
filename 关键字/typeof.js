function type(value) {
  // 如果传入的值是 null ,则返回 null
  if (value === null) {
    return "null";
  }

  const baseType = typeof value;
  // 如果是基本类型
  if (!["object", "function"].includes(baseType)) {
    return baseType;
  }

  // Symbol.toStringTag 通常指定对象类的“display name”
  const tag = value[Symbol.toStringTag];
  if (typeof tag === "string") {
    return tag;
  }

  // 如果他是一个函数,其源代码以 class 关键字开头的
  if (
    baseType === "function" &&
    Function.prototype.toString.call(value).startsWith("class")
  ) {
    return "class";
  }

  // 构造函数的名称；例如 `Array`、`GeneratorFunction`、`Number`、`String`、`Boolean` 或 `MyCustomClass`
  const className = value.constructor.name;
  if (typeof className === "string" && className !== "") {
    return className;
  }

  // 没有合适的方法来获取值的类型,直接返回
  return baseType;
}
