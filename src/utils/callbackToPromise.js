'use strict';

function callbackToPromise(method, ...args) {
  return new Promise((resolve, reject) => {
    return method(...args, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  });
}

export default callbackToPromise;
