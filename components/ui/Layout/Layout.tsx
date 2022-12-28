import React from "react";
import styles from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar";
import { clsx } from "clsx";
type Props = {
  children?: React.ReactElement;
};

function Layout({ children }: Props) {
  return (
    <div className={clsx(styles.column, styles.layout)}>
      <Navbar />
      {children}
    </div>
  );
}
export default Layout;
