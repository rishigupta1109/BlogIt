import clsx from "clsx";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import styles from "../../styles/Profile.module.scss";
import { GlobalContext } from "../../store/GlobalContext";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
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
  if (loading) return <div>Loading...</div>;
  const profileURL =
    "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";

  const { name, avatar, description, role, id } = session?.user?.name;

  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <div className={styles.header}></div>
      <div className={styles.profile}>
        <Image src={`/user/${avatar}`} alt="profile" height={150} width={150} />
        {name && <h1>{name}</h1>}
        {role && <h3>{role}</h3>}
        {<p>{description}</p>}
        <CustomButton
          link="/profile/edit"
          label="Edit Details"
          corner="6px"
          textColor="white"
          type="filled"
          bg={
            darkMode
              ? "var(--dark-color-primary)"
              : "var(--light-color-primary)"
          }
          border="none"
          hoverTextColor="white"
          hoverbg="var(--dark-color-secondary)"
        />
      </div>
    </div>
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
