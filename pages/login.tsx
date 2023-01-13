import React from "react";
import Form from "../components/ui/Form/Form";

type Props = {};

export default function loginPage({}: Props) {
  const loginForm = [
    {
      name: "email",
      type: "email",
      label: "Email Id",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",

      required: true,
    },
  ];
  const loginHandler = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <Form
        link={{
          text: "Not have an account?",
          url: "register",
        }}
        heading="Login"
        submitHandler={loginHandler}
        fields={loginForm}
      />
    </div>
  );
}
