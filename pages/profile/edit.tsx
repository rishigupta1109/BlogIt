import React from "react";
import Form from "../../components/ui/Form/Form";
import { useSession } from "next-auth/react";
import {
  updateUserDetailsWithImage,
  updateUserDetailsWithoutImage,
} from "../../utils/services";

type Props = {};

export default function EditPage({}: Props) {
  const { data, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const submitHandler = async (values: any) => {
    console.log(values);
    if (
      values.image === data?.user?.name?.avatar &&
      values.name === data?.user?.name?.name &&
      values.role === data?.user?.name?.role &&
      values.description === data?.user?.name?.description
    ) {
      return;
    }
    if (values.image === data?.user?.name?.avatar) {
      try {
        const user = await updateUserDetailsWithoutImage(values, data);
        console.log(user);
      } catch (err) {
        console.log(err);
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
      } catch (err) {
        console.log(err);
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
      defaultValue: data?.user?.name?.avatar,
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      errorText: "Please enter a valid name",
      defaultValue: data?.user?.name?.name,
    },
    {
      name: "role",
      type: "text",
      label: "Work",
      required: false,
      defaultValue: data?.user?.name?.role,
    },

    {
      name: "description",
      type: "text",
      label: "About",
      required: false,
      defaultValue: data?.user?.name?.description,
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
