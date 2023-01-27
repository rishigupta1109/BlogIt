import React, { useContext } from "react";
import Form from "../components/ui/Form/Form";
import { AlertContext } from "../store/AlertContext";
import { GlobalContext } from "../store/GlobalContext";
import { signup } from "../utils/services";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import CustomHead from "./../components/CustomHead/CustomHead";

type Props = {};

export default function RegisterPage({}: Props) {
  const registerForm = [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      errorText: "Please enter a valid name",
    },
    {
      name: "email",
      type: "email",
      label: "Email Id",
      required: true,
      isEmail: true,
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
    {
      name: "cpassword",
      type: "password",
      label: "Confirm Password",
      required: true,
      errorText: "Password must be atleast 6 characters long",
      minLength: 6,
    },
  ];
  const router = useRouter();
  const { setLoading } = useContext(GlobalContext);
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
        router.push("/login");
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
      <CustomHead
        title={"Register to Blogit"}
        image={"/images/Blogger`s.png"}
        description={"Register to Blogit"}
      />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}
