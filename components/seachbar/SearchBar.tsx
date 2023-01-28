import React, { useContext } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";
import searchIconBlack from "../../public/icons/search-black.svg";
import searchIconWhite from "../../public/icons/search-white.svg";
import { GlobalContext } from "../../store/GlobalContext";
import { useRouter } from "next/router";
type Props = {};
export default function SearchBar({}: Props) {
  const { darkMode } = useContext(GlobalContext);

  const [pattern, setPattern] = React.useState("");
  const router = useRouter();
  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/blogs/search/${pattern}`);
        }}
      >
        <input
          type="text"
          list="blogs"
          placeholder="Search"
          required={true}
          onChange={(e) => {
            setPattern(e.target.value);
          }}
        />
        {/* <datalist id="blogs">
        <option value="Chrome" />
        <option value="Firefox" />
        <option value="Internet Explorer" />
        <option value="Opera" />
        <option value="Safari" />
        <option value="Microsoft Edge" />
      </datalist> */}
        <button
          type="submit"
          style={{
            background: darkMode
              ? "var(--dark-color-primary)"
              : "var(--light-color-ternary)",
          }}
        >
          <Image
            src={darkMode ? searchIconWhite : searchIconBlack}
            height={25}
            width={25}
            alt="search"
          />
        </button>
      </form>
    </div>
  );
}
