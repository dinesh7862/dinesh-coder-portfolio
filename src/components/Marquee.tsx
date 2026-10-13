"use client";

import type { CSSProperties, ReactNode } from "react";

export default function Marquee({
  children,
  speed = 44,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${speed}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
