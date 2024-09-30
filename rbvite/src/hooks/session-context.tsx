import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import { LoginHandler } from "../components/Login";
import { LoginHandler } from "../components/Login";
import { SampleSession } from "../constants/const";
import { MyProps, SessionType } from "../types/props";
import { useFetch } from "./fetch-hook";

const initialValue = {
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
};
const SessionContext = createContext<MyProps>(initialValue);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<SessionType>(SampleSession);

  const { data } = useFetch<SessionType>("/data/sample.json") || SampleSession;

  useLayoutEffect(() => {
    setSession(data ?? SampleSession);
  }, [data]);

  // 로그아웃
  const logout = () => {
    setSession({ ...session, loginUser: null });
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

    setSession({
      ...session,
      loginUser: { id, name },
    });
  };

  // 아이템 지우기
  const removeCartItem = (cartId: number) => {
    if (session) {
      const newCart = session.cart.filter((el) => el.id !== cartId);
      setSession({ ...session, cart: newCart });
    }
  };

  // 아이템 추가
  const addCartItem = (name: string, price: number) => {
    if (session) {
      const newCart = [
        ...session.cart,
        { id: Math.random(), name: name, price: price },
      ];
      setSession({ ...session, cart: newCart });
    }
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
