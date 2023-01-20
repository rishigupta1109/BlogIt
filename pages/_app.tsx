import "../styles/globals.scss";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/ui/Layout/Layout";
import Head from "next/head";
import { GlobalContextProvider } from "../store/GlobalContext";
import localFont from "@next/font/local";
import AlertContextProvider from "../store/AlertContext";
import { SessionProvider } from "next-auth/react";

// Font files can be colocated inside of `pages`
const myFont = localFont({
  src: [
    {
      path: "../public/fonts/static/Rubik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Rubik-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/static/Rubik-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/static/Rubik-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <SessionProvider session={pageProps.session}>
        <GlobalContextProvider>
          <Layout>
            <AlertContextProvider>
              <Component {...pageProps} />
            </AlertContextProvider>
          </Layout>
        </GlobalContextProvider>
      </SessionProvider>
    </main>
  );
}
