import React, { useContext } from "react";
import Form from "../components/ui/Form/Form";
import { getSession, signIn } from "next-auth/react";
import { AlertContext } from "../store/AlertContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "./../components/ui/Loader/Loader";
import { GetServerSidePropsContext } from "next";
import { GlobalContext } from "../store/GlobalContext";
import CustomHead from "./../components/CustomHead/CustomHead";
type Props = {};

export default function LoginPage({}: Props) {
  const { status } = useSession();
  const { setLoading, setSession } = useContext(GlobalContext);
  const router = useRouter();
  const { Message } = useContext(AlertContext);
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  if (loading) return <Loader />;
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
  const loginHandler = async (values: any) => {
    console.log(values);
    //result is a promise that is never rejected but will contain error data if error occured
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    console.log(result);
    if (result?.error) {
      Message().error(result.error, false);
    } else {
      Message().success("Login Successfull", false);
      const session = await getSession();
      setSession(session);
      router.push("/");
    }
    console.log(result);
    setLoading(false);
  };
  return (
    <div>
      <CustomHead
        title={"Login to Blogger`s Blog"}
        image={"/images/Blogger`s.png"}
        description={"Login to Blogger`s Blog"}
      />
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
