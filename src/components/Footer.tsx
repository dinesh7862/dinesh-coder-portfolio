"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import Marquee from "./Marquee";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const ELSEWHERE = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Email", href: "mailto:dineshkumar65418@gmail.com" },
];

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      }).format(new Date());

    const first = window.setTimeout(() => setTime(format()), 0);
    const id = window.setInterval(() => setTime(format()), 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <span className="mono" style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
      {time} IST
    </span>
  );
}

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      {/* Big invitation marquee */}
      <a
        href="#contact"
        className="block py-10"
        style={{ textDecoration: "none", color: "inherit" }}
        aria-label="Go to contact section"
      >
        <Marquee speed={38}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center">
              <span
                className="display"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4.4rem)", paddingInline: 26 }}
              >
                Let&apos;s work <em>together</em>
              </span>
              <span style={{ color: "var(--accent)", fontSize: "1rem" }}>✦</span>
            </span>
          ))}
        </Marquee>
      </a>

      <div className="hairline" />

      <div className="container-x">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                className="display grid h-9 w-9 place-items-center"
                style={{ border: "1px solid var(--line-2)", borderRadius: 10, lineHeight: 1 }}
              >
                D
              </span>
              <span className="text-sm font-medium">
                Dinesh <span className="muted">Coder</span>
              </span>
            </div>
            <p
              className="mt-5 text-sm"
              style={{ color: "var(--muted)", maxWidth: "34ch", lineHeight: 1.75 }}
            >
              Full-stack developer and AI engineer building calm, fast products
              for the web.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h4
              className="mono"
              style={{
                fontSize: "0.64rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted-2)",
              }}
            >
              Navigate
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="link-u text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <h4
              className="mono"
              style={{
                fontSize: "0.64rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--muted-2)",
              }}
            >
              Elsewhere
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {ELSEWHERE.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="link-u text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div
          className="flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <span className="mono" style={{ fontSize: "0.7rem", color: "var(--muted-2)" }}>
            © {new Date().getFullYear()} Dinesh Coder
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <LocalTime />
            <span className="mono" style={{ fontSize: "0.7rem", color: "var(--muted-2)" }}>
              Built with Next.js · Framer Motion · Three.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
