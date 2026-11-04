"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

type Pending = { path: string; done: () => void };

function isProjectPath(pathname: string) {
  return pathname.startsWith("/work/") || pathname === "/nike" || pathname.startsWith("/nike/");
}

function projectMove(anchor: HTMLAnchorElement) {
  const label = anchor.getAttribute("aria-label") ?? "";
  if (label.startsWith("Next project")) return "forward";
  if (label.startsWith("Previous project")) return "back";
  return "fade";
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const pending = useRef<Pending | null>(null);
  const busy = useRef(false);

  useLayoutEffect(() => {
    const current = pending.current;
    if (!current || current.path !== pathname) return;
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
      busy.current = true;
      document.documentElement.dataset.projectMove = projectMove(anchor);

      const transition = document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          const finish = () => {
            window.clearTimeout(timeout);
            resolve();
          };
          const timeout = window.setTimeout(finish, 2000);
          pending.current = { path: url.pathname, done: finish };
          router.push(next);
        });
      });

      transition.finished.finally(() => {
        busy.current = false;
        delete document.documentElement.dataset.projectMove;
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
