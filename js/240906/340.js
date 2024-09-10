// Promise 실수 1
const myFetch = () =>
  new Promise((resolve, reject) =>
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then(resolve)
      .catch(reject)
  );

// Promise 실수 2
// let result;
// promiseFn().then((res) => (result = res));
// otherFunction(result);

// =>

let result;
promiseFn().then((res) => {
  result = res;
  otherFunction(result);
});

// Promise 실수 3
const getAllUsers = (sql) => {
  new Promise((resolve, reject) =>
    query.execute(sql, (err, rs) => {
      if (err) reject(err);

      const results = [];

      // while (rs.next()) results.push(rs.getRow());
      // resolve(results);

      (async () => {
        do {
          const ret = await rs.next();
          if (!ret) break;
          results.push(ret);
        } while (true);
        resolve(results);
      })();
    })
  );
};

// Promise 실수 5

// async 함수는 Promise를 반환함
async function myRequest(url) {
  const response = await fetch(url);
  // return await response.json();
  return response.json(); // await를 빼야함
}
