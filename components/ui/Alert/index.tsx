import React from "react";
import styles from "./Alert.module.scss";
import CustomButton from "./../CustomButton/CustomButton";
import closeButton from "../../../public/icons/icons8-close.svg";
import successIcon from "../../../public/icons/success-svgrepo-com.svg";
import errorIcon from "../../../public/icons/error-svgrepo-com.svg";
import warningIcon from "../../../public/icons/warning-svgrepo-com.svg";
import Image from "next/image";
export interface IAlertProps {
  id: string;
  message: string;
  autoClose: boolean;
  type: string;
  onClose: (id: string) => void;
}

function getBgColor(type: string) {
  switch (type) {
    case "success":
      return "#4BB543";
    case "error":
      return "#e46b71";
    case "warning":
      return "#ffcc00";
    case "info":
      return "lightblue";
    default:
      return "lightblue";
  }
}
function getIcon(type: string) {
  switch (type) {
    case "success":
      return successIcon;
    case "error":
      return errorIcon;
    case "warning":
      return warningIcon;
    default:
      return warningIcon;
  }
}
const Alert: React.FC<IAlertProps> = ({
  id,
  message,
  autoClose,
  type,
  onClose,
}) => {
  const bgcolor = getBgColor(type);
  console.log(bgcolor);
  return (
    <div className={styles.alert}>
      <div>
        <span>
          <Image src={getIcon(type)} height={30} width={30} alt="text" />
          <p style={{ marginLeft: "10px" }}>{message}</p>
        </span>
        {!autoClose && (
          <CustomButton
            type="filled"
            bg="transparent"
            hoverbg="transparent"
            boxShadow="0px 0px 0px 0px transparent"
            corner="100%"
            src={closeButton}
            onClick={() => {
              onClose(id);
            }}
          ></CustomButton>
        )}
      </div>
    </div>
  );
};

export default Alert;
