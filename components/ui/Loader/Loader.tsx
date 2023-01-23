import Image from "next/image";
import React, { useEffect } from "react";
import loadingGif from "../../../public/images/loading.gif";
type Props = {};
import styles from "./Loader.module.scss";
export default function Loader({}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className={styles.container}>
      <Image src={loadingGif} height={250} width={250} alt="loading..." />
    </div>
  );
}
