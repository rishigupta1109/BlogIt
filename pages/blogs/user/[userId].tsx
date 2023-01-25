import React from "react";
import { IBlog, IUser } from "../../../utils/interfaces";
import UserProfile from "../../../components/profile";
import { GetServerSidePropsContext } from "next";
import { server } from "./../../../utils/config";
import BlogList from "../../../components/blog/bloglist/BlogList";
import CustomHead from "./../../../components/CustomHead/CustomHead";

type Props = {
  blogs: IBlog[];
  user: IUser;
};

export default function UserBlogsPage({ blogs, user }: Props) {
  return (
    <div style={{ textAlign: "center" }}>
      <CustomHead
        title={user.name}
        image={user.avatar}
        description={"Collection of blogs by " + user.name + "."}
        author={user.name}
      />
      <UserProfile
        height="fit-content"
        name={user.name}
        role={user?.role}
        description={user?.description}
        avatar={user.avatar}
        canEdit={false}
      />
      <h1>Blogs from {user.name}</h1>
      <BlogList blogs={blogs} isMyBlog={false} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userId } = context.query;
  let user = null,
    blogs = [];
  try {
    const res1 = await fetch(`${server}/api/user/${userId}`);
    const data = await res1.json();
    if (res1.status === 200) user = data.user;
    else {
      return {
        redirect: {
          destination: "/404",
        },
      };
    }
    const res2 = await fetch(`${server}/api/user/${userId}/blogs`);
    const data2 = await res2.json();
    if (res2.status === 200) blogs = data2.blogs;
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/404",
      },
    };
  }
  return {
    props: {
      user,
      blogs,
    },
  };
}
