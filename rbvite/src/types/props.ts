// Hello
export type HelloType = {
  name?: string;
  age?: number;
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

// My
export type MyProps = {
  session: SessionType;
  isLogined?: null | LoginUserType;
  logout: () => void;
  // eslint-disable-next-line no-unused-vars
  login: (id: number, name: string) => void;
  // eslint-disable-next-line no-unused-vars
  removeCartItem: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  addCartItem: (name: string, price: number) => void;
};

export type LoginUserType = {
  id: number;
  name: string;
};

export type CartType = LoginUserType & {
  price: number;
};

// App
export type SessionType = {
  loginUser: LoginUserType | null;
  cart: CartType[];
};

// Profile
export type ProfileProps = {
  name?: string;
  logout: () => void;
};

// Login
export type LoginProps = Pick<MyProps, "login">;
