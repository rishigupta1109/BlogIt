import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
import heartIcon from "../../../public/images/heart.svg";
type Props = {
  data: IBlog;
};

export default function BlogItem({ data }: Props) {
  const {
    _id,
    title,
    body,
    image,
    authorName,
    createdAt,
    authorAvatar,
    likes,
  } = data;
  console.log(data);
  const tags = data.tags.split(",").map((tag) => tag.trim());
  const description = body.slice(0, 50) + "...";
  const { darkMode } = useContext(GlobalContext);
  let classname = styles.container;
  if (darkMode) classname = clsx(classname, styles.dark);
  const router = useRouter();
  const handleOpenBlog = () => {
    router.push(`/blogs/${_id}`);
  };
  let previewImage: string =
    typeof image !== "string"
      ? URL.createObjectURL(image)
      : "/blogimages/" + image;
  if (previewImage === "/blogimages/")
    previewImage =
      "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  const imageURL = authorAvatar
    ? "/user/" + authorAvatar
    : "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
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
          <Image
            src={imageURL}
            alt="profile"
            className={styles.profilepic}
            height={30}
            width={30}
          />
          <div>
            <p>{authorName}</p>
            <time>{new Date(createdAt).toDateString()}</time>
          </div>
        </div>
        <span>
          <Image src={heartIcon} alt={"heart"} height={20} width={20} />
          {likes}
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
