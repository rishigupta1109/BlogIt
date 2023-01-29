import clsx from "clsx";
import Image from "next/image";
import React, { useContext } from "react";
import CustomButton from "../../components/ui/CustomButton/CustomButton";
import styles from "../../styles/Profile.module.scss";
import { GlobalContext } from "../../store/GlobalContext";
type Props = {
  name: string;
  role?: string;
  description?: string;
  avatar?: string;
  canEdit: boolean;
  height: string;
};

export default function UserProfile({
  name,
  role,
  description,
  avatar,
  canEdit,
  height = "85vh",
}: Props) {
  const { darkMode } = useContext(GlobalContext);
  if (avatar === undefined || avatar === "" || avatar === "profile.jpg")
    avatar = "/user/profile.jpg";
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
      style={{ height: height }}
    >
      <div className={styles.header}></div>
      <div className={styles.profile}>
        <Image src={`${avatar}`} alt="profile" height={150} width={150} />
        {name && <h1 style={{ textTransform: "capitalize" }}>{name}</h1>}
        {role && <h3 style={{ textTransform: "capitalize" }}>{role}</h3>}
        {description && <p>{description}</p>}
        {canEdit && (
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
        )}
      </div>
    </div>
  );
}
