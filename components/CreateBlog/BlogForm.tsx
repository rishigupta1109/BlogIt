import clsx from "clsx";
import React, { ButtonHTMLAttributes, useContext, useState } from "react";
import { GlobalContext } from "../../store/GlobalContext";
import { IBlog } from "../../utils/interfaces";
import CustomButton from "../ui/CustomButton/CustomButton";
import styles from "./BlogForm.module.scss";
import Editor, { EditorContentChanged } from "./Editor";
type Props = {
  setFormData: React.Dispatch<IBlog>;
  formData: IBlog;
};

export default function BlogForm({ setFormData, formData }: Props) {
  const { darkMode } = useContext(GlobalContext);
  const onEditorContentChanged = (content: EditorContentChanged) => {
    setFormData({ ...formData, body: content.markdown });
  };
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={!darkMode ? styles.form : clsx(styles.form, styles.dark)}>
      <div className={styles.inputContainer}>
        <input name="image" type={"file"} className={styles.fileInput} />
        <CustomButton
          type="outlined"
          border="none"
          corner="6px"
          textColor="black"
          hoverbg="var(--dark-color-ternary)"
          label="Add a cover image"
        />
        <input
          type={"text"}
          placeholder="Title..."
          value={formData?.title}
          onChange={changeHandler}
          name="title"
          className={styles.headingInput}
        />
        <input
          type={"text"}
          value={formData?.tags}
          onChange={changeHandler}
          name="tags"
          placeholder="Comma seperated tags"
          className={styles.tagsInput}
        />
        <Editor value={formData?.body} onChange={onEditorContentChanged} />
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
