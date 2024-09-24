import { useRef, useState } from "react";
import { CartType } from "../types/props";

type Props = CartType & {
  modifyItem: (prop: CartType) => void;
};

const CartItem = ({ id, name, price }: Props) => {
  const nameEachRef = useRef<HTMLInputElement>(null);
  const priceEachRef = useRef<HTMLInputElement>(null);

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const toggleEdit = () => setIsEdited((prev) => !prev);
  const [hasDirty, setHasDirty] = useState<boolean>(false);
  const compareItem = (nameValue: string, priceValue: number) => {
    // 값 변경 여부 확인
    if (name !== nameValue || price !== priceValue) setHasDirty(true);
    else setHasDirty(false);
    return;
  };

  // 값 변경
  const modifyItem = (id: number) => {
    const name = nameEachRef.current?.value ?? "";
    const price = priceEachRef.current?.value ?? 0;
    compareItem(name, +price);

    modifyItem({
      id: id,
      name: name,
      price: +price,
    });
    toggleEdit();
  };
  return isEdited ? (
    <li
      key={id}
      style={{
        margin: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <input value={nameEachRef.current?.value} ref={nameEachRef} />
        <input value={priceEachRef.current?.value} ref={priceEachRef} />
      </div>
      {hasDirty && (
        <div>
          <span onClick={() => toggleEdit()}>CANCLE</span>
          <span onClick={() => modifyItem(id)}>SAVE</span>
        </div>
      )}
    </li>
  ) : (
    <li
      key={id}
      style={{
        margin: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <div>
        <span onClick={() => toggleEdit()}>EDIT</span>
      </div>
    </li>
  );
};

export default CartItem;
