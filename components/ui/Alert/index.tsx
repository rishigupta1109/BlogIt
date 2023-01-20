import React from "react";
import styles from "./Alert.module.scss";
import CustomButton from "./../CustomButton/CustomButton";
import closeButton from "../../../public/icons/icons8-close.svg";
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
    <div className={styles.alert} style={{ backgroundColor: bgcolor }}>
      <div>
        <p>{message}</p>
        {!autoClose && (
          <CustomButton
            type="filled"
            bg="transparent"
            hoverbg="transparent"
            boxShadow="0px 0px 0px 0px transparent"
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
