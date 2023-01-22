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
    errorText?: string;
    minLength?: number;
    isEmail?: boolean;
    defaultValue?: string;
  }>;
  heading: string;
  link?: {
    text: string;
    url: string;
  };
};

export default function Form({ link, heading, submitHandler, fields }: Props) {
  let obj: any = {};
  let errorObj: any = {};
  fields.forEach((field) => {
    if (field.defaultValue) {
      obj[field.name] = field.defaultValue;
      errorObj[field.name] = false;
      return;
    }
    obj[field.name] = "";
    errorObj[field.name] = false;
    return;
  });
  const [inputs, setInputs] = useState<any>(obj);
  const [errors, setErrors] = useState<any>(errorObj);
  const { darkMode } = useContext(GlobalContext);

  const inputChangeHandler = (e: any) => {
    if (e.target.name === "image") {
      setInputs((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      return;
    }
    setInputs((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(inputs);
  };
  // console.log(inputs);
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    for (const key in errors) {
      let field = fields.find((field) => field.name === key);
      if (inputs[key] === "" && field?.required) {
        setErrors((prev: any) => ({ ...prev, [key]: true }));
        hasError = true;
      } else {
        setErrors((prev: any) => ({ ...prev, [key]: false }));
      }
      if (field?.isEmail) {
        const emailRegex = new RegExp(
          "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
        );
        if (!emailRegex.test(inputs[key])) {
          setErrors((prev: any) => ({ ...prev, [key]: true }));
          hasError = true;
        }
      }
      if (field?.minLength && inputs[key].length < field?.minLength) {
        setErrors((prev: any) => ({ ...prev, [key]: true }));
        hasError = true;
      } else if (field?.minLength) {
        setErrors((prev: any) => ({ ...prev, [key]: false }));
      }
    }
    if (hasError) {
      return;
    }
    submitHandler(inputs);
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
        onSubmit={handleSubmitForm}
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
              error={errors[field.name]}
              errorText={field.errorText}
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
