import clsx from "clsx";
import { useContext } from "react";
import BlogList from "../components/blog/bloglist/BlogList";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/Home.module.scss";
import pic from "../public/images/istockphoto-164451886-612x612.jpg";
const featuredBlogs = [
  {
    id: Math.random().toString(),
    headline: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image: pic,
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    headline: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image: pic,
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    headline: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image: pic,
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
  {
    id: Math.random().toString(),
    headline: "The First IMO Shortlisted Problem from Bangladesh",
    body: ["hello"],
    tags: ["coding", "study"],
    image: pic,
    author: "Rishi Gupta",
    createdAt: new Date(),
    description:
      "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
  },
];

export default function Home() {
  let classname = styles.homePage;
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
