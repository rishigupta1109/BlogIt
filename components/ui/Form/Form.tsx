import React, { useState } from "react";
import CustomInput from "../CutomInput/CustomInput";

type Props = {
  submitHandler: (values: any) => void;
  fields: Array<{
    name: string;
    type: string;
    label: string;
    required: boolean;
  }>;
};

export default function Form({ submitHandler, fields }: Props) {
  let obj = {};
  fields.forEach((field) => {
    obj[field.name] = "";
    return;
  });
  const [inputs, setInputs] = useState<any>(obj);
  const inputChangeHandler = (e: any) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(inputs);
      }}
    >
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
      <button>submit</button>
    </form>
  );
}
