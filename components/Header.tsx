"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Brand from "./Brand";
import { CallButton } from "./CallButton";
import { UserIcon } from "./Icons";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Our Work" },
  { href: "/#membership", label: "Membership" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

export default function Header({
  signedIn = false,
  showNav = true,
}: {
  signedIn?: boolean;
  /** Auth pages get a stripped-back bar — brand and phone only. */
  showNav?: boolean;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  // Drop a shadow under the header once the page has scrolled at all.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section is under the middle of the screen.
  useEffect(() => {
    if (!showNav || !("IntersectionObserver" in window)) return;

    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    if (!sections.length) return;

    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, [showNav]);

  // Escape closes the mobile panel; widening past the breakpoint resets it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 860) setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className={stuck ? "header is-stuck" : "header"}>
      <div className="wrap header__inner">
        <Brand priority />

        {showNav && (
          <nav
            className={navOpen ? "nav is-open" : "nav"}
            id="primaryNav"
            aria-label="Primary"
          >
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      activeId && link.href.endsWith(`#${activeId}`)
                        ? "is-active"
                        : undefined
                    }
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {/* Account links live in the panel on mobile, where the buttons hide. */}
              <li className="nav__auth-item">
                <Link href={signedIn ? "/account" : "/login"} onClick={() => setNavOpen(false)}>
                  {signedIn ? "My account" : "Sign in"}
                </Link>
              </li>
              {!signedIn && (
                <li className="nav__auth-item">
                  <Link href="/signup" onClick={() => setNavOpen(false)}>
                    Become a member
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}

        <div className="header__cta">
          <Link
            className="btn btn--outline"
            href={signedIn ? "/account" : "/login"}
          >
            <UserIcon />
            {signedIn ? "Account" : "Sign in"}
          </Link>
          <CallButton className="btn btn--primary" location="header">
            {site.phone}
          </CallButton>
        </div>

        {showNav && (
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="primaryNav"
            onClick={() => setNavOpen((open) => !open)}
          >
            <span />
            <span className="sr-only">Menu</span>
          </button>
        )}
      </div>
    </header>
  );
}
