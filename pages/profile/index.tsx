import clsx from "clsx";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import styles from "../../styles/Profile.module.scss";
import { GlobalContext } from "../../store/GlobalContext";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Loader from "../../components/ui/Loader/Loader";
import UserProfile from "./../../components/profile/index";
type Props = {};

export default function ProfilePage({}: Props) {
  const { darkMode } = useContext(GlobalContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";
  const authenticated = status === "authenticated";
  useEffect(() => {
    if (!loading && !authenticated) {
      router.push("/login");
    }
  }, [session]);
  if (loading) return <Loader />;
  const { user } = useContext(GlobalContext);
  console.log(user);
  const profileURL =
    "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  if (!user) {
    return <Loader />;
  }
  const { name, avatar, description, role, _id }: any = user;

  return (
    <UserProfile
      height="85vh"
      name={name}
      avatar={avatar}
      description={description}
      role={role}
      canEdit={true}
    />
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      session,
    }, // will be passed to the page component as props
  };
}
