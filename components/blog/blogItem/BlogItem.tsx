import clsx from "clsx";
import Image from "next/image";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
type Props = {
  data: IBlog;
};

export default function BlogItem({ data }: Props) {
  const { id, headline, body, tags, image, author, createdAt, description } =
    data;
  const { darkMode } = useContext(GlobalContext);
  let classname = styles.container;
  if (darkMode) classname = clsx(classname, styles.dark);
  return (
    <div className={classname}>
      <Image
        src={image}
        alt={headline}
        className={styles.image}
        height={350}
        width={350}
      />
      <Tags tags={tags} />
      <h1>{headline}</h1>
      <h3>{description}</h3>
      <div className={styles.info}>
        <p>{author}</p>
        <time>{createdAt.toDateString()}</time>
      </div>
    </div>
  );
}
