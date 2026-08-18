"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function MotionController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const nav = document.getElementById("mainNav");

      // Smooth, correctly-offset scrolling for every in-page nav link (Six S,
      // About, Capabilities, Process, Vision, Start a Project). Using GSAP's
      // own scrollTo — rather than the browser's default anchor jump — keeps
      // this smooth and accurate even though several sections are pinned,
      // which changes the page's real layout height as you scroll.
      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        const handler = (e) => {
          const id = link.getAttribute("href");
          if (!id || id.length < 2) return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          if (reduceMotion) {
            target.scrollIntoView({ block: "start" });
            return;
          }
          gsap.to(window, {
            duration: 1.1,
            scrollTo: { y: target, offsetY: 84 },
            ease: "power2.inOut",
          });
        };
        link.addEventListener("click", handler);
      });

      ScrollTrigger.create({
        start: 40,
        onUpdate: (self) => nav && nav.classList.toggle("scrolled", self.scroll() > 40),
      });

      if (reduceMotion) {
        document.querySelectorAll(".reveal").forEach((el) => (el.style.opacity = 1));
        return;
      }

      ScrollTrigger.normalizeScroll(true);

      // HERO cinematic exit
      gsap
        .timeline({
          scrollTrigger: { trigger: "#heroPin", start: "top top", end: "+=100%", scrub: 0.6, pin: true },
        })
        .to("#heroLogo", { scale: 1.15, opacity: 0, x: -30, ease: "power1.in" }, 0)
        .to("#heroTitle", { opacity: 0, y: -30, ease: "power1.in" }, 0.02)
        .to("#heroTag", { opacity: 0, y: -20, ease: "power1.in" }, 0.06)
        .to("#heroSub", { opacity: 0, y: -20, ease: "power1.in" }, 0.1)
        .to("#heroCtas", { opacity: 0, y: -20, ease: "power1.in" }, 0.12)
        .to("#scrollCue", { opacity: 0, ease: "power1.in" }, 0)
        .to(".hero-grid", { opacity: 0 }, 0.1)
        .to("#heroInner", { scale: 0.94, ease: "power1.in" }, 0);

      // generic reveals
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          }
        );
      });

      // SIX S filmstrip — pinned/scrubbed horizontal track on desktop; a
      // plain vertical stack with a simple fade-in on mobile (see the
      // matching .six-panel rules under @media (max-width:900px) in
      // globals.css). This used to be a single `window.innerWidth` check
      // read once on page load — which is exactly the kind of thing that
      // goes stale (DevTools device-mode resize without a reload, rotating
      // the phone, etc.) and leaves the OLD mode's ScrollTrigger still
      // active: e.g. the desktop pin's much larger scroll distance staying
      // reserved underneath the mobile layout, which reads as "the cards
      // fly by, then there's a big dead scroll for no reason." gsap.matchMedia
      // re-evaluates on every resize and fully tears down the inactive
      // mode's ScrollTriggers, so that can't happen.
      const track = document.getElementById("sixTrack");
      if (track) {
        const sixMM = gsap.matchMedia();

        sixMM.add("(min-width: 901px)", () => {
          const totalDistance = track.scrollWidth - window.innerWidth;
          const dwellPx = 140; // small hold so panel 06 settles fully before unpinning

          const sixTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#six-s",
              start: "top top",
              pin: true,
              scrub: 0.6,
              end: () => "+=" + (totalDistance + dwellPx),
              invalidateOnRefresh: true,
            },
          });

          // Single shared updater: reads the track's ACTUAL rendered x and
          // sets the bar from that. Called from the track tween's own
          // onUpdate (fires every frame the panel actually moves, including
          // during the scrub: 0.6 smoothing catch-up after scrolling stops)
          // AND once more after the dwell hold, so the bar and the panel are
          // always reporting the identical position — never a separately
          // computed number that can drift ahead or behind on fast scroll.
          const syncBarToTrack = () => {
            const bar = document.getElementById("sixProgressBar");
            if (bar) {
              const x = gsap.getProperty(track, "x");
              const fill = totalDistance > 0 ? Math.min(Math.abs(x) / totalDistance, 1) : 0;
              bar.style.width = fill * 100 + "%";
            }
          };
          sixTl
            .to(track, { x: -totalDistance, ease: "none", duration: totalDistance, onUpdate: syncBarToTrack })
            .to({}, { duration: dwellPx, onUpdate: syncBarToTrack });

          // No manual cleanup needed: gsap.matchMedia() wraps this function's
          // body in its own gsap.context() and automatically reverts every
          // tween, ScrollTrigger, and inline style it created (including the
          // track's x transform and the pin) the moment this breakpoint
          // stops matching.
        });

        sixMM.add("(max-width: 900px)", () => {
          gsap.utils.toArray(".six-panel").forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: { trigger: panel, start: "top 85%", toggleActions: "play none none reverse" },
              }
            );
          });
        });
      }

      // PROCESS — desktop shows all six steps in a row, sequentially
      // highlighted. On phones there's no room for six columns, so instead
      // one step fills the screen at a time: as you scroll, the current step
      // slides out to the left and dims while the next one slides in from
      // the right and comes into full focus, one after another through 06.
      const steps = gsap.utils.toArray(".process-step");
      if (steps.length) {
        ScrollTrigger.create({
          trigger: "#process",
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            const fill = document.getElementById("processFill");
            if (fill) fill.style.width = p * 100 + "%";

            if (window.innerWidth <= 900) {
              const activeFloat = p * (steps.length - 1);
              steps.forEach((s, i) => {
                const diff = i - activeFloat;
                const clamped = Math.max(-1, Math.min(1, diff));
                s.style.transform = `translateX(${clamped * 100}%)`;
                s.style.opacity = String(1 - Math.min(Math.abs(diff), 1) * 0.75);
                s.style.zIndex = String(100 - Math.round(Math.abs(diff) * 10));
                s.classList.toggle("active", Math.abs(diff) < 0.5);
              });
            } else {
              const activeIdx = Math.min(steps.length - 1, Math.floor(p * steps.length));
              steps.forEach((s, i) => {
                s.style.transform = "";
                s.style.opacity = "";
                s.style.zIndex = "";
                s.classList.toggle("active", i <= activeIdx);
              });
            }
          },
        });
      }

      // VISION crossfade
      const stages = gsap.utils.toArray(".vision-stage");
      const dots = gsap.utils.toArray(".vision-dot");
      if (stages.length) {
        gsap.set(stages[0], { opacity: 1 });
        ScrollTrigger.create({
          trigger: "#vision",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const idx = Math.min(2, Math.floor(self.progress * 3));
            stages.forEach((s, i) => gsap.to(s, { opacity: i === idx ? 1 : 0, duration: 0.3, overwrite: true }));
            dots.forEach((d, i) => d.classList.toggle("active", i === idx));
          },
        });
      }

      ScrollTrigger.refresh();

      // Fonts and the (relatively large) hero logo can finish loading after this
      // effect first runs, which changes real layout size. Re-measure once they're
      // ready so pinned-section distances (esp. the Six S filmstrip) stay accurate.
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      window.addEventListener("load", () => ScrollTrigger.refresh());
    });

    return () => ctx.revert();
  }, []);

  return null;
}
