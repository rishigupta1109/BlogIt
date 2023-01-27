import React from "react";
import styles from "./Modal.module.scss";
import CustomButton from "../ui/CustomButton/CustomButton";
type Props = {
  text: string;
  onYes: (e: any) => void;
  onNo: (e: any) => void;
  show: boolean;
};

export default function Modal({ text, onYes, onNo, show }: Props) {
  return (
    <div
      className={styles.modal}
      style={{
        left: show ? "40vw" : "-100%",
        opacity: show ? 1 : 0,
      }}
    >
      {text}
      <div>
        <CustomButton
          textColor="white"
          bg="var(--dark-color-primary)"
          hoverbg="var(--dark-color-secondary)"
          hoverTextColor="white"
          type="filled"
          onClick={(e) => {
            onYes(e);
          }}
          label="Yes"
          corner="6px"
          border="0"
        />
        <CustomButton
          border="0"
          textColor="var(--dark-color-primary)"
          bg="white"
          hoverbg="var(--dark-color-primary)"
          hoverTextColor="white"
          type="outlined"
          onClick={(e) => {
            onNo(e);
          }}
          label="No"
          corner="6px"
        />
      </div>
    </div>
  );
}
