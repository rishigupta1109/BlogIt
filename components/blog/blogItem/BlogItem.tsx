import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./BlogItem.module.scss";
import viewIcon from "../../../public/images/icons8-eye-50.png";
import darkViewIcon from "../../../public/images/icons8-eye-50white.png";
import CustomButton from "../../ui/CustomButton/CustomButton";
import editIcon from "../../../public/images/edit_icon.svg";
import editLightIcon from "../../../public/images/edit-light.svg";
import deleteIcon from "../../../public/images/delete.svg";
import deleteLightIcon from "../../../public/images/delete-light.svg";
import { deleteBlog } from "../../../utils/services";
import { AlertContext } from "./../../../store/AlertContext";
import Modal from "../../Modal/Modal";
type Props = {
  data: IBlog;
  isMyBlog?: boolean;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
};

export default function BlogItem({ data, isMyBlog, setBlogs }: Props) {
  const {
    _id,
    title,
    body,
    image,
    author,
    authorName,
    createdAt,
    authorAvatar,
    views,
  } = data;
  console.log(data);
  const tags = data.tags.split(",").map((tag) => tag.trim());
  const description = body.slice(0, 50) + "...";
  const { darkMode, setLoading } = useContext(GlobalContext);
  let classname = styles.container;
  if (darkMode) classname = clsx(classname, styles.dark);
  const router = useRouter();
  const handleOpenBlog = () => {
    setLoading(true);
    router.push(`/blogs/${_id}`);
  };
  // let previewImage: string =
  //   typeof image !== "string"
  //     ? URL.createObjectURL(image)
  //     : "/blogimages/" + image;
  let previewImage: string = image;
  if (previewImage === "") previewImage = "/images/loading3.gif";
  const imageURL =
    authorAvatar !== "profile.jpg" ? authorAvatar : "/user/profile.jpg";
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
            <p style={{ textTransform: "capitalize" }}>{authorName}</p>
            <time>{new Date(createdAt).toDateString()}</time>
          </div>
        </div>
        <span>
          <Image
            src={darkMode ? darkViewIcon : viewIcon}
            alt={"view"}
            height={20}
            width={20}
          />
          {views}
        </span>
      </div>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        <Viewer value={description} />
      </div>
      <div className={styles.tagContainer}>
        <Tags tags={tags} />
      </div>
      {isMyBlog && <AuthorButtons setBlogs={setBlogs} id={_id} />}
    </div>
  );
}

const AuthorButtons = ({
  id,
  setBlogs,
}: {
  id: string;
  setBlogs?: React.Dispatch<React.SetStateAction<IBlog[]>>;
}) => {
  const { Message } = useContext(AlertContext);
  const { setLoading, darkMode } = useContext(GlobalContext);
  const [showModal, setShowModal] = React.useState(false);
  const deleteBlogHandler = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteBlog(id);
      console.log(res);
      if (res.status === 200) {
        Message().success(res.message);
        if (setBlogs)
          setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        Message().error(res.message);
      }
    } catch (err: any) {
      console.log(err);
      Message().error(err);
    }
    setLoading(false);
  };
  return (
    <div className={styles.authorbtns}>
      <Modal
        text="Are you sure you want to delete this blog?"
        show={showModal}
        onYes={(e) => {
          e.stopPropagation();
          deleteBlogHandler(id);
        }}
        onNo={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
      />
      <CustomButton
        bg="transparent"
        type="filled"
        corner="100%"
        border="none"
        hoverbg="transparent"
        padding="10px"
        onClick={(e) => {
          e.stopPropagation();
        }}
        link={`/myblogs/${id}`}
      >
        <Image
          src={darkMode ? editLightIcon : editIcon}
          alt="edit"
          height={20}
          width={20}
        />
      </CustomButton>
      <CustomButton
        padding="10px"
        bg="transparent"
        type="filled"
        corner="100%"
        border="none"
        hoverbg="transparent"
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
      >
        <Image
          src={darkMode ? deleteLightIcon : deleteIcon}
          alt="delete"
          height={20}
          width={20}
        />
      </CustomButton>
    </div>
  );
};
