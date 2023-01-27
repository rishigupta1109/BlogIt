import React from "react";
import Head from "next/head";

type Props = {
  title: string;
  keywords?: string;
  author?: string;
  description: string;
  image: any;
};

export default function CustomHead({
  title,
  keywords,
  author = "RISHI GUPTA",
  description,
  image,
}: Props) {
  return (
    <Head>
      <link
        href="favicon-light.png"
        rel="icon"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="favicon-dark.png"
        rel="icon"
        media="(prefers-color-scheme: dark)"
      />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords}></meta>
      <meta name="author" content={author}></meta>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
