import clsx from "clsx";
import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import ModeToggle from "../ModeToggleButton/ModeToggle";
import styles from "./Navbar.module.scss";
type Props = {};

export default function Navbar({}: Props) {
  let { darkMode } = useContext(GlobalContext);
  console.log(darkMode);
  let classname = styles.navbar;
  if (darkMode) classname = clsx(styles.navbar, styles.dark);
  return (
    <div className={classname}>
      <ul>
        <li>
          <Link href={`/`}>BlogIt!</Link>
        </li>
        <li>
          <Link href={`/blogs`}>Blogs</Link>
        </li>
        <li>
          <Link href={`/my-blogs`}>My Blogs!</Link>
        </li>
        <li>
          <Link className={styles.login_button} href={`/login`}>
            Login
          </Link>
          <ModeToggle />
        </li>
      </ul>
    </div>
  );
}
