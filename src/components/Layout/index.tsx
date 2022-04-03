import { LayoutProps } from "@/data-types";
import Head from "next/head";
import Script from "next/script";
import { PUBLIC_URL } from "@/components/Utils";

export default function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="title" content="Relived Community" />
        <meta
          name="description"
          content="Relived Roleplay adalah server dari GTA San Andreas Multiplayer yang didedikasikan untuk seluruh player SA:MP, server ini bermode Roleplay."
        />
        <meta
          name="keywords"
          content="relived community, rrp, relived roleplay, relived rp, samp relived roleplay, relived roleplay samp, relived community samp, rrp gta samp, gta samp rrp"
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Relived Roleplay adalah server dari GTA San Andreas Multiplayer yang didedikasikan untuk seluruh player SA:MP, server ini bermode Roleplay."
        />
        <meta property="og:image" content={`${PUBLIC_URL}/banner.jpg`} />
        <meta property="og:url" content={`${PUBLIC_URL}`} />
        <meta name="author" content="Lukman" />

        <link
          rel="shortcut icon"
          href={`${PUBLIC_URL}/logo.png`}
          type="image/x-icon"
        />
        <link rel="icon" href={`${PUBLIC_URL}/logo.png`} type="image/x-icon" />
      </Head>
      {children}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
        crossOrigin="anonymous"
      />
    </>
  );
}
