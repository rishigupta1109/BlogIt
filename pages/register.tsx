import React, { useContext } from "react";
import Form from "../components/ui/Form/Form";
import { AlertContext } from "../store/AlertContext";
import { GlobalContext } from "../store/GlobalContext";
import { signup } from "../utils/services";

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
  const { loading, setLoading } = useContext(GlobalContext);
  const { Message } = useContext(AlertContext);
  const registerHandler = async (values: any) => {
    const { name, email, password, cpassword } = values;
    if (!name || !email || !password || !cpassword) {
      return;
    }
    if (password !== cpassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = await signup(name, email, password);
      console.log(data);
      if (data.status === 201) {
        Message().success("Account created successfully");
      } else if (data?.err?.code === 11000) {
        Message().warning("Email already exists");
      } else {
        Message().error(data.message, false);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
