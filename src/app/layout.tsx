import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dinesh Coder | Full Stack Developer & AI Engineer",
  description:
    "Award-winning portfolio of Dinesh Coder — Full Stack Developer, AI Engineer, and Creative Problem Solver building futuristic digital experiences.",
  keywords: [
    "Dinesh Coder",
    "Full Stack Developer",
    "AI Developer",
    "Web Designer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Dinesh Coder | Full Stack Developer & AI Engineer",
    description:
      "Futuristic developer portfolio — AI solutions, web design, and smart applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
