// 验证更新是否触发
function updateView() {
  console.log("视图更新");
}
// 重新定义属性，监听起来
function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newVal) {
      // value 一直在闭包中，此处设置完成后，下次get能够获取最新设置的值
      // 这里有个小优化，若相同则不触发更新
      if (newVal !== value) {
        value = newVal;
        // 触发更新
        updateView();
      }
    },
  });
}

// 监听对象属性
function observe(target) {
  if (typeof target !== "object" || target === null) {
    // 不是数组或对象不适合监听
    return target;
  }
  // 将对象的属性用 defineProperty 重新定义
  for (let key in target) {
    defineReactive(target, key, target[key]);
  }
}

// 准备数据
const data = {
  name: "xun",
  id: 001,
  information: {
    tel: "135xxxxx354",
    email: "15xxxxx@xx.com",
  },
};

// 监听数据
observe(data);

data.name = "zms";
data.index = 222;

console.log(data.index);
