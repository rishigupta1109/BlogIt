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
import Loader from "../../components/ui/Loader/Loader";
import CustomHead from "./../../components/CustomHead/CustomHead";

type Props = {};

export default function EditPage({}: Props) {
  const { data, status } = useSession();
  const { user, setUser, setLoading } = useContext(GlobalContext);
  const { Message } = useContext(AlertContext);
  if (status === "loading") {
    return <Loader />;
  }
  if (!user) return <Loader />;
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
        setLoading(true);
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
      setLoading(false);
    } else {
      let formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("role", values.role);
      formData.append("description", values.description);
      try {
        setLoading(true);
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
      setLoading(false);
    }
  };
  let avatar = user.avatar;
  if (user.avatar === "profile.jpg") {
    avatar = "/user/profile.jpg";
  }
  const userForm = [
    {
      name: "image",
      type: "file",
      label: "Image",
      required: false,
      errorText: "Please upload a valid image",
      defaultValue: avatar,
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
      <CustomHead
        title={"Edit Your Profile"}
        image={user.avatar}
        description={"Edit your profile details"}
        author={user.name}
      />
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
