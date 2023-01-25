import React from "react";
import { IBlog } from "../../../utils/interfaces";
import BlogItem from "../blogItem/BlogItem";
import styles from "./BlogList.module.scss";
import Modal from "../../Modal/Modal";
type Props = {
  blogs: Array<IBlog>;
  isMyBlog?: boolean;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
};

export default function BlogList({ blogs, setBlogs, isMyBlog }: Props) {
  return (
    <div className={styles.bloglist}>
      {blogs &&
        blogs.map((blog) => {
          return (
            <BlogItem
              setBlogs={setBlogs}
              key={blog._id}
              isMyBlog={isMyBlog}
              data={blog}
            />
          );
        })}
    </div>
  );
}
