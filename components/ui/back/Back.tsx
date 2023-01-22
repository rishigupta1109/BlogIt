import Image from "next/image";
import React from "react";
import backIcon from "../../../public/images/back.svg";
import style from "./Back.module.scss";
import { useRouter } from "next/router";
type Props = {};

export default function Back({}: Props) {
  const router = useRouter();
  const clickHandler = () => {
    router.back();
  };
  return (
    <div className={style.container}>
      <Image
        onClick={clickHandler}
        src={backIcon}
        alt="back"
        height={35}
        width={35}
      />
    </div>
  );
}
