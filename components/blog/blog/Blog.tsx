import clsx from "clsx";
import Image from "next/image";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./Blog.module.scss";
type Props = {
  blog: IBlog;
};

export default function Blog({ blog }: Props) {
  const tags = blog.tags.split(",").map((tag) => tag.trim());
  const { darkMode } = useContext(GlobalContext);
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <Image
        className={styles.image}
        alt={blog?.title}
        src={
          "https://images.unsplash.com/photo-1673364982114-a1e07639bda3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80s"
        }
        width={2000}
        height={2000}
      />
      <div className={styles.content}>
        <div className={styles.details}>
          <p>
            Posted by : <b>Rishi Gupta</b>{" "}
          </p>
          <time>{blog.createdAt?.toDateString()}</time>
        </div>
        <h1 className={styles.title}>{blog.title}</h1>
        {tags.length && <Tags tags={tags} key={blog.id} />}
        <Viewer value={blog.body} />
      </div>
    </div>
  );
}
