import React from "react";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const Input = ({
  label,
  placeholder,
  value,
  className,
  onChange,
  onClick,
  inputRef,
}: Props) => {
  return (
    <div className={"searchbar " + className} onClick={onClick}>
      <label htmlFor={label}>{label} :</label>
      <input
        type="text"
        placeholder={placeholder}
        id={label}
        ref={inputRef}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
