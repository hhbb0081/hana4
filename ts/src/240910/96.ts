type SizeType = "XS" | "S" | "M" | "L" | "XL";

type TupleType = {
  id: SizeType;
  price: number;
};

const SIZE: TupleType[] = [
  { id: "XS", price: 8000 },
  { id: "S", price: 10000 },
  { id: "M", price: 12000 },
  { id: "L", price: 14000 },
  { id: "XL", price: 15000 },
];

type SizeOptionType = {
  [key: SizeType]: number;
};

const sizeOption: SizeOptionType = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };

const totalPrice = SIZE.reduce(
  (currPrice, size) => currPrice + sizeOption[size.id] * size.price,
  0
);
