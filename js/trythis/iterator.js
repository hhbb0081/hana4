function ex01() {
  console.log([...stack], [...queue]);
  for (const s of stack) console.log(s);
  for (const q of queue) console.log(q);
  const itStack = stack[Symbol.iterator](); // 또는 const itStack = stack.iterator();
  console.log(itStack.next());
  console.log(itStack.next());
  const itQueue = queue.iterator();
  console.log(itQueue.next());
}

ex01();
