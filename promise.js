// promise状态
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "reject";

function handle(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}

class MyPromise {
  constructor(executor) {
    //   promise状态
    this.status = PROMISE_STATUS_PENDING;
    // 保存resolve的参数
    this.value = undefined;
    //   保存reject的参数
    this.reason = undefined;
    // 支持链式调用
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        // 微任务完成之后之后再执行该函数,比settimeout叼一点
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;

          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;

          // 遍历
          this.onFulfilledCallbacks.forEach((callback) => {
            callback(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;

          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;

          // 遍历
          this.onRejectedCallbacks.forEach((callback) => {
            callback(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then
  then(onFulfilled, onRejected) {
    //   当onRejected为undivided时,用catch捕捉错误
    onRejected =
      onRejected ||
      ((err) => {
        throw err;
      });

    // 返回新的promise,支持链式调用
    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        handle(onFulfilled, this.value, resolve, reject);
      }

      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        handle(onRejected, this.reason, resolve, reject);
      }

      //   将成功的回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        onFulfilled &&
          this.onFulfilledCallbacks.push(() => {
            handle(onFulfilled, this.value, resolve, reject);
          });

        onRejected &&
          this.onRejectedCallbacks.push(() => {
            handle(onRejected, this.reason, resolve, reject);
          });
      }
    });
  }

  catch(onRejected) {
    this.then(undefined, onRejected);
  }
}

const promise = new MyPromise((resolve, reject) => {
  //   resolve(111);
  reject(2222);
});

promise.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
//   .catch((reason) => {
//     console.log(reason);
//   });

// promise
//   .then(
//     (res) => {
//       console.log("1111", res);
//       res(222);
//     },
//     (rej) => {
//       rej(55555);
//       console.log(rej);
//     }
//   )
//   .then(
//     (res) => {
//       console.log(res);
//     },
//     (rej) => {
//       console.log(rej);
//     }
//   );

// promise.then((res, rej) => {
//   console.log(res);
//   console.log(rej);
// });

// promise.then(
//   (resolve) => {
//     console.log("resolve", resolve);
//   },
//   (reject) => {
//     console.log("reject", reject);
//   }
// );

// promise.then((res) => {
//   console.log("res2", res);
// });
