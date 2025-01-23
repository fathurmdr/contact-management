import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import AntdProvider from "@/client/providers/AntdProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Contact Management App";
const description = "Created by Fathu Rahman using Next.js and Ant Design";

export const metadata: Metadata = {
  title: "Contact Management App",
  description: "Created by Fathu Rahman using Next.js and Ant Design",
  authors: {
    name: "Fathu Rahman",
  },
  publisher: "FR Projects",
  keywords: "FR Blog, Blog, Next JS",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: "FR Blog",
    title: title,
    description: description,
    images: "https://contact.frprojects.site/logo.png",
    url: "https://contact.frprojects.site/",
  },
  twitter: {
    title: title,
    description: description,
    images: "https://contact.frprojects.site/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex justify-center antialiased`}
      >
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
