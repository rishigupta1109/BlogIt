import React, { useContext } from "react";
import Form from "../components/ui/Form/Form";
import { signIn } from "next-auth/react";
import { AlertContext } from "../store/AlertContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
type Props = {};

export default function loginPage({}: Props) {
  const { status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  if (loading) return <div>Loading...</div>;
  if (authenticated) router.push("/");
  const loginForm = [
    {
      name: "email",
      type: "email",
      label: "Email Id",
      isEmail: true,
      required: true,
      errorText: "Please enter a valid email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      errorText: "Password must be atleast 6 characters long",
      minLength: 6,
    },
  ];
  const { Message } = useContext(AlertContext);
  const loginHandler = async (values: any) => {
    console.log(values);
    //result is a promise that is never rejected but will contain error data if error occured
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (result?.error) {
      Message().error(result.error, false);
    } else {
      Message().success("Login Successfull", false);
      router.push("/");
    }
    console.log(result);
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
