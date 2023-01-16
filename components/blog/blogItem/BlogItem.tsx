import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import { markdownToHtml } from "../../../utils/Parser";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
type Props = {
  data: IBlog;
};

export default function BlogItem({ data }: Props) {
  const { id, title, body, image, author, createdAt } = data;
  const tags = data.tags.split(",").map((tag) => tag.trim());
  const description = body.slice(0, 80) + "...";
  const { darkMode } = useContext(GlobalContext);
  let classname = styles.container;
  if (darkMode) classname = clsx(classname, styles.dark);
  const router = useRouter();
  const handleOpenBlog = () => {
    router.push(`/blogs/${id}`);
  };
  return (
    <div className={classname} onClick={handleOpenBlog}>
      <Image
        src={image}
        alt={title}
        className={styles.image}
        height={350}
        width={350}
      />
      <Tags tags={tags} />
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <Viewer value={description} />
      </div>
      <div className={styles.info}>
        <p>{author}</p>
        <time>{createdAt.toDateString()}</time>
      </div>
    </div>
  );
}
