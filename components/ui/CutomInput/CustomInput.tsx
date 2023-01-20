import React from "react";
import styles from "./CustomInput.module.scss";
type Props = {
  label: string;
  type: string;
  value: string | number;
  changeHandler: (e: any) => void;
  name: string;
  error?: boolean;
  errorText?: string;
};

export default function CustomInput({
  label,
  type,
  value,
  changeHandler,
  name,
  error = false,
  errorText,
}: Props) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div>
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          name={name}
          style={{ border: error ? "1px solid red" : "" }}
        />
        {error && <p className={styles.error}>{errorText}</p>}
      </div>
    </div>
  );
}
