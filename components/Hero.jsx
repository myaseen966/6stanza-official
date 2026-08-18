export default function Hero() {
  return (
    <div className="hero-pin" id="heroPin">
      <div className="hero" id="heroInner">
        <div className="hero-grid"></div>
        <div className="hero-inner">
          <div className="hero-logo-col">
            <div className="hero-logo-glow" id="heroLogo">
              <div className="hero-logo-3d">
                <img className="hero-logo hero-logo-front" src="/logo-hero.webp" alt="6STANZA logo" />
                <img className="hero-logo hero-logo-back" src="/logo-hero.webp" alt="" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="hero-text-col">
            <h1 id="heroTitle">
              6<span>STANZA</span>
            </h1>
            <div className="hero-tagline" id="heroTag">
              Six Principles. One Foundation.
            </div>
            <p className="hero-sub" id="heroSub">
              A technology and digital solutions company — Software, Systems, Security,
              Scalability, Speed, Strategy — helping ideas become reliable, scalable,
              real-world solutions.
            </p>
            <div className="hero-ctas" id="heroCtas">
              <a className="btn-primary" href="#start-project">
                Start a Project
              </a>
              <a className="btn-ghost" href="#six-s">
                See the Six S
              </a>
            </div>
          </div>
        </div>
        <div className="scroll-cue" id="scrollCue">
          <span>SCROLL</span>
          <span className="line"></span>
        </div>
      </div>
    </div>
  );
}
