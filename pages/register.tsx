import React from "react";
import Form from "../components/ui/Form/Form";

type Props = {};

export default function RegisterPage({}: Props) {
  const registerForm = [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
    },
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
    {
      name: "cpassword",
      type: "password",
      label: "Confirm Password",
      required: true,
    },
  ];
  const registerHandler = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <Form
        link={{
          text: "already have an account?",
          url: "login",
        }}
        heading="Register"
        submitHandler={registerHandler}
        fields={registerForm}
      />
    </div>
  );
}
