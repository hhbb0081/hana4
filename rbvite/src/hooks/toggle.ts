import { useState } from "react";

export default function useToggle() {
  const [isToggle, setIsToggle] = useState(false);
  const toggle = (state?: unknown) => {
    setIsToggle((prev) => (typeof state === "boolean" ? state : !prev));
  };

  return [isToggle, toggle] as const;
}
