import clsx from "clsx";
import React, {
  ButtonHTMLAttributes,
  useContext,
  useRef,
  useState,
} from "react";
import { GlobalContext } from "../../store/GlobalContext";
import { IBlog } from "../../utils/interfaces";
import CustomButton from "../ui/CustomButton/CustomButton";
import styles from "./BlogForm.module.scss";
import Editor, { EditorContentChanged } from "./Editor";
import { AlertContext } from "../../store/AlertContext";
type Props = {
  setFormData: React.Dispatch<IBlog>;
  formData: IBlog;
  onSubmit: (e: any) => void;
};

export default function BlogForm({ setFormData, formData, onSubmit }: Props) {
  const { darkMode } = useContext(GlobalContext);
  const { Message } = useContext(AlertContext);
  const onEditorContentChanged = (content: EditorContentChanged) => {
    setFormData({ ...formData, body: content.markdown });
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  console.log({ body: formData?.body });
  return (
    <form
      className={!darkMode ? styles.form : clsx(styles.form, styles.dark)}
      onSubmit={onSubmit}
    >
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          name="image"
          type={"file"}
          accept="image/*"
          className={styles.fileInput}
          onChange={({ target }) => {
            if (target.files) {
              let file = target.files[0];
              setSelectedFile(file);
              setFormData({ ...formData, image: file });
              Message().success("Cover image added");
            }
          }}
        />
        <CustomButton
          type="outlined"
          border="none"
          corner="6px"
          textColor="black"
          hoverbg="var(--dark-color-ternary)"
          label={selectedFile ? "Change cover photo" : "Add a cover photo"}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.click();
          }}
        />
        <input
          type={"text"}
          placeholder="Title..."
          value={formData?.title}
          onChange={changeHandler}
          name="title"
          className={styles.headingInput}
          required={true}
        />
        <input
          type={"text"}
          value={formData?.tags}
          onChange={changeHandler}
          name="tags"
          placeholder="Comma seperated tags"
          className={styles.tagsInput}
        />
        <Editor value={formData.body} onChange={onEditorContentChanged} />
      </div>
      <div className={styles.actionButtons}>
        <CustomButton
          type="filled"
          corner="6px"
          label="Publish"
          bg="var(--light-color-primary)"
          border="0"
          hoverbg="var(--dark-color-ternary)"
          textColor="white"
        />
        <CustomButton
          type="outlined"
          corner="6px"
          border="1px solid var(--dark-color-primary)"
          label="Save as Draft"
          hoverbg="var(--dark-color-ternary)"
          bg="white"
          textColor="black"
          hoverTextColor="white"
        />
      </div>
    </form>
  );
}
