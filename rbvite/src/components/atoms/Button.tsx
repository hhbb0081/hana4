import React from "react";

function Button({
  text = "",
  type = "button",
  variant,
  classNames = "",
  onClick = () => {},
}: {
  text: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  classNames?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={`${variant && variant} ${classNames && classNames}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default Button;
