import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import { markdownToHtml, htmlToMarkdown } from "../../utils/Parser";
import dynamic from "next/dynamic";
import styles from "./BlogForm.module.scss";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "blockquote", "link"],
  ["code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(
    props.value ? markdownToHtml(props.value) : ""
  );

  const onChange = (content: string) => {
    setValue(content);

    if (props.onChange) {
      try {
        const md = htmlToMarkdown(content);
        console.log(md);
        props.onChange({
          html: content,
          markdown: md,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <QuillNoSSRWrapper
      className={styles.editor}
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
}
