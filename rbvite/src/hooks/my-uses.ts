import { useState } from "react";

// eslint-disable-next-line no-unused-vars
export const useMyReducer = <R extends (pre: S, action: unknown) => S, S>(
  reducer: R,
  initArg: S,
  // eslint-disable-next-line no-unused-vars
  init: (s: S) => S
) => {
  const [state, setState] = useState(init ? init(initArg) : initArg);

  const dispatch = (action: unknown) => {
    setState(reducer(state, action));
  };

  return [state, dispatch] as const;
};
