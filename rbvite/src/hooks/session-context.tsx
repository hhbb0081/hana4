import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";
// import { LoginHandler } from "../components/Login";
import { LoginHandler } from "../components/Login";
import { SampleSession } from "../constants/const";
import { CartType, LoginUserType, MyProps, SessionType } from "../types/props";
import { useFetch } from "./fetch-hook";

type Action =
  | { type: "initialize"; payload: SessionType | undefined }
  | { type: "login"; payload: LoginUserType }
  | { type: "logout" }
  | { type: "addCartItem"; payload: Omit<CartType, "id"> }
  | { type: "removeCartItem"; payload: number }
  | { type: "editCartItem"; payload: CartType };

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
  editCartItem: (id: number, name: string, price: number) => {
    console.log(id, name, price);
  },
};
const SessionContext = createContext<MyProps>(initialValue);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const SampleSession: SessionType = {
    loginUser: null,
    cart: [],
  };

  // 리듀서 함수
  const reducer = (session: SessionType, action: Action): SessionType => {
    switch (action.type) {
      case "initialize":
        return action.payload || SampleSession;
      case "login":
        return { ...session, loginUser: action.payload };
      case "logout":
        return { ...session, loginUser: null };
      case "addCartItem":
        return {
          ...session,
          cart: [...session.cart, { id: Math.random(), ...action.payload }],
        };
      case "removeCartItem":
        return {
          ...session,
          cart: session.cart.filter((el) => el.id !== action.payload),
        };
      case "editCartItem":
        return {
          ...session,
          cart: session.cart.map((el) =>
            el.id === action.payload.id ? { ...el, ...action.payload } : el
          ),
        };
      default:
        return session;
    }
  };

  // useReducer 훅 및 세션 초기화 함수
  const [session, dispatch] = useReducer(reducer, SampleSession);

  const setSession = useCallback((value?: SessionType) => {
    dispatch({ type: "initialize", payload: value });
  }, []);

  const addCartItem = useCallback((value: Omit<CartType, "id">) => {
    dispatch({ type: "addCartItem", payload: value });
  }, []);

  const removeCartItem = useCallback((value: number) => {
    dispatch({ type: "removeCartItem", payload: value });
  }, []);

  const editCartItem = useCallback((value: CartType) => {
    dispatch({ type: "editCartItem", payload: value });
  }, []);

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
  // const removeCartItem = (cartId: number) => {
  //   if (session) {
  //     const newCart = session.cart.filter((el) => el.id !== cartId);
  //     setSession({ ...session, cart: newCart });
  //   }
  // };

  // 아이템 추가
  // const addCartItem = (name: string, price: number) => {
  //   if (session) {
  //     const newCart = [
  //       ...session.cart,
  //       { id: Math.random(), name: name, price: price },
  //     ];
  //     setSession({ ...session, cart: newCart });
  //   }
  // };

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        removeCartItem,
        addCartItem,
        editCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
