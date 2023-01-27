import React from "react";
import LogoBW from "../../../public/images/Blogger`s.png";
import LogoWB from "../../../public/images/Blogger`s (1).png";
import LogoWBtransparent from "../../../public/images/Blogger_s__1_-removebg-preview.png";
import LogoBWtransparent from "../../../public/images/Blogger_s-removebg-preview.png";
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
      style={{ objectFit: "cover" }}
      alt="logo"
      height={80}
      width={150}
    />
  );
}
