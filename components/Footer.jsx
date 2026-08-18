import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-brand">
            <img src="/logo.webp" alt="6STANZA logo" />
            6STANZA
          </div>
          <div className="footer-tag">
            Six Principles. One Foundation. A technology and digital solutions company.
          </div>
          <SocialLinks className="footer-socials" />
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#six-s">Six S</a>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#vision">Vision</a>
          </div>
          <div className="footer-col">
            <h5>Capabilities</h5>
            <span>Technology</span>
            <span>Growth</span>
            <span>Creative</span>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <a href="mailto:6stanzaofficial@gmail.com">6stanzaofficial@gmail.com</a>
            <span>Pakistan</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 6STANZA. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
