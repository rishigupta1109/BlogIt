import React from "react";

type Props = {
  label: string;
  type: string;
  value: string | number;
  changeHandler: (e: any) => void;
  name: string;
  required: boolean;
};

export default function CustomInput({
  label,
  type,
  value,
  changeHandler,
  name,
  required,
}: Props) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        required={required}
        name={name}
      />
    </div>
  );
}
