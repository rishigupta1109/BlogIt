import React from "react";

type Props = {};
import notFoundImage from "../public/images/404.gif";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import CustomButton from "../components/ui/CustomButton/CustomButton";
import CustomHead from "../components/CustomHead/CustomHead";
export default function NotFound({}: Props) {
  return (
    <div className={styles.notfound}>
      <CustomHead
        title="404 Not Found"
        image={notFoundImage}
        description="404 not found"
      />
      <Image
        className={styles.notFoundImage}
        src={notFoundImage}
        alt="404"
        height={100}
        width={100}
      />
      <h1>404 Not Found</h1>
      <p>
        The page you are looking for might not exists or you are not authorized
        to access it.
      </p>
      <div>
        <CustomButton
          hoverbg={"var(--dark-color-secondary)"}
          type="filled"
          bg={"var(--light-color-primary)"}
          textColor="white"
          corner="6px"
          label="Get Back to Home"
          link={`/`}
        />
      </div>
    </div>
  );
}
