import clsx from "clsx";
import { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { GlobalContext } from "../../store/GlobalContext";
import styles from "./Viewer.module.scss";
export interface ViewerProps {
  value: string;
}

export default function Viewer(props: ViewerProps) {
  useEffect(() => {
    const copyButtonLabel = "Copy Code";

    // use a class selector if available
    let blocks = document.querySelectorAll("pre");

    blocks.forEach((block) => {
      // only add button if browser supports Clipboard API
      if (navigator.clipboard) {
        let button = document.createElement("button");

        button.innerText = copyButtonLabel;
        block.appendChild(button);

        button.addEventListener("click", async () => {
          await copyCode(block, button);
        });
      }
    });

    async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
      let code: HTMLElement | null = block.querySelector("code");
      let text = code?.innerText;
      if (text) await navigator.clipboard.writeText(text);

      // visual feedback that task is completed
      button.innerText = "Code Copied";

      setTimeout(() => {
        button.innerText = copyButtonLabel;
      }, 700);
    }
  }, []);
  const { darkMode } = useContext(GlobalContext);
  const withEndLine = props.value.replace(/\n/g, "\n\n ");
  return (
    <div
      className={
        darkMode ? clsx(styles.container, styles.dark) : styles.container
      }
    >
      <ReactMarkdown className={styles.viewer}>{withEndLine}</ReactMarkdown>
    </div>
  );
}
