import React, { useContext, useEffect } from "react";
import Blog from "../../components/blog/blog/Blog";
import styles from "../../styles/BlogPage.module.scss";
import { GetServerSidePropsContext } from "next";
import { server } from "../../utils/config";
import { IBlog } from "../../utils/interfaces";
import Back from "./../../components/ui/back/Back";
import { getSession } from "next-auth/react";
import CustomHead from "../../components/CustomHead/CustomHead";
import { GlobalContext } from "../../store/GlobalContext";
type Props = {
  blog: IBlog;
  hasLiked: boolean;
};
export default function BlogPage({ blog, hasLiked }: Props) {
  const { setLoading } = useContext(GlobalContext);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className={styles.blogContainer}>
      <CustomHead
        title={blog.title}
        image={blog.image}
        description={blog.body}
        author={blog.author}
        keywords={blog.tags}
      />
      <Back />
      <Blog preview={false} hasLiked={hasLiked} blog={blog} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { blogId } = context.query;
  let blog = {},
    hasLiked = false,
    isLoggedIn = false;
  try {
    const session = await getSession({ req: context.req });
    const res = await fetch(
      `${server}/api/blog/${blogId}?userId=${session?.user?.name}`,
      {
        method: "PATCH",
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.status === 200) blog = data.blog;
    else {
      return {
        notFound: true,
      };
    }
    if (!session) return { props: { blog, hasLiked, isLoggedIn } };
    const res2 = await fetch(
      `${server}/api/blog/${blogId}/like?userId=${session?.user?.name}`
    );
    const data2 = await res2.json();
    console.log({ data2 });
    if (res2.status === 200) hasLiked = true;
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      blog,
      hasLiked,
    },
  };
}
