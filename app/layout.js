import "./globals.css";
import Loader from "@/components/Loader";

export const metadata = {
  title: "6STANZA — Six Principles. One Foundation.",
  description:
    "6STANZA is a technology and digital solutions company built on six principles — Software, Systems, Security, Scalability, Speed, and Strategy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Loader />
        {children}
      </body>
    </html>
  );
}
