import React from "react";
import styles from "./Tags.module.scss";
type Props = {
  tags: Array<string>;
};

export default function Tags({ tags }: Props) {
  let colors = [
    "#9400D3",
    "	#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
    "#FF0000",
  ];
  return (
    <div className={styles.container}>
      {tags.map((tag, index) => {
        if (tag.trim().length === 0) return null;
        return (
          <span
            key={index}
            className={styles.tag}
            style={{ color: "white", backgroundColor: colors[index % 7] }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
