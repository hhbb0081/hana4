import React, {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { FaSpinner } from "react-icons/fa6";
import { useCounter } from "../hooks/counter-hook";
import { useFetch } from "../hooks/fetch-hook";

type Props = {
  friend: number;
  setFriend?: React.Dispatch<React.SetStateAction<number>>;
};

export type MyHandler = {
  jumpHelloState: () => void;
};

type PlaceUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function Hello({ friend }: Props, ref: ForwardedRef<MyHandler>) {
  const { count, plusCount, minusCount } = useCounter();
  // const { session } = useSession();

  const [myState, setMyState] = useState(0);
  const v = 1;

  const handler: MyHandler = {
    jumpHelloState: () => setMyState((pre) => pre * 10),
  };
  useImperativeHandle(ref, () => handler);

  const {
    data: friendInfo,
    isLoading,
    error,
  } = useFetch<PlaceUser>(
    `https://jsonplaceholder.typicode.com/users/${friend}`,
    true,
    [friend]
  );
  console.log("🚀 ~ Hello ~ friendInfo:", friendInfo, isLoading, error);

  // const { clear } = useInterval(() => console.log("X"), 1000);
  // const { reset } = useTimeout(
  //   (name: unknown) => console.log(`Hello, ${name}!!!`),
  //   3000,
  //   ["Hong"]
  // );
  // const { clear, reset } = useInterval(() => setFriend((pre) => pre + 1), 2000);

  return (
    <>
      {/* {session.loginUser?.name && (
        <div>
          Hello, {session.loginUser?.name}! ({session.loginUser?.id})
        </div>
      )} */}

      <div>
        <h3 className="text-center text-lg">myState: {myState}</h3>
        {isLoading && (
          <h3 className="flex justify-center">
            <FaSpinner size={20} className="animate-spin text-slate-500" />
          </h3>
        )}
        {error ? (
          <strong className="text-red-500">
            {error.message && error.message.startsWith("404")
              ? `Your friend is not found(${friend})`
              : error.message}
          </strong>
        ) : (
          <div className="flex h-10 items-center justify-center rounded-lg shadow-[0_0_10px_purple]">
            My friend is {friendInfo?.username}.
          </div>
        )}
        <p>
          {v} - {friend}
        </p>
      </div>

      <div>
        <span onClick={minusCount}>-</span>
        <span>{count}</span>
        <span onClick={plusCount}>+</span>
      </div>

      <div>
        {/* <Button onClick={reset}>Reset Timeout</Button>
        <Button onClick={clear}>Clear Interval</Button> */}
      </div>
    </>
  );
}

const ImpHello = forwardRef(Hello);

export default ImpHello;
