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
    const defaultOnRejected = (error) => {
      throw error;
    };
    onRejected = onRejected || defaultOnRejected;

    const defaultOnFulfilled = (value) => {
      return value;
    };
    onFulfilled = onFulfilled || defaultOnFulfilled;

    // 返回新的promise,支持链式调用
    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        handle(onFulfilled, this.value, resolve, reject);
      }

      if (this.status === PROMISE_STATUS_REJECTED) {
        handle(onRejected, this.reason, resolve, reject);
      }

      //   将成功的回调和失败的回调放到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFulfilledCallbacks.push(() => {
          handle(onFulfilled, this.value, resolve, reject);
        });

        this.onRejectedCallbacks.push(() => {
          handle(onRejected, this.reason, resolve, reject);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally();
      },
      () => {
        onFinally();
      }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const values = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res);
            if (values.length === promises.length) {
              resolve(values);
            }
          },
          (error) => {
            reject(error);
          }
        );
      });
    });
  }
}

// const promise = new MyPromise((resolve, reject) => {
//   //   resolve(111);
//   //   resolve(2222) ;
// });

// MyPromise.resolve("ssss").then((res) => {
//   console.log(res, "11111");
// });

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1111);
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2222);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3333);
  }, 3000);
});

MyPromise.all([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  });

// promise
//   .then((res) => {
//     console.log(res);
//     return "bbbb";
//   })
//   .then((res) => {
//     console.log(res);
//     throw "hahsahas";
//   })
//   .catch((res) => {
//     console.log(res);
//   })
//   .finally(() => {
//     console.log("success");
//   });
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
