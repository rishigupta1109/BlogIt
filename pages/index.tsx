import clsx from "clsx";
import { useContext, useState } from "react";
import BlogList from "../components/blog/bloglist/BlogList";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/Home.module.scss";
import pic from "../public/images/istockphoto-164451886-612x612.jpg";
import { IBlog } from "../utils/interfaces";
import { GetServerSidePropsContext } from "next";
import { server } from "./../utils/config";
const FeaturedBlogs = [
  {
    id: Math.ceil(Math.random() * 100).toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    tags: "coding,study",
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    body: "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.ceil(Math.random() * 100).toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    tags: "coding,study",
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    body: "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.ceil(Math.random() * 100).toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    tags: "coding,study",
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    body: "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.ceil(Math.random() * 100).toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    tags: "coding,study",
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    body: "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
];

export default function HomePage({ blogs }) {
  let classname = styles.homePage;
  const { darkMode } = useContext(GlobalContext);
  if (darkMode) classname = clsx(styles.homePage, styles.dark);
  return (
    <>
      <main className={classname}>
        <h1>Featured Blogs</h1>
        {blogs?.length > 0 ? <BlogList blogs={blogs} /> : <p>No blogs found</p>}
      </main>
    </>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let blogs = [];
  try {
    const response = await fetch(`${server}/api/feauturedblogs`);
    console.log(response);
    const data = await response.json();
    blogs = data.blogs;
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
