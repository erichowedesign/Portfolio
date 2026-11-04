"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

type Pending = { path: string; from: string; done: () => void };

function isProjectPath(pathname: string) {
  return pathname.startsWith("/work/") || pathname === "/nike" || pathname.startsWith("/nike/");
}

function isPortfolioStop(pathname: string) {
  return pathname.startsWith("/work/") || pathname === "/nike";
}

function projectMove(from: string, to: string, anchor: HTMLAnchorElement) {
  const label = anchor.getAttribute("aria-label") ?? "";
  const fromCase = from.startsWith("/nike/");
  const toCase = to.startsWith("/nike/");
  if (!isPortfolioStop(from) && !fromCase && isPortfolioStop(to)) return "enter";
  if (from === "/nike" && toCase) return "enter";
  if (to === "/" && label === "Back to work" && (isPortfolioStop(from) || fromCase)) return "exit";
  if (fromCase && to === "/nike" && label === "Nike") return "exit";
  if (label.startsWith("Next project")) return "forward";
  if (label.startsWith("Previous project")) return "back";
  return "fade";
}

function markOpeningThumbnail(anchor: HTMLAnchorElement) {
  const visible = [...anchor.querySelectorAll("img")].find(
    (img) => getComputedStyle(img).display !== "none",
  );
  if (!visible) return null;
  visible.style.viewTransitionName = "project-cover";
  return visible;
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef<Pending | null>(null);
  const busy = useRef(false);
  const marked = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const current = pending.current;
    if (!current || current.path !== pathname) return;
    if (document.documentElement.dataset.projectMove === "exit") {
      let anchor = document.querySelector(`a[href="${CSS.escape(current.from)}"]`);
      if (!(anchor instanceof HTMLAnchorElement) && current.from.startsWith("/nike/")) {
        anchor = document.querySelector('a[href="/nike"]');
      }
      if (anchor instanceof HTMLAnchorElement) marked.current = markOpeningThumbnail(anchor);
    }
    current.done();
    pending.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (busy.current) {
        event.preventDefault();
        return;
      }
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      if (!("startViewTransition" in document)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (!isProjectPath(window.location.pathname) && !isProjectPath(url.pathname)) return;

      event.preventDefault();
      const next = url.pathname + url.search + url.hash;
      const from = window.location.pathname;
      busy.current = true;
      const move = projectMove(from, url.pathname, anchor);
      document.documentElement.dataset.projectMove = move;
      const betweenLandingAndCase =
        (from === "/nike" && url.pathname.startsWith("/nike/")) ||
        (from.startsWith("/nike/") && url.pathname === "/nike");
      if (betweenLandingAndCase) document.documentElement.dataset.cover = "child";
      else delete document.documentElement.dataset.cover;
      marked.current = move === "enter" ? markOpeningThumbnail(anchor) : null;

      const transition = document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          const finish = () => {
            window.clearTimeout(timeout);
            resolve();
          };
          const timeout = window.setTimeout(finish, 2000);
          pending.current = { path: url.pathname, from, done: finish };
          router.push(next);
        });
      });

      transition.finished.finally(() => {
        busy.current = false;
        delete document.documentElement.dataset.projectMove;
        delete document.documentElement.dataset.cover;
        if (marked.current) {
          marked.current.style.viewTransitionName = "";
          marked.current = null;
        }
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
