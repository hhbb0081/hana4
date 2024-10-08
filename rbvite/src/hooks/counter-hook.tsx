import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

export type Action = {
  type: string;
  payload: unknown;
};

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const reducer = (count: number, { type, payload }: Action) => {
    switch (type) {
      case "plus":
        return count + ((payload as number) ?? 1);
      case "minus":
        return count - 1;
      default:
        return count;
    }
  };

  const [count, dispatch] = useReducer(reducer, 0);

  const plusCount = useCallback((value?: number) => {
    // setCount((count) => count + 1)
    dispatch({ type: "plus", payload: value });
  }, []);

  const minusCount = useCallback((value?: number) => {
    dispatch({ type: "minus", payload: value });
  }, []);

  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
