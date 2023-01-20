import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useContext } from "react";
import BlogList from "../../components/blog/bloglist/BlogList";
import { GlobalContext } from "../../store/GlobalContext";
import styles from "../../styles/Home.module.scss";
import pic from "../../public/images/istockphoto-164451886-612x612.jpg";
import { IBlog } from "../../utils/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const featuredBlogs = [
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

export default function MyBlogsPage() {
  const [myblogs, setMyBlogs] = useState<Array<IBlog>>(featuredBlogs);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [session]);
  let classname = styles.homePage;
  const { darkMode } = useContext(GlobalContext);
  if (darkMode) classname = clsx(styles.homePage, styles.dark);
  return (
    <div>
      <main className={classname}>
        <h1>Your Blogs</h1>
        <BlogList blogs={myblogs} />
      </main>
    </div>
  );
}
