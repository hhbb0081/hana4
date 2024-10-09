import { FormEvent, useMemo, useRef, useState } from "react";
import { useSession } from "../hooks/session-context";
import { useDebounce } from "../hooks/timer-hook";
import { CartType } from "../types/props";
import Button from "./atoms/Button";
import CartItem from "./CartItem";
import Login from "./Login";
import Profile from "./Profile";

function My() {
  const { session, login, logout, removeCartItem, addCartItem } = useSession();
  const { loginUser, cart } = session;
  // const { clear } = useInterval(() => console.log("X"), 1000);
  // const { reset } = useTimeout(() => console.log(`Hello, ${name}!!!`), 3000);

  // 편집 여부
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  // const logoutButtonRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  // 아이템 검색
  const itemRef = useRef<HTMLInputElement>(null);
  const [item, setItem] = useState("");

  useDebounce(
    () => {
      console.log("상품 검색 useDebounce 실행");
      setItem(itemRef.current?.value || "");
    },
    500,
    [itemRef.current?.value]
  );

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
  const modifyItem = (id: number, name: string, price: number) => {
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

  const totalPrice = useMemo(() => {
    session.cart.reduce((acc, cur) => {
      acc += +cur.price;
      return +acc;
    }, 0);
  }, [session.cart]);
  console.log("🚀 ~ totalPrice ~ totalPrice:", totalPrice);

  return (
    <>
      {session.loginUser ? (
        <Profile name={loginUser?.name} logout={logout} />
      ) : (
        <Login login={login} />
      )}
      <input
        type="text"
        ref={itemRef}
        // onChange={(e) =>}
        placeholder="상품 검색"
        className="inp"
      />

      <ul style={{ border: "1px solid #666", padding: "1rem" }}>
        {cart
          ?.filter(({ name }) => name.includes(item))
          ?.map((item) => {
            // key는 fiber가 인식할 수 있어야하기 때문에 필수
            // key를 index로 하면 안되는 이유: 데이터가 삭제되거나 추가되면 idx가 바뀌어서 fiber가 제대로 인식하지 못함
            return (
              <CartItem key={item.id} item={item} modifyItem={modifyItem} />
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
              <Button type="reset" onClick={toggleEditing} />
              <Button type="submit" />
            </div>
          </form>
        ) : (
          <Button onClick={toggleEditing} />
        )}
      </ul>
    </>
  );
}

export default My;
