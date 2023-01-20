import clsx from "clsx";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import CustomButton from "../components/ui/CustomButton/CustomButton";
import styles from "../styles/Profile.module.scss";
import { GlobalContext } from "./../store/GlobalContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  const profileURL =
    "https://icon2.cleanpng.com/20180715/zwr/kisspng-real-estate-profile-picture-icon-5b4c1135ceddd7.2742655015317117978473.jpg";
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <div className={styles.header}></div>
      <div className={styles.profile}>
        <Image src={profileURL} alt="profile" height={150} width={150} />
        <h1>Rishi</h1>
        <h3>Full Stack Developer</h3>
        <p>Description</p>
        <CustomButton
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
