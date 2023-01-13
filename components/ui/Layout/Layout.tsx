import React, { useContext } from "react";
import styles from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar";
import { clsx } from "clsx";
import { GlobalContext } from "../../../store/GlobalContext";
type Props = {
  children?: React.ReactElement;
};

function Layout({ children }: Props) {
  const { darkMode, mobileView, showMobileMenu } = useContext(GlobalContext);
  return (
    <div
      className={darkMode ? clsx(styles.dark, styles.layout) : styles.layout}
    >
      <Navbar />
      {!showMobileMenu && children}
    </div>
  );
}
export default Layout;
