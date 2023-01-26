import React from "react";
import styles from "./CustomInput.module.scss";
import CustomButton from "../CustomButton/CustomButton";
import Image from "next/image";
import { IKUpload } from "imagekitio-react";
import { AlertContext } from "../../../store/AlertContext";
import { GlobalContext } from "../../../store/GlobalContext";
type Props = {
  label: string;
  type: string;
  value: any;
  changeHandler: (e: any) => void;
  name: string;
  error?: boolean;
  errorText?: string;
};

export default function CustomInput({
  label,
  type,
  value,
  changeHandler,
  name,
  error = false,
  errorText,
}: Props) {
  if (type === "file") {
    return (
      <CustomFileInput
        type="file"
        label={label}
        changeHandler={changeHandler}
        name={name}
        error={error}
        errorText={errorText}
        value={value}
      />
    );
  }
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.subContainer}>
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          name={name}
          style={{ border: error ? "1px solid red" : "" }}
        />
        {error && <p className={styles.error}>{errorText}</p>}
      </div>
    </div>
  );
}

const CustomFileInput = ({
  label,
  type,
  value,
  changeHandler,
  name,
  error = false,
  errorText,
}: Props) => {
  const { Message } = React.useContext(AlertContext);
  const { setLoading } = React.useContext(GlobalContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  let previewImage: string = value;
  if (previewImage === "") {
    previewImage = "/user/profile.jpg";
  }
  const onSuccess = (res: any) => {
    console.log(res);
    setLoading(false);
    changeHandler({ target: { name, value: res.url } });
    Message().success("image added");
  };
  const onError = (err: any) => {
    setLoading(false);
    console.log(err);
    Message().error("Error uploading image");
  };
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.subContainer}>
        <div className={styles.rowContainer}>
          {/* <input
            hidden
            type={type}
            onChange={changeHandler}
            name={name}
            ref={inputRef}
            style={{ border: error ? "1px solid red" : "" }}
          /> */}
          <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={onSuccess}
            style={{ display: "none" }}
            inputRef={inputRef}
            onUploadStart={() => {
              setLoading(true);
            }}
          />
          <Image src={previewImage} alt="image" height={45} width={45} />
          <CustomButton
            label="Upload Image"
            bg="var(--light-color-primary)"
            border="none"
            hoverbg="var(--dark-color-secondary)"
            textColor="white"
            hoverTextColor="white"
            type="filled"
            corner="6px"
            onClick={(e) => {
              e.preventDefault();
              if (inputRef.current) inputRef.current.click();
            }}
          />
        </div>
        {error && <p className={styles.error}>{errorText}</p>}
      </div>
    </div>
  );
};
