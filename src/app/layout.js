/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MovieBox | HNGx Stage 2",
  description: "Developed by Confidence Emonena Ochuko",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
