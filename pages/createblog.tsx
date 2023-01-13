import clsx from "clsx";
import React, { useContext, useState } from "react";
import Blog from "../components/blog/blog/Blog";
import BlogForm from "../components/CreateBlog/BlogForm";
import Viewer from "../components/CreateBlog/Viewer";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/CreateBlog.module.scss";
import { defaultBlog, IBlog } from "../utils/interfaces";
type Props = {};

export default function createblogPage({}: Props) {
  const [preview, setPreview] = useState<boolean>(false);
  const [formData, setFormData] = useState<IBlog>(defaultBlog);
  const { darkMode } = useContext(GlobalContext);
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <div className={styles.switchBox}>
        <h1
          className={!preview ? styles.active : ""}
          onClick={() => setPreview(false)}
        >
          Create Blog
        </h1>
        <h1
          className={preview ? styles.active : ""}
          onClick={() => setPreview(true)}
        >
          Preview
        </h1>
      </div>
      {!preview && <BlogForm setFormData={setFormData} formData={formData} />}
      {preview && (
        <div className={styles.previewContainer}>
          <Blog blog={formData} />
        </div>
      )}
    </div>
  );
}
