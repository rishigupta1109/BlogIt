import clsx from "clsx";
import Image from "next/image";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./Blog.module.scss";
import { GetServerSidePropsContext } from "next";
import { server } from "../../../utils/config";
type Props = {
  blog: IBlog;
};

export default function Blog({ blog }: Props) {
  let tags: Array<string> = [];
  if (blog?.tags?.length > 1)
    tags = blog.tags.split(",").map((tag) => tag.trim());
  const { darkMode } = useContext(GlobalContext);
  console.log(blog);

  let previewImage: string =
    typeof blog?.image !== "string"
      ? URL.createObjectURL(blog?.image)
      : "/blogimages/" + blog?.image;
  if (previewImage === "/blogimages/") previewImage = "";
  const imageURL = blog?.authorAvatar
    ? "/user/" + blog?.authorAvatar
    : "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      {previewImage.trim().length > 0 && (
        <Image
          className={styles.image}
          alt={blog?.title}
          src={previewImage}
          width={2000}
          height={2000}
        />
      )}
      <div className={styles.content}>
        <div className={styles.info}>
          <Image src={imageURL} alt="profile" height={30} width={30} />
          <div>
            <p>{blog?.authorName}</p>
            <time>{new Date(blog?.createdAt).toDateString()}</time>
          </div>
        </div>
        <h1 className={styles.title}>{blog.title}</h1>
        {tags.length > 0 && <Tags tags={tags} key={blog.id} />}
        <Viewer value={blog.body} />
      </div>
    </div>
  );
}
