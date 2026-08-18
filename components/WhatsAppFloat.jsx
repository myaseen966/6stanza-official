import { socialLinks } from "@/lib/socialLinks";

export default function WhatsAppFloat() {
  const whatsapp = socialLinks.find((s) => s.icon === "whatsapp");
  const url = whatsapp && whatsapp.url !== "#" ? whatsapp.url : "#";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24">
        <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.83.5 3.54 1.35 5.02L2 22l5.13-1.32A9.98 9.98 0 0 0 12.02 22C17.52 22 22 17.52 22 12S17.52 2 12.02 2Zm5.6 14.3c-.24.68-1.36 1.3-1.9 1.38-.5.08-1.1.11-1.78-.11-.4-.13-.93-.3-1.6-.6-2.82-1.22-4.66-4.06-4.8-4.25-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.06.99-2.34.26-.28.56-.35.75-.35h.53c.17 0 .4-.06.62.48.24.58.8 2 .87 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.28.75 1.24 1.6 2 1.1.98 2.03 1.29 2.31 1.43.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.53.33.07.12.07.68-.17 1.35Z" />
      </svg>
    </a>
  );
}
