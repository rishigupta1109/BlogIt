import React, { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import CustomButton from "../ui/CustomButton/CustomButton";
import { createPortal } from "react-dom";
type Props = {
  text: string;
  onYes: (e: any) => void;
  onNo: (e: any) => void;
  show: boolean;
};

export default function Modal({ text, onYes, onNo, show }: Props) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);
  return mounted && ref.current
    ? createPortal(
        <div
          className={styles.modal}
          style={{
            left: show ? "50%" : "-50%",
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
        </div>,
        ref.current
      )
    : null;
}
