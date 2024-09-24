import { useCounter } from "../hooks/counter-hook";
import { useSession } from "../hooks/session-context";

function Hello() {
  const { count, plusCount, minusCount } = useCounter();
  const { session } = useSession();
  return (
    <>
      {session.loginUser?.name && (
        <div>
          Hello, {session.loginUser?.name}! ({session.loginUser?.id})
        </div>
      )}
      <div>
        <span onClick={minusCount}>-</span>
        <span>{count}</span>
        <span onClick={plusCount}>+</span>
      </div>
    </>
  );
}

export default Hello;
