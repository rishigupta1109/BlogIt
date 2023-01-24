import clsx from "clsx";
import { useContext, useState } from "react";
import BlogList from "../components/blog/bloglist/BlogList";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/Home.module.scss";
import pic from "../public/images/istockphoto-164451886-612x612.jpg";
import { IBlog } from "../utils/interfaces";
import { GetServerSidePropsContext } from "next";
import { server } from "./../utils/config";

export default function HomePage({ blogs }: { blogs: IBlog[] }) {
  let classname = styles.homePage;
  const { darkMode } = useContext(GlobalContext);
  if (darkMode) classname = clsx(styles.homePage, styles.dark);
  return (
    <>
      <main className={classname}>
        <h1>Featured Blogs</h1>
        {blogs?.length > 0 ? (
          <BlogList isMyBlog={false} blogs={blogs} />
        ) : (
          <h2>No blogs found</h2>
        )}
      </main>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let blogs = [];
  console.log("hey");
  try {
    const response = await fetch(`${server}/api/feauturedblogs`);
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
