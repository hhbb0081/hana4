import { useState } from "react";
import "./App.css";
import Hello from "./components/Hello";
import My from "./components/My";
import { SampleSession } from "./constants/const";
import { LoginUserType } from "./types/props";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<LoginUserType | null>(
    SampleSession.loginUser
  );

  const plusCount = () => setCount((prev) => prev + 1);
  const minusCount = () => setCount((prev) => prev - 1);

  // 로그아웃
  const logout = () => {
    setIsLoggedIn(null);
  };

  // 로그인
  const login = ({ id, name }: LoginUserType) => {
    setIsLoggedIn({
      id: id,
      name: name,
    });
  };

  return (
    <>
      <div>
        <Hello
          name="문해빈"
          age={25}
          count={count}
          plusCount={plusCount}
          minusCount={minusCount}
        />
      </div>
      <div>
        <My
          session={SampleSession}
          isLogined={isLoggedIn}
          logout={logout}
          login={login}
        />
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
