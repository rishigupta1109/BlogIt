import "../styles/globals.scss";
import "../styles/global.css";
import type { AppProps } from "next/app";
import Layout from "../components/ui/Layout/Layout";
import Head from "next/head";
import { GlobalContextProvider } from "../store/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}
