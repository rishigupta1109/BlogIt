import clsx from "clsx";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import { IBlog, Icomment } from "../../../utils/interfaces";
import Viewer from "../../CreateBlog/Viewer";
import Tags from "../../ui/Tags/Tags";
import styles from "./Blog.module.scss";
import heartIcon from "../../../public/icons/heart.png";
import heartIcon2 from "../../../public/images/heart.svg";
import likeLoadingIcon from "../../../public/images/VAyR.gif";
import Link from "next/link";
import CustomButton from "./../../ui/CustomButton/CustomButton";
import CustomInput from "../../ui/CutomInput/CustomInput";
import { addLike, deleteLike } from "../../../utils/services";
import { getSession } from "next-auth/react";
import { AlertContext } from "./../../../store/AlertContext";
import { addComment } from "./../../../utils/services";
type Props = {
  blog: IBlog;
  hasLiked?: boolean;
  preview: boolean;
};

export default function Blog({ blog, hasLiked, preview }: Props) {
  const [liked, setLiked] = useState(hasLiked);
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [user, setUser] = useState<any>(null);
  const { Message } = useContext(AlertContext);
  useEffect(() => {
    const session = getSession();
    session
      .then((res) => setUser(res?.user?.name))
      .catch((err) => console.log(err));
  }, []);
  let tags: Array<string> = [];
  if (blog?.tags?.length > 1)
    tags = blog.tags.split(",").map((tag) => tag.trim());
  const { darkMode } = useContext(GlobalContext);
  console.log(blog);

  // let previewImage: string =
  //   typeof blog?.image !== "string"
  //     ? URL.createObjectURL(blog?.image)
  //     : "/blogimages/" + blog?.image;
  let previewImage = blog?.image;
  const imageURL = blog?.authorAvatar
    ? blog?.authorAvatar
    : "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";

  const likeHandler = async () => {
    if (!user) return Message().warning("Please login to like this blog");
    if (liked) {
      try {
        setLiking(true);
        const res = await deleteLike(user, blog?._id);
        setLiked(false);
        setLikes(likes - 1);
      } catch (err) {
        console.log(err);
      }
      setLiking(false);
    } else {
      try {
        setLiking(true);
        const res = await addLike(user, blog?._id);
        setLiked(true);
        setLikes(likes + 1);
      } catch (err) {
        console.log(err);
      }
      setLiking(false);
    }
  };
  console.log({ user });
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
        {tags.length > 0 && <Tags tags={tags} key={blog._id} />}
        <Viewer value={blog.body} />
      </div>
      {!preview && (
        <div className={styles.moreblogs}>
          <div className={styles.likecontainer}>
            {!liking && (
              <Image
                onClick={likeHandler}
                alt="like"
                src={liked ? heartIcon2 : heartIcon}
                height={25}
                width={25}
                className={styles.like}
              />
            )}
            {liking && (
              <Image
                onClick={likeHandler}
                alt="like"
                src={likeLoadingIcon}
                height={25}
                width={25}
                className={styles.like}
              />
            )}
            {likes}
          </div>
          <div>
            <CustomButton
              border="0"
              corner="6px"
              hoverbg="white"
              link={`/blogs/user/${blog?.author}`}
              bg="white"
              textColor="var(--dark-color-primary)"
              hoverTextColor="var(--dark-color-primary)"
            >
              <div className={styles.moreby}>
                <p>More from {blog.authorName}</p>
                <Image src={imageURL} alt="profile" height={30} width={30} />
              </div>
            </CustomButton>
          </div>
        </div>
      )}
      {!preview && (
        <CommentSection
          blogId={blog?._id}
          user={user}
          comments={blog.comments}
        />
      )}
    </div>
  );
}

const CommentSection = ({
  comments,
  user,
  blogId,
}: {
  comments: Icomment[] | undefined;
  user: string;
  blogId: string;
}) => {
  console.log({ user });
  const [commentsData, setComments] = useState(comments || []);
  const [commenting, setCommenting] = useState(false);
  const { Message } = useContext(AlertContext);
  const submitCommentHandler = async (comment: string) => {
    if (!user || user?.trim()?.length === 0)
      return Message().warning("Please login to comment");
    if (comment?.trim()?.length === 0 || user?.trim()?.length === 0) return;
    try {
      setCommenting(true);
      const res = await addComment(user, blogId, comment);
      if (res?.status === 200) setComments([...commentsData, res.comment]);
      else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    setCommenting(false);
  };
  const getDate = (createdAt: Date) => {
    let b = new Date(),
      a = new Date(createdAt);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    let ans = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    if (ans === 0) return "few minutes ago..";
    else return `${ans} days ago`;
  };
  return (
    <div className={styles.comment_section}>
      <h2>Comments</h2>
      <div className={styles.input_container}>
        <CommentInput onSubmit={submitCommentHandler} />
      </div>
      <div className={styles.comment_container}>
        {commenting && (
          <div className={styles.comment}>
            <div className={styles.fakeMessage}></div>
            <div className={styles.fakeMessage}></div>
          </div>
        )}
        {commentsData?.length > 0 ? (
          commentsData.reverse()?.map((comment, idx) => (
            <div key={idx} className={styles.comment}>
              <h4>{comment?.text}</h4>
              <div>
                <p>{comment?.user?.name} </p>
                <p>{getDate(comment.createdAt)}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <h3>Be the first to comment</h3>
          </div>
        )}
      </div>
    </div>
  );
};
const CommentInput = ({
  onSubmit,
}: {
  onSubmit: (comment: string) => void;
}) => {
  const [comment, setComment] = useState("");
  return (
    <>
      <input
        name="comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        type="text"
        placeholder="Comment"
      />
      <CustomButton
        boxShadow="2px 2px 2px var(--light-color-primary)"
        label="Submit"
        bg="white"
        border="0"
        corner="6px"
        hoverbg="var(--dark-color-primary)"
        textColor="var(--dark-color-prmary)"
        hoverTextColor="white"
        onClick={() => {
          onSubmit(comment);
        }}
      />
    </>
  );
};
