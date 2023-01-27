import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useContext } from "react";
import BlogList from "../../components/blog/bloglist/BlogList";
import { GlobalContext } from "../../store/GlobalContext";
import styles from "../../styles/Home.module.scss";
import pic from "../../public/images/istockphoto-164451886-612x612.jpg";
import { IBlog } from "../../utils/interfaces";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { server } from "../../utils/config";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import Loader from "../../components/ui/Loader/Loader";
import CustomHead from "./../../components/CustomHead/CustomHead";
import Image from "next/image";
import notavailImage from "../../public/images/writeOne.gif";

export default function MyBlogsPage({ blogs }: { blogs: IBlog[] }) {
  console.log(blogs);
  const [blogsData, setBlogsData] = useState<IBlog[]>(blogs);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  const { darkMode } = useContext(GlobalContext);
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [session]);
  if (loading) return <Loader />;
  let classname = styles.homePage;
  if (darkMode) classname = clsx(styles.homePage, styles.dark);

  return (
    <div>
      <main className={classname}>
        <CustomHead
          title={"Your Blogs | Blogger`s Blog"}
          image={"/images/Blogger`s.png"}
          description={"Collection of blogs by You"}
          author={"YOU"}
        />
        <h1>Your Blogs</h1>
        {blogsData?.length > 0 ? (
          <BlogList setBlogs={setBlogsData} isMyBlog={true} blogs={blogsData} />
        ) : (
          <div>
            <div className={styles.notAvail}>
              <Image
                src={notavailImage}
                alt="no blog availabe"
                height={300}
                width={300}
              />
              <h2>Write Your First Blog Now.</h2>
            </div>
            <CustomButton
              bg="var(--dark-color-primary)"
              corner="6px"
              label="Write a Blog"
              link="/createblog"
              textColor="white"
              hoverTextColor="white"
              hoverbg="var(--dark-color-secondary)"
              type="filled"
            />
          </div>
        )}
      </main>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  let blogs = [];
  try {
    const session = await getSession({ req: context.req });
    // console.log({ session });
    if (!session?.user?.name) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const response = await fetch(
      `${server}/api/myblogs` +
        "?" +
        new URLSearchParams({
          _id: session?.user?.name,
        })
    );
    const data = await response.json();
    if (response.status === 200) {
      blogs = data.blogs;
    }
    // console.log({ data });
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      blogs,
    }, // will be passed to the page component as props
  };
}
