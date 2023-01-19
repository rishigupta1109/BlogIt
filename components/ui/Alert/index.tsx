import React from "react";
import styles from "./Alert.module.scss";
import CustomButton from "./../CustomButton/CustomButton";

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
      return "lightgreen";
    case "error":
      return "#e46b71";
    case "warning":
      return "lightyellow";
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
        <p>{type}</p>
        {!autoClose && (
          <CustomButton
            label="Close"
            onClick={() => {
              onClose(id);
            }}
          ></CustomButton>
        )}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
