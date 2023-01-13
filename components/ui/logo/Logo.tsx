import React from "react";
import LogoBW from "../../../public/images/logoBonW.png";
import LogoWB from "../../../public/images/logowonblock.png";
import LogoWBtransparent from "../../../public/images/logowonblock-removebg.png";
import LogoBWtransparent from "../../../public/images/logoBonW-removebg.png";
import Image from "next/image";
type Props = {
  black?: boolean;
  transparent?: boolean;
};

export default function Logo({ black, transparent }: Props) {
  let source = LogoBW;
  if (black) {
    if (transparent) source = LogoBWtransparent;
    else source = LogoBW;
  } else {
    if (transparent) source = LogoWBtransparent;
    else source = LogoWB;
  }
  return (
    <Image
      src={source}
      style={{ objectFit: "contain" }}
      alt="logo"
      height={60}
      width={150}
    />
  );
}
