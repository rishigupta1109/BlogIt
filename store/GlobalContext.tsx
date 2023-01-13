import { createContext, useState } from "react";

export const GlobalContext = createContext({
  darkMode: false,
  setDarkMode: (value: boolean) => {},
  mobileView: false,
  setMobileView: (value: boolean) => {},
  showMobileMenu: false,
  setShowMobileMenu: (value: boolean) => {},
});

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        darkMode,
        setDarkMode,
        mobileView,
        setMobileView,
        showMobileMenu,
        setShowMobileMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
