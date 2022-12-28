import { createContext, useState } from "react";

export const GlobalContext = createContext({
  darkMode: false,
  setDarkMode: (value: boolean) => {},
});

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </GlobalContext.Provider>
  );
}
