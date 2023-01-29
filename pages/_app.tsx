import "../styles/globals.scss";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/ui/Layout/Layout";
import Head from "next/head";
import { GlobalContextProvider } from "../store/GlobalContext";
import localFont from "@next/font/local";
import AlertContextProvider from "../store/AlertContext";
import { SessionProvider } from "next-auth/react";
import { IKContext } from "imagekitio-react";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/ui/Loader/Loader";

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
  const publicKey = "public_+pZA5vBl6tmNYnxYgMer/JCMlQk=";
  const urlEndpoint = "https://ik.imagekit.io/avy76kxdy";
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      console.log("route change start");
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      console.log("route change complete");
      setLoading(false);
    });
  });
  return (
    <main className={myFont.className}>
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticationEndpoint={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/auth/imagekit-auth`}
      >
        <SessionProvider session={pageProps.session}>
          <GlobalContextProvider>
            <Layout>
              <AlertContextProvider>
                <>
                  {loading && <Loader />}
                  <Component {...pageProps} />
                </>
                {/* ...child components */}
              </AlertContextProvider>
            </Layout>
          </GlobalContextProvider>
        </SessionProvider>
      </IKContext>
    </main>
  );
}
