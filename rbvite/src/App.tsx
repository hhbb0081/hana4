import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Hello from "./components/Hello";
import Login from "./components/Login";
import My from "./components/My";
import Nav from "./components/Nav";
import { CounterProvider } from "./hooks/counter-hook";
import { SessionProvider } from "./hooks/session-context";
import { useDebounce } from "./hooks/timer-hook";
// import useToggle from "./hooks/toggle";

function App() {
  // const { count, plusCount } = useCounter();

  // const [tCnt, setFriend] = useState(10);
  const [friend, setFriend] = useState(0);
  // const [, toggleReRender] = useToggle();

  // const myHandlerRef = useRef<MyHandler>(null);
  const friendRef = useRef<HTMLInputElement>(null);

  useDebounce(
    () => {
      console.log("useDebounce 실행");
      setFriend(+(friendRef.current?.value || 0));
    },
    1000,
    [friendRef.current?.value]
  );

  return (
    <>
      <div>
        <h1>{friend}</h1>
        <div>
          {/* <Button onClick={reset}>Reset</Button>
          <Button onClick={clear}>Clear</Button> */}
        </div>
      </div>
      <SessionProvider>
        <CounterProvider>
          {/* <div className="mt-3 w-64">
            <input
              type="number"
              defaultValue={friend}
              onChange={toggleReRender}
              ref={friendRef}
              placeholder="friend id..."
              className="inp"
            />
          </div>
          <Hello friend={friend} setFriend={setFriend} ref={myHandlerRef} />
          <div>
            <My />
          </div>
          <div className="card">
            <button onClick={plusCount}>count is {count}</button>
          </div> */}
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my" element={<My />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:id" element={<Item />} />
            <Route path="/hello" element={<Hello />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </CounterProvider>
      </SessionProvider>
    </>
  );
}

export default App;
