// Hello
export type HelloType = {
  name: string;
  age: number;
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

// My
export type MyProps = {
  session: SessionType;
  isLogined: null | LoginUserType;
  logout: () => void;
  login: (arg0: LoginUserType) => void;
};

export type LoginUserType = {
  id: number;
  name: string;
};

export type CartType = {
  id: number;
  name: string;
  price: number;
};

// App
export type SessionType = {
  loginUser: LoginUserType | null;
  cart: CartType[];
};
