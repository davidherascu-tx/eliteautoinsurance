"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale";

/**
 * Fades content in as it scrolls into view.
 *
 * The hidden state lives in CSS behind `@media (scripting: enabled)`, so with
 * JavaScript off nothing is ever hidden and the page reads normally. JS then
 * flips `data-visible` — written straight to the DOM rather than through React
 * state, since it is a one-way handoff to CSS and costs no re-render.
 *
 * Content must never get stuck invisible, so there are two safety nets:
 * anything already on screen at mount is shown without waiting for the
 * observer, and if the observer never reports at all (some embedded or
 * non-compositing browser views never deliver callbacks) everything is
 * revealed anyway.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  variant?: RevealVariant;
  /** Stagger in milliseconds. */
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-visible", "true");

    // Already in view when the page loads — no reason to wait.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      show();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    let reported = false;
    const observer = new IntersectionObserver(
      (entries) => {
        reported = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);

    // An observer always reports once on observe. If it never does, it is not
    // working here — show the content rather than leave a blank page.
    const failsafe = window.setTimeout(() => {
      if (!reported) show();
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
