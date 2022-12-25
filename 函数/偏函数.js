Function.prototype.partial = function (...args) {
  for (let i = args.length; i < this.length; i++) args.push(undefined);

  return (...remainArgs) => {
    let j = 0;
    args.forEach((arg, i) => arg === undefined && (args[i] = remainArgs[j++]));
    return this(...args);
  };
};

function add(a, b, c, d) {
  return a + b + c + d;
}

const rest = add.partial(1, undefined, 3, undefined);

console.log(rest(2, 4)); // 1 + 2 + 3 + 4 = 10
