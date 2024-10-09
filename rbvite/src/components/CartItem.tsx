import { useRef, useState } from "react";
import { FaRedo, FaSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { CartType } from "../types/props";

type Props = {
  item: CartType;
  // eslint-disable-next-line no-unused-vars
  modifyItem: (id: number, name: string, price: number) => void;
};

const CartItem = ({ item, modifyItem }: Props) => {
  const { id, name, price } = item;

  // const [vname, setVname] = useState(name);
  // const [vprice, setVprice] = useState(price);
  const nameEachRef = useRef<HTMLInputElement>(null);
  const priceEachRef = useRef<HTMLInputElement>(null);

  const [isEdited, setIsEdited] = useState<boolean>(false);
  const toggleEdit = () => setIsEdited((prev) => !prev);

  const [hasDirty, setHasDirty] = useState<boolean>(false);
  const compareItem = () => {
    // dirty 여부 확인
    const nameValue = nameEachRef.current?.value ?? "";
    const priceValue = priceEachRef.current?.value ?? 0;

    if (name !== nameValue || price !== priceValue) {
      setHasDirty(true);
      return true;
    } else {
      setHasDirty(false);
      return false;
    }
  };

  // 값 초기화
  const resetEachItem = () => {
    const hasCur = nameEachRef.current && priceEachRef.current;
    if (hasCur && hasDirty) {
      nameEachRef.current.value = name;
      priceEachRef.current.value = String(price);
      setHasDirty(false);
    }
  };

  // 값 변경
  const modifyEachItem = () => {
    const name = nameEachRef.current?.value ?? "";
    console.log("🚀 ~ modifyEachItem ~ name:", name);
    const price = priceEachRef.current?.value ?? 0;
    console.log("🚀 ~ modifyEachItem ~ price:", price);

    modifyItem(id, name, +price);
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
        <input
          // value={vname}
          ref={nameEachRef}
          defaultValue={name}
          onChange={compareItem}
        />
        <input
          // value={vprice}
          ref={priceEachRef}
          defaultValue={price}
          onChange={compareItem}
        />
      </div>
      <span onClick={resetEachItem}>
        <FaRedo />
      </span>
      {hasDirty && (
        <div>
          <span onClick={modifyEachItem}>
            <FaSave />
          </span>
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
        <span onClick={() => toggleEdit()}>
          <FaTrashCan />
        </span>
      </div>
    </li>
  );
};

export default CartItem;
