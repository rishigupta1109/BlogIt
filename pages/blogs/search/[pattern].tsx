import React from "react";
import { IBlog } from "../../../utils/interfaces";
import { server } from "./../../../utils/config";
import { GetServerSidePropsContext } from "next";
import BlogList from "../../../components/blog/bloglist/BlogList";
import styles from "../../../styles/Home.module.scss";
type Props = { blogs: Array<IBlog> };

export default function SearchPage({ blogs }: Props) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2 className={styles.heading}>{blogs.length} blog(s) found</h2>
      {blogs.length > 0 && <BlogList blogs={blogs} isMyBlog={false} />}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let blogs = [];
  console.log("hey");
  try {
    const response = await fetch(
      `${server}/api/blog/search?pattern=${context.query.pattern}`
    );
    console.log(response);
    const data = await response.json();
    if (response.status === 200) blogs = data.blogs;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      blogs,
    }, // will be passed to the page component as props
  };
}
