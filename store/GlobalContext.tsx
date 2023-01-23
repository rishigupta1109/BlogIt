import { createContext, useEffect, useState } from "react";
import { IUser } from "../utils/interfaces";
import { getSession } from "next-auth/react";
import { getUserData } from "../utils/services";

export const GlobalContext = createContext({
  darkMode: false,
  setDarkMode: (value: boolean) => {},
  mobileView: false,
  setMobileView: (value: boolean) => {},
  showMobileMenu: false,
  setShowMobileMenu: (value: boolean) => {},
  loading: false,
  setLoading: (value: boolean) => {},
  user: {} as IUser | undefined,
  setUser: (value: IUser) => {},
});

export function GlobalContextProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      if (session?.user?.name) {
        try {
          const res = await getUserData(session?.user?.name);
          setUser(res.user);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    };
    if (session) {
      getData();
    }
  }, [session]);
  useEffect(() => {
    getSession()
      .then((session) => setSession(session))
      .catch((err) => console.log(err));
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        darkMode,
        setDarkMode,
        mobileView,
        setMobileView,
        showMobileMenu,
        setShowMobileMenu,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
