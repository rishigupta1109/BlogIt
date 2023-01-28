import React, { useContext } from "react";

type Props = {};
import styles from "./Footer.module.scss";
import mailIcon from "../../../public/icons/gmail.png";
import Image from "next/image";
import { GlobalContext } from "../../../store/GlobalContext";
import clsx from "clsx";
export default function Footer({}: Props) {
  const { darkMode } = useContext(GlobalContext);
  return (
    <div
      className={darkMode ? clsx(styles.footer, styles.dark) : styles.footer}
    >
      <div className={styles.row} style={{ alignItems: "center" }}>
        <Image
          className={styles.mailicon}
          alt="mailicon"
          style={{ marginRight: "10px" }}
          src={mailIcon}
        ></Image>

        <a href="mailto:thebookbajaar@gmail.com">Blogger`s Blog</a>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        Developed by :{"  "}
        <a
          target="_blank"
          rel="noreferrer"
          className={styles.name}
          href="https://www.linkedin.com/in/rishi-gupta-027298204/"
        >
          {" "}
          &nbsp;Rishi Gupta
        </a>
      </div>
      <div className="row">
        &copy; Copyright 2023 -<b> Blogger`s Blog!</b>{" "}
      </div>
    </div>
  );
}
