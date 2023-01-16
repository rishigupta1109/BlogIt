import React from "react";
import Blog from "../../components/blog/blog/Blog";
import styles from "../../styles/BlogPage.module.scss";
type Props = {};
const blog = {
  id: Math.ceil(Math.random() * 100).toString(),
  title: "The First IMO Shortlisted Problem from Bangladesh",
  tags: "coding,study",
  image:
    "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80s",
  author: "Rishi Gupta",
  createdAt: new Date(),
  body: "It’s an honor for me share that my problem got shortlisted for International Math Olympiad 2021 and now the problem is public.",
};

export default function BlogPage({}: Props) {
  return (
    <div className={styles.blogContainer}>
      <Blog blog={blog} />
    </div>
  );
}
