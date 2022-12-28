import React from "react";
import { IBlog } from "../../../utils/interfaces";
import BlogItem from "../blogItem/BlogItem";
import styles from "./BlogList.module.scss";
type Props = {
  blogs: Array<IBlog>;
};

export default function BlogList({ blogs }: Props) {
  return (
    <div className={styles.bloglist}>
      {blogs &&
        blogs.map((blog) => {
          return <BlogItem key={blog.id} data={blog} />;
        })}
    </div>
  );
}
