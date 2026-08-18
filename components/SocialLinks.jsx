import { socialLinks } from "@/lib/socialLinks";

const icons = {
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 2h-3.2v13.4a3 3 0 1 1-2.13-2.87V9.4a6.2 6.2 0 1 0 5.33 6.14V8.3a7.5 7.5 0 0 0 4.4 1.42V6.5a4.2 4.2 0 0 1-4.4-4.5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4v11H3v-11Zm7 0h3.83v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.87V20.5h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.32-1.96 2.7v5.19h-4v-11Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.83.5 3.54 1.35 5.02L2 22l5.13-1.32A9.98 9.98 0 0 0 12.02 22C17.52 22 22 17.52 22 12S17.52 2 12.02 2Zm5.6 14.3c-.24.68-1.36 1.3-1.9 1.38-.5.08-1.1.11-1.78-.11-.4-.13-.93-.3-1.6-.6-2.82-1.22-4.66-4.06-4.8-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.06.99-2.34.26-.28.56-.35.75-.35h.53c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.24 1.6 2 1.1.98 2.03 1.29 2.31 1.43.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.35Z" />
    </svg>
  ),
};

export default function SocialLinks({ className = "" }) {
  return (
    <div className={"social-links " + className}>
      {socialLinks.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="social-link"
        >
          {icons[s.icon]}
        </a>
      ))}
    </div>
  );
}
