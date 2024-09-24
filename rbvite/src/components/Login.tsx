import {
  FormEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { LoginProps } from "../types/props";

export type LoginHandler = {
  focus: (prop: string) => void;
};

export default forwardRef(function Login(
  { login }: LoginProps,
  ref: ForwardedRef<LoginHandler>
) {
  const idRef = useRef(null);
  const nameRef = useRef(null);

  const handler: LoginHandler = {
    focus(prop) {
      if (prop === "id") idRef.current?.focus();
      if (prop === "name") nameRef.current?.focus();
    },
  };
  useImperativeHandle(ref, () => handler);

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = idRef.current?.value ?? 0;
    const name = nameRef.current?.value ?? "";
    login(+id, name);
  };

  return (
    <form onSubmit={signIn}>
      <div>
        <label>ID</label>
        <input
          type="text"
          name="id"
          // value={id}
          // onChange={(e) => setId(+e.target.value)}
          ref={idRef}
        />
      </div>
      <div>
        <label>name</label>
        <input
          type="text"
          name="name"
          // value={name}
          // onChange={(e) => setName(e.target.value)}
          ref={nameRef}
        />
      </div>
      <span>Log In</span>
    </form>
  );
});

// export default Login;
