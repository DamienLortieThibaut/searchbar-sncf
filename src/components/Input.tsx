import React from "react";

type Props = {
  autoFocus?: boolean;
  label: string;
  placeholder: string;
  value: string;
  className: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
  onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
};

const Input = ({
  autoFocus,
  label,
  placeholder,
  value,
  className,
  onChange,
  onClick,
  onBlur,
  onFocus,
  inputRef,
}: Props) => {
  return (
    <div className={"searchbar " + className} onClick={onClick}>
      <label htmlFor={label}>{label} :</label>
      <input
        type="search"
        placeholder={placeholder}
        id={label}
        ref={inputRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autoFocus}
      />
    </div>
  );
};

export default Input;
