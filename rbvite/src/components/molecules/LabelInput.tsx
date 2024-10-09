import { MouseEventHandler } from "react";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  onChange?: MouseEventHandler<HTMLInputElement>;
};
function LabelButton({
  label,
  placeholder,
  // onChange
}: Props) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        // onChange={onChange}
        // value={id}
        // onChange={(e) => setId(+e.target.value)}
      />
    </div>
  );
}

// const LabelButtonRef = forwardRef(LabelButton);

export default LabelButton;
