import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/session-context";
import { CartType } from "../types/props";
import Button from "./atoms/Button";

export default function ItemLayout() {
  const {
    session: { cart },
  } = useSession();

  const navigate = useNavigate();

  const [currItem, setCurrItem] = useState<CartType>(cart[0]);

  const goItem = (id: number) => {
    setCurrItem(cart.find(({ id: itemId }) => id === itemId)!);
    // navigate(`/items/${id}`);
    navigate(`${id}?q=${id}`);
  };

  return (
    <div className="flex justify-between">
      <div className="w-full border">
        <h1 className="mb-3 text-3xl">장바구니</h1>
        <ul className="space-y-2">
          {cart.map(({ id, name }) => (
            <li key={id}>
              {/* <Link to={`${id}`}>{name}</Link> */}
              <Button onClick={() => goItem(id)}>{name}</Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full border">
        <Outlet context={currItem} />
      </div>
    </div>
  );
}
