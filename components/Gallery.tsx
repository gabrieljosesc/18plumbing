"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery, site } from "@/lib/site";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const isOpen = openIndex !== null;

  const open = (index: number) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) =>
      current === null ? current : (current + delta + gallery.length) % gallery.length,
    );
  }, []);

  // Lock the page behind the lightbox and move focus onto the close button.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : gallery[openIndex];

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head section-head--center reveal">
          <span className="eyebrow">Our Work</span>
          <h2>Recent jobs</h2>
          <p>
            A sample of finished work from around Toronto. More on{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>{" "}
            and{" "}
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            .
          </p>
        </div>

        <div className="gallery">
          {gallery.map((photo, index) => (
            <button
              className="gallery__item reveal"
              type="button"
              key={photo.src}
              onClick={() => open(index)}
              aria-label={`View larger: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 720px) 100vw, (max-width: 1160px) 33vw, 280px"
              />
              <figcaption>{photo.label}</figcaption>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="lightbox is-open"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={(e) => {
            // Only the backdrop itself dismisses — not the photo or the buttons.
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            className="lightbox__close"
            type="button"
            aria-label="Close"
            ref={closeRef}
            onClick={close}
          >
            <CloseIcon />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            aria-label="Previous photo"
            onClick={() => step(-1)}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            aria-label="Next photo"
            onClick={() => step(1)}
          >
            <ChevronRightIcon />
          </button>
          <figure>
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              sizes="(max-width: 920px) 100vw, 920px"
            />
            <figcaption>{active.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
