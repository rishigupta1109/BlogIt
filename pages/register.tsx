import React, { useContext, useState } from "react";
import Form from "../components/ui/Form/Form";
import { AlertContext } from "../store/AlertContext";
import { GlobalContext } from "../store/GlobalContext";
import { sendOtp, signup, verifyOtp } from "../utils/services";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import CustomHead from "./../components/CustomHead/CustomHead";

type Props = {};

export default function RegisterPage({}: Props) {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    password: string;
    cpassword: string;
  }>();
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
  const otpForm = [
    {
      name: "otp",
      type: "text",
      label: "OTP",
      required: true,
      errorText: "Please enter a valid OTP",
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
    setUserDetails(values);
    try {
      const data = await sendOtp(email);
      if (data.status === 200) {
        setShowOtpForm(true);
        Message().success("OTP sent successfully");
      } else {
        Message().error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const registerUser = async () => {
    if (!userDetails) {
      Message().warning("User Data Lost. Please Try again..");
      return;
    }
    const { name, email, password, cpassword } = userDetails;
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
  const verifyOtpHandler = async (values: { otp: string }) => {
    const { otp } = values;
    if (!otp) {
      return;
    }
    try {
      const data = await verifyOtp(userDetails?.email || "", otp);
      if (data.status === 200) {
        registerUser();
      } else {
        Message().error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CustomHead
        title={"Register to Blogger`s Blog"}
        description={"Register to Blogger`s Blog"}
      />
      {!showOtpForm && (
        <Form
          link={{
            text: "Already have an account?",
            url: "login",
          }}
          heading="Register"
          submitHandler={registerHandler}
          fields={registerForm}
        />
      )}
      {showOtpForm && (
        <Form
          link={{
            text: "",
            url: "Otp Verification",
          }}
          heading="Verify OTP"
          submitHandler={verifyOtpHandler}
          fields={otpForm}
        />
      )}
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
