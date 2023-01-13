import clsx from "clsx";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CutomInput/CustomInput";
import styles from "./Form.module.scss";
type Props = {
  submitHandler: (values: any) => void;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    required: boolean;
  }>;
  heading: string;
  link?: {
    text: string;
    url: string;
  };
};

export default function Form({ link, heading, submitHandler, fields }: Props) {
  let obj: any = {};
  fields.forEach((field) => {
    obj[field.name] = "";
    return;
  });
  const [inputs, setInputs] = useState<any>(obj);
  const { darkMode } = useContext(GlobalContext);

  const inputChangeHandler = (e: any) => {
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  return (
    <div className={darkMode ? clsx(styles.form, styles.dark) : styles.form}>
      <form
        style={{
          boxShadow: ` 6px 6px 20px ${
            darkMode
              ? "var(--dark-color-secondary)"
              : "var(--light-color-secondary)"
          }`,
        }}
        className={darkMode ? styles.dark : ""}
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(inputs);
        }}
      >
        <h1>{heading}</h1>
        {fields.map((field) => {
          return (
            <CustomInput
              value={inputs[field.name]}
              name={field.name}
              type={field.type}
              label={field.label}
              changeHandler={inputChangeHandler}
              required={field.required}
            />
          );
        })}
        {link && <Link href={link.url}>{link.text}</Link>}
        <CustomButton
          label="Submit"
          type="filled"
          corner="6px"
          border="none"
          bg="var(--light-color-primary)"
          hoverbg="var(--dark-color-primary)"
          textColor="white"
        />
      </form>
    </div>
  );
}
