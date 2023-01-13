import clsx from "clsx";
import { useContext, useState } from "react";
import BlogList from "../components/blog/bloglist/BlogList";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/Home.module.scss";
import pic from "../public/images/istockphoto-164451886-612x612.jpg";
import { IBlog } from "../utils/interfaces";
const FeaturedBlogs = [
  {
    id: Math.random().toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    title: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image:
      "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
];

export default function HomePage() {
  let classname = styles.homePage;
  const [featuredBlogs, setFeaturedBlogs] =
    useState<Array<IBlog>>(FeaturedBlogs);
  const { darkMode } = useContext(GlobalContext);
  if (darkMode) classname = clsx(styles.homePage, styles.dark);
  return (
    <>
      <main className={classname}>
        <h1>Featured Blogs</h1>
        <BlogList blogs={featuredBlogs} />
      </main>
    </>
  );
}
