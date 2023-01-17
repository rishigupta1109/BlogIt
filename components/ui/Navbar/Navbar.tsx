import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../../store/GlobalContext";
import CustomButton from "../CustomButton/CustomButton";
import Logo from "../logo/Logo";
import ModeToggle from "../ModeToggleButton/ModeToggle";
import UserDropDown from "../UserDropDown/UserDropDown";
import styles from "./Navbar.module.scss";
type Props = {};

export default function Navbar({}: Props) {
  let { darkMode, mobileView, setMobileView } = useContext(GlobalContext);
  let classname = styles.navbar;
  if (darkMode) classname = clsx(styles.navbar, styles.dark);
  const { pathname } = useRouter();
  useEffect(() => {
    window.onresize = (ev: any) => {
      const { outerWidth } = ev?.currentTarget;
      if (outerWidth < 900 && !mobileView) {
        console.log("called");
        setMobileView(true);
      }
      if (outerWidth > 900 && mobileView) setMobileView(false);
    };
  }, [setMobileView, mobileView]);
  useEffect(() => {
    if (window.outerWidth < 900 && !mobileView) {
      setMobileView(true);
    }
    if (window.outerWidth > 900 && mobileView) {
      setMobileView(false);
    }
  });
  return (
    <div className={classname}>
      {!mobileView && <NavLinks darkMode={darkMode} pathname={pathname} />}
      {mobileView && <MobileNavLinks darkMode={darkMode} pathname={pathname} />}
    </div>
  );
}

interface INavLinks {
  darkMode: boolean;
  pathname: string;
}
function NavLinks({ darkMode, pathname }: INavLinks) {
  return (
    <ul>
      <li>
        <Link href={`/`}>
          <Logo transparent={true} black={!darkMode} />
        </Link>
      </li>
      <li>
        <Link
          href={`/blogs`}
          className={pathname === "/blogs" ? styles.active : ""}
        >
          Blogs
        </Link>
      </li>

      <li>
        <Link
          className={pathname === "/createblog" ? styles.active : ""}
          href={`/createblog`}
        >
          Create Blog
        </Link>
      </li>
      <li>
        <CustomButton
          hoverbg={
            darkMode
              ? "var(--dark-color-secondary)"
              : "var(--dark-color-secondary)"
          }
          type="filled"
          bg={
            darkMode
              ? "var(--dark-color-ternary)"
              : "var(--light-color-primary)"
          }
          textColor="white"
          corner="6px"
          label="Sign in"
          link={`/login`}
        />
        <UserDropDown />
        <ModeToggle />
      </li>
    </ul>
  );
}
interface IMobileNavLinks {
  darkMode: boolean;
  pathname: string;
}
function MobileNavLinks({ darkMode, pathname }: IMobileNavLinks) {
  const { showMobileMenu, setShowMobileMenu } = useContext(GlobalContext);
  let Line1 = useRef<HTMLDivElement>(null);
  let Line2 = useRef<HTMLDivElement>(null);
  let Line3 = useRef<HTMLDivElement>(null);
  const menuHandler = () => {
    if (!showMobileMenu) {
      setShowMobileMenu(true);
      if (Line3.current)
        Line3.current.style.transform = ` rotate(
        45deg) translate(-12px, -11px)`;
      if (Line1.current)
        Line1.current.style.transform = ` rotate( 
          135deg) translate(13px, -11px)`;
      if (Line2.current)
        Line2.current.style.transform = ` translate(-55px, 0px)`;
    } else {
      setShowMobileMenu(false);
      if (Line3.current)
        Line3.current.style.transform = ` rotate(
            0deg) translate(0px, 0px)`;
      if (Line1.current)
        Line1.current.style.transform = ` rotate( 
              0deg) translate(0px, 0px)`;
      if (Line2.current) Line2.current.style.transform = ` translate(0px, 0px)`;
    }
  };
  return (
    <>
      <div
        className={
          darkMode
            ? clsx(styles.linkContainer, styles.dark)
            : styles.linkContainer
        }
      >
        <Link href={`/`}>
          <Logo transparent={true} black={!darkMode} />
        </Link>
        <div onClick={menuHandler} className={styles.menubtnbox}>
          <div className={styles.line1} ref={Line1}></div>
          <div className={styles.line2} ref={Line2}></div>
          <div className={styles.line3} ref={Line3}></div>
        </div>
      </div>

      {showMobileMenu && (
        <ul>
          {" "}
          <li>
            <Link
              onClick={menuHandler}
              href={`/blogs`}
              className={pathname === "/blogs" ? styles.active : ""}
            >
              Blogs
            </Link>
          </li>
          <li>
            <Link
              onClick={menuHandler}
              href={`/myblogs`}
              className={pathname === "/myblogs" ? styles.active : ""}
            >
              My Blogs!
            </Link>
          </li>
          <li>
            <Link
              onClick={menuHandler}
              href={`/profile`}
              className={pathname === "/profile" ? styles.active : ""}
            >
              My Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={menuHandler}
              className={pathname === "/createblog" ? styles.active : ""}
              href={`/createblog`}
            >
              Create Blog
            </Link>
          </li>
          <li>
            <CustomButton
              onClick={menuHandler}
              hoverbg={
                darkMode
                  ? "var(--dark-color-secondary)"
                  : "var(--dark-color-secondary)"
              }
              type="filled"
              bg={
                darkMode
                  ? "var(--dark-color-ternary)"
                  : "var(--light-color-primary)"
              }
              textColor="white"
              corner="6px"
              label="Sign in"
              link={`/login`}
            />
          </li>
          <li>
            <CustomButton
              onClick={menuHandler}
              hoverbg={
                darkMode
                  ? "var(--dark-color-secondary)"
                  : "var(--dark-color-secondary)"
              }
              type="filled"
              bg={
                darkMode
                  ? "var(--dark-color-ternary)"
                  : "var(--light-color-primary)"
              }
              textColor="white"
              corner="6px"
              border="none"
              label="Logout"
            />
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      )}
    </>
  );
}
