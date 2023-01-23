import React, { useContext } from "react";
import Form from "../../components/ui/Form/Form";
import { getSession, useSession } from "next-auth/react";
import {
  updateUserDetailsWithImage,
  updateUserDetailsWithoutImage,
} from "../../utils/services";
import { GlobalContext } from "../../store/GlobalContext";
import { GetServerSidePropsContext } from "next";
import { AlertContext } from "./../../store/AlertContext";

type Props = {};

export default function EditPage({}: Props) {
  const { data, status } = useSession();
  const { user, setUser } = useContext(GlobalContext);
  const { Message } = useContext(AlertContext);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!user) return <div>Loading...</div>;
  const submitHandler = async (values: any) => {
    console.log(values);
    if (
      values.image === user?.avatar &&
      values.name === user?.name &&
      values.role === user?.role &&
      values.description === user?.description
    ) {
      return;
    }
    if (values.image === user?.avatar) {
      let formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("description", values.description);
      try {
        const user = await updateUserDetailsWithoutImage(formData, data);
        console.log(user);
        if (user.status === 200) {
          setUser(user.user);
          Message().success("Profile Updated");
        }
      } catch (err) {
        console.log(err);
        Message().error("Something went wrong");
      }
    } else {
      let formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("description", values.description);
      try {
        const user = await updateUserDetailsWithImage(formData, data);
        console.log(user);
        if (user.status === 200) {
          setUser(user.user);
          Message().success("Profile Updated");
        }
      } catch (err) {
        console.log(err);
        Message().error("Something went wrong");
      }
    }
  };
  const userForm = [
    {
      name: "image",
      type: "file",
      label: "Image",
      required: false,
      errorText: "Please upload a valid image",
      defaultValue: user?.avatar,
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      errorText: "Please enter a valid name",
      defaultValue: user?.name,
    },
    {
      name: "role",
      type: "text",
      label: "Work",
      required: false,
      defaultValue: user?.role,
    },

    {
      name: "description",
      type: "text",
      label: "About",
      required: false,
      defaultValue: user?.description,
    },
  ];
  return (
    <div>
      <Form
        heading="Edit Profile"
        submitHandler={submitHandler}
        fields={userForm}
      />
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}
