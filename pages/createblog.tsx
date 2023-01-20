import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import Blog from "../components/blog/blog/Blog";
import BlogForm from "../components/CreateBlog/BlogForm";
import Viewer from "../components/CreateBlog/Viewer";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/CreateBlog.module.scss";
import { defaultBlog, IBlog } from "../utils/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
type Props = {};

export default function createblogPage({}: Props) {
  const [preview, setPreview] = useState<boolean>(false);
  const [formData, setFormData] = useState<IBlog>(defaultBlog);
  const { darkMode } = useContext(GlobalContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [session]);
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
