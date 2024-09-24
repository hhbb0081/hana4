import React, { createContext, useContext, useRef, useState } from "react";
// import { LoginHandler } from "../components/Login";
import { LoginHandler } from "../components/Login";
import { SampleSession } from "../constants/const";
import { LoginUserType, MyProps, SessionType } from "../types/props";

const SessionContext = createContext<MyProps>({
  session: SampleSession,
  login: (id: number, name: string) => {
    console.log(id, name);
  },
  logout: () => {},
  removeCartItem: (cartId: number) => {
    console.log(cartId);
  },
  addCartItem: (name: string, price: number) => {
    console.log(name, price);
  },
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<SessionType>(SampleSession);
  const [loginInfo, setLoginInfo] = useState<LoginUserType | null>(
    SampleSession.loginUser
  );
  // 아이템 지우기
  const removeCartItem = (cartId: number) => {
    if (session) {
      const newCart = session.cart.filter((el) => el.id !== cartId);
      setSession({ loginUser: loginInfo, cart: newCart });
    }
  };

  // 아이템 추가
  const addCartItem = (name: string, price: number) => {
    if (session) {
      const newCart = [
        ...session.cart,
        { id: Math.random(), name: name, price: price },
      ];
      setSession({ loginUser: loginInfo, cart: newCart });
    }
  };

  // 로그아웃
  const logout = () => {
    setLoginInfo(null);
  };

  // 로그인
  const loginRef = useRef<LoginHandler>(null);
  const login = (id: number, name: string) => {
    if (!id) {
      alert("ID를 입력하세요!");
      return loginRef.current?.focus("id");
    }
    if (!name) {
      alert("NAME를 입력하세요!");
      return loginRef.current?.focus("name");
    }

    setLoginInfo({
      id: id,
      name: name,
    });
  };
  return (
    <SessionContext.Provider
      value={{ session, login, logout, removeCartItem, addCartItem }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
