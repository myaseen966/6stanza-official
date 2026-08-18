"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#six-s", label: "Six S" },
  { href: "#about", label: "About" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#process", label: "Process" },
  { href: "#vision", label: "Vision" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav id="mainNav">
      <Link href="/" className="brand" aria-label="6STANZA — Home" onClick={() => setOpen(false)}>
        <img className="brand-logo" src="/logo.webp" alt="6STANZA logo" />
        6STANZA
      </Link>

      <div className="nav-links">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>

      <a className="nav-cta" href="#start-project">
        Start a Project
      </a>

      <button
        type="button"
        className={"nav-toggle" + (open ? " is-open" : "")}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobileNavMenu"
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div id="mobileNavMenu" className={"mobile-nav" + (open ? " is-open" : "")}>
        <div className="mobile-nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="nav-cta mobile-nav-cta" href="#start-project" onClick={() => setOpen(false)}>
          Start a Project
        </a>
      </div>
    </nav>
  );
}
