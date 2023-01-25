import React from "react";
import styles from "./CustomInput.module.scss";
import CustomButton from "../CustomButton/CustomButton";
import Image from "next/image";
type Props = {
  label: string;
  type: string;
  value: any;
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
  if (type === "file") {
    return (
      <CustomFileInput
        type="file"
        label={label}
        changeHandler={changeHandler}
        name={name}
        error={error}
        errorText={errorText}
        value={value}
      />
    );
  }
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.subContainer}>
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

const CustomFileInput = ({
  label,
  type,
  value,
  changeHandler,
  name,
  error = false,
  errorText,
}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  let previewImage: string =
    typeof value !== "string" ? URL.createObjectURL(value) : "/user/" + value;
  if (value === "") previewImage = "/user/profile.png";
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.subContainer}>
        <div className={styles.rowContainer}>
          <input
            hidden
            type={type}
            onChange={changeHandler}
            name={name}
            ref={inputRef}
            style={{ border: error ? "1px solid red" : "" }}
          />
          <Image src={previewImage} alt="image" height={45} width={45} />
          <CustomButton
            label="Upload Image"
            bg="var(--light-color-primary)"
            border="none"
            hoverbg="var(--dark-color-secondary)"
            textColor="white"
            hoverTextColor="white"
            type="filled"
            corner="6px"
            onClick={(e) => {
              e.preventDefault();
              if (inputRef.current) inputRef.current.click();
            }}
          />
        </div>
        {error && <p className={styles.error}>{errorText}</p>}
      </div>
    </div>
  );
};
