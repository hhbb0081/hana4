import "./App.css";
import Hello from "./components/Hello";
import My from "./components/My";
import { CounterProvider, useCounter } from "./hooks/counter-hook";
import { SessionProvider } from "./hooks/session-context";

function App() {
  const { count, plusCount } = useCounter();

  return (
    <SessionProvider>
      <CounterProvider>
        <div>
          <Hello />
        </div>
        <div>
          <My />
        </div>
        <div className="card">
          <button onClick={plusCount}>count is {count}</button>
        </div>
      </CounterProvider>
    </SessionProvider>
  );
}

export default App;
