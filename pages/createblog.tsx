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
import { createBlog } from "../utils/services";
import { AlertContext } from "../store/AlertContext";
type Props = {};

export default function createblogPage({}: Props) {
  const [preview, setPreview] = useState<boolean>(false);
  const [formData, setFormData] = useState<IBlog>(defaultBlog);
  const { darkMode } = useContext(GlobalContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const { Message } = useContext(AlertContext);
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    } else {
      if (session?.user?.name)
        setFormData({
          ...formData,
          author: session?.user?.name?.id,
          authorName: session?.user?.name?.name,
          authorAvatar: session?.user?.name.avatar,
        });
    }
    console.log(session);
  }, [session]);
  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    if (formData.title.trim().length < 1 || formData.body.trim().length < 1) {
      Message().warning("Please fill the required Fields", false);
      return;
    }
    let data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    try {
      const res = await createBlog(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
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
      {!preview && (
        <BlogForm
          onSubmit={submitHandler}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {preview && (
        <div className={styles.previewContainer}>
          <Blog blog={formData} />
        </div>
      )}
    </div>
  );
}
