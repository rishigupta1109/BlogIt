import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import Blog from "../components/blog/blog/Blog";
import BlogForm from "../components/CreateBlog/BlogForm";
import Viewer from "../components/CreateBlog/Viewer";
import { GlobalContext } from "../store/GlobalContext";
import styles from "../styles/CreateBlog.module.scss";
import { defaultBlog, IBlog } from "../utils/interfaces";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createBlog } from "../utils/services";
import { AlertContext } from "../store/AlertContext";
import { GetServerSidePropsContext } from "next";
import Loader from "../components/ui/Loader/Loader";
import CustomHead from "../components/CustomHead/CustomHead";
type Props = {};

export default function CreateBlogPage({}: Props) {
  const [preview, setPreview] = useState<boolean>(false);
  const [formData, setFormData] = useState<IBlog>(defaultBlog);
  const { darkMode, user } = useContext(GlobalContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";

  const { Message } = useContext(AlertContext);
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    } else {
      if (user)
        setFormData({
          ...formData,
          author: _id,
          authorName: name,
          authorAvatar: avatar,
        });
    }
    console.log(user);
  }, [user]);
  if (loading || !user) return <Loader />;
  const { _id, name, avatar } = user;
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
      if (res.status == 201) {
        Message().success(res.message);
        setFormData({
          ...defaultBlog,
          body: "",
          author: _id,
          authorName: name,
          authorAvatar: avatar,
        });
      } else {
        if (res.message) Message().error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      Message().error(err);
    }
  };
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <CustomHead
        title={"Create Blog"}
        image={user.avatar}
        description={"Create a new blog here."}
        author={user.name}
      />
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}
