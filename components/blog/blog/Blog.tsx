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
  console.log(blog);
  let previewImage: string =
    typeof blog?.image !== "string"
      ? URL.createObjectURL(blog?.image)
      : blog?.image;
  const imageURL =
    "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
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
            <time>{blog?.createdAt.toDateString()}</time>
          </div>
        </div>
        <h1 className={styles.title}>{blog.title}</h1>
        {tags.length && <Tags tags={tags} key={blog.id} />}
        <Viewer value={blog.body} />
      </div>
    </div>
  );
}
