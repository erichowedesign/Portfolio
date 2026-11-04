"use client";

import { useEffect, useState } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function setDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) setDark(e.matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const dark = !document.documentElement.classList.contains("dark");
    setDark(dark);
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="-m-1.5 rounded-md p-1.5 text-text-sub-600 transition hover:text-text-strong-950"
    >
      <ThemeIcon />
    </button>
  );
}

/** 38px circle, matching the other controls in the contact row. */
const revealLabel =
  "max-w-0 overflow-hidden whitespace-nowrap text-[12px] font-normal leading-[24px] opacity-0 transition-[max-width,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:ml-2.5 group-hover:max-w-[8rem] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[8rem] group-focus-visible:opacity-100";

export function ThemeCircle() {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    setDarkState(document.documentElement.classList.contains("dark"));
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        setDark(e.matches);
        setDarkState(e.matches);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    setDark(next);
    setDarkState(next);
    localStorage.setItem(THEME_STORAGE_KEY, next ? "dark" : "light");
  }

  const label = dark ? "Light Mode" : "Dark Mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${label}`}
      className="btn-glow group inline-flex h-[38px] items-center justify-center rounded-[25px] border border-current px-[10px] text-gray-600 hover:px-[17px] focus-visible:px-[17px] dark:text-gray-300"
    >
      <ThemeIcon />
      <span className={revealLabel}>{label}</span>
    </button>
  );
}

function ThemeIcon() {
  return (
    <>
      <svg className="size-4 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="hidden size-4 dark:block" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path
          d="M8.99506 13C10.0553 13 11.072 12.5786 11.8217 11.8284C12.5714 11.0783 12.9926 10.0609 12.9926 9C12.9926 7.93913 12.5714 6.92172 11.8217 6.17157C11.072 5.42143 10.0553 5 8.99506 5C7.93486 5 6.91808 5.42143 6.1684 6.17157C5.41872 6.92172 4.99756 7.93913 4.99756 9C4.99756 10.0609 5.41872 11.0783 6.1684 11.8284C6.91808 12.5786 7.93486 13 8.99506 13Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.99512 1H9.0051" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.99 9H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.99512 17H9.0051" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 9H1.00998" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.6484 3.34297H14.6584" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.6484 14.657H14.6584" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.34155 14.657H3.35154" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.34155 3.34297H3.35154" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
