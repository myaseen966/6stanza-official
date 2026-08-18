// Shared "is the loader done and the page actually scrollable yet" flag.
//
// MotionController must not set up any ScrollTrigger animation until the
// Loader has unlocked the page (body.style.overflow is no longer "hidden").
// The previous approach inferred this by reading document.body.style.overflow
// directly and listening for a one-off window event — which works, but is
// sensitive to *when* each component's effect happens to run relative to the
// other (mount order, React StrictMode's dev-only double-invoke of effects,
// etc). A plain module-level flag with a callback registry sidesteps all of
// that: whichever component asks "is it ready?" first always gets the right
// answer, and once Loader calls markSiteReady(), every current and future
// listener is guaranteed to fire exactly once.

let ready = false;
const listeners = new Set();

export function markSiteReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

// Calls cb immediately if the site is already ready; otherwise queues it.
// Returns an unsubscribe function for cleanup on unmount.
export function onSiteReady(cb) {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
