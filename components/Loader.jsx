"use client";

import { useEffect, useState } from "react";
import { markSiteReady } from "@/lib/siteReady";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    document.body.style.overflow = "hidden";

    const minTime = new Promise((resolve) => setTimeout(resolve, 650));
    const fontsReady =
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const windowLoaded = new Promise((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", resolve, { once: true });
    });

    Promise.all([minTime, fontsReady, windowLoaded]).then(() => {
      if (cancelled) return;
      setExiting(true);
      setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        document.body.style.overflow = "";
        // let ScrollTrigger re-measure now that everything is visible/unlocked
        window.dispatchEvent(new Event("resize"));
        // Source of truth for "is the page actually scrollable yet" —
        // MotionController waits on this before touching ScrollTrigger.
        markSiteReady();
      }, 500);
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={"site-loader" + (exiting ? " is-exiting" : "")} aria-hidden={exiting}>
      <img src="/logo.webp" alt="" className="site-loader-logo" />
      <div className="site-loader-bar">
        <div className="site-loader-fill"></div>
      </div>
    </div>
  );
}
