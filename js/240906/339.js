const f = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1"); // fetch 자체가 promise이기 때문에 Promise로 감쌀 필요가 없음

  if (!res.ok) throw new Error("Failt to Fetch!!");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await res.json();

  return data.name;
};

console.log(await f());
