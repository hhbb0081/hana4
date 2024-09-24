import { FormEvent, useRef, useState } from "react";
import { useSession } from "../hooks/session-context";
import { CartType } from "../types/props";
import Button from "./atoms/Button";
import CartItem from "./CartItem";
import Login from "./Login";
import Profile from "./Profile";

function My() {
  const { session, login, logout, removeCartItem, addCartItem } = useSession();
  const { loginUser, cart } = session;

  // 편집 여부
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  // const logoutButtonRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  // 아이템 삭제
  const removeItem = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      removeCartItem(id);
    }
    toggleEditing();
  };
  console.log("🚀 ~ removeItem ~ removeItem:", removeItem);

  // 아이템 추가
  const addItem = () => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const price = priceRef.current?.value;

    if (!name) {
      alert("상품명을 입력하세요.");
      return nameRef.current?.focus();
    } else if (!price) {
      alert("가격을 입력하세요.");
      return nameRef.current?.focus();
    } else if (confirm("추가하시겠습니까?")) {
      addCartItem(name, +price);
      nameRef.current.value = "";
      priceRef.current.value = "";
      toggleEditing();
    }
  };

  // 아이템 수정
  const [cartList, setCartList] = useState<CartType[]>(cart);
  const modifyItem = ({ id, name, price }: CartType) => {
    const newCartList = [
      ...cartList,
      ...cartList
        .filter((el) => el.id === id)
        .map(() => {
          return {
            id,
            name: name,
            price: +price,
          };
        }),
    ];
    setCartList(newCartList);
  };

  return (
    <>
      {session.loginUser ? (
        <Profile name={loginUser?.name} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <ul style={{ border: "1px solid #666", padding: "1rem" }}>
        {cart?.map(({ id, name, price }) => {
          // key는 fiber가 인식할 수 있어야하기 때문에 필수
          // key를 index로 하면 안되는 이유: 데이터가 삭제되거나 추가되면 idx가 바뀌어서 fiber가 제대로 인식하지 못함
          return (
            <CartItem
              key={id}
              id={id}
              name={name}
              price={+price}
              modifyItem={modifyItem}
            />
          );
        })}
        {isEditing ? (
          <form onSubmit={addItem}>
            <div>
              <input
                type="text"
                placeholder="name.."
                ref={nameRef}
                className="inp"
              />
              <input
                type="text"
                placeholder="price.."
                ref={priceRef}
                className="inp"
              />
              <Button type="reset" text="cancel" onClick={toggleEditing} />
              <Button type="submit" text="Save" />
            </div>
          </form>
        ) : (
          <Button text="+Add Item" onClick={toggleEditing} />
        )}
      </ul>
    </>
  );
}

export default My;
