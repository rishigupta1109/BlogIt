import React, { useContext } from "react";
import styles from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar";
import { clsx } from "clsx";
import { GlobalContext } from "../../../store/GlobalContext";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
type Props = {
  children?: React.ReactElement;
};

function Layout({ children }: Props) {
  const { darkMode, mobileView, showMobileMenu, loading } =
    useContext(GlobalContext);
  return (
    <div
      className={darkMode ? clsx(styles.dark, styles.layout) : styles.layout}
    >
      <Navbar />
      {loading && <Loader />}
      {!showMobileMenu && children}
      {!showMobileMenu && <Footer />}
    </div>
  );
}
export default Layout;
