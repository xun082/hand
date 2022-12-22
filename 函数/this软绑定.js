Function.prototype.softBind = function (object) {
  let fn = this;
  // 捕获所有的curried参数
  const curried = [].slice.call(arguments, 1);

  const bound = function () {
    return (
      fn.apply(!this || this === (window || global) ? object : this),
      curried.concat.apply(curried, arguments)
    );
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};

function foo() {
  console.log(this.name);
}

const obj = {
  name: "obj",
};
const obj2 = {
  name: "obj2",
};
const obj3 = {
  name: "obj3",
};

const fooOBJ = foo.softBind(obj);
fooOBJ();
