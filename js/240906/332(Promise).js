const promiseFn = (id = 1) =>
  new Promise((resolve, reject) => {
    console.log("id>>", id);
    if (id < 7) resolve(id + 1);
    reject(new Error("어디로?" + id));
  });

promiseFn(1)
  .then((res) => {
    console.log("res1>>", res);
    promiseFn(res);

    // if (ret instanceof Promise) return ret;
    // else return Promise.resolve(ret);

    // return Promise.resolve(undefined); 와 같음
  })
  .then((res) => {
    return new Promise((resolve, reject) => {
      if (res) resolve;
      else reject;
    });
    // res가 undefined 이라면 ⇒ 여기서 throw 하면 될까?
  })
  .catch((err) => console.log("Error!!>>", err));
