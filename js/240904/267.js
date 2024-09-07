//오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
const total = { price: 45000, vat: 4500 };

function fmt(txts, amount) {
  const reg = /\d{3}/;
  const newPrice = amount.toLocaleString().padStart(9);
  return txts.join(
    // String(amount).replace(/([0-9]{0,3})?([0-9]{0,3})?/g, "$1,$2")
    amount.toLocaleString().padStart(9)
  );
}

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);
