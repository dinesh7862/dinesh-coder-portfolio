import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dinesh Coder — Full-Stack Developer & AI Engineer",
  description:
    "Dinesh Coder builds calm, fast web products — full-stack interfaces, AI integrations and automation that removes the boring parts of a business.",
  keywords: [
    "Dinesh Coder",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
  ],
  authors: [{ name: "Dinesh Coder" }],
  openGraph: {
    title: "Dinesh Coder — Full-Stack Developer & AI Engineer",
    description:
      "Full-stack interfaces, AI integrations and automation — built with care.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinesh Coder — Full-Stack Developer & AI Engineer",
    description:
      "Full-stack interfaces, AI integrations and automation — built with care.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
