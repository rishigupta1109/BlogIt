import React from "react";
import Blog from "../../components/blog/blog/Blog";
import styles from "../../styles/BlogPage.module.scss";
import { GetServerSidePropsContext } from "next";
import { server } from "../../utils/config";
import { IBlog } from "../../utils/interfaces";
import Back from "./../../components/ui/back/Back";
type Props = {
  blog: IBlog;
};
export default function BlogPage({ blog }: Props) {
  return (
    <div className={styles.blogContainer}>
      <Back />
      <Blog blog={blog} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { blogId } = context.query;
  let blog = {};
  try {
    const res = await fetch(`${server}/api/blog/${blogId}`, {
      method: "PATCH",
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) blog = data.blog;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      blog,
    },
  };
}
