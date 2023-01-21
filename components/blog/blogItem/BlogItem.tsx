import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
import heartIcon from "../../../public/icons/heart.png";
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
  let previewImage: string =
    typeof image !== "string" ? URL.createObjectURL(image) : image;
  const imageURL =
    "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  return (
    <div className={classname} onClick={handleOpenBlog}>
      <Image
        src={previewImage}
        alt={title}
        className={styles.image}
        height={350}
        width={350}
      />
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <Image src={imageURL} alt="profile" height={30} width={30} />
          <div>
            <p>{author}</p>
            <time>{createdAt.toDateString()}</time>
          </div>
        </div>
        <span>
          <Image src={heartIcon} alt={"heart"} height={20} width={20} />4
        </span>
      </div>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <Viewer value={description} />
      </div>
      <div className={styles.tagContainer}>
        <Tags tags={tags} />
      </div>
    </div>
  );
}
