import "./globals.css";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import Script from "next/script";

const SITE = "https://www.minimax.is";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MiniMax · Bókhaldsþjónusta í Kópavogi",
    template: "%s · MiniMax",
  },
  description:
    "Fagleg og áreiðanleg bókhaldsþjónusta, skattskil og ráðgjöf fyrir einstaklinga og fyrirtæki. MiniMax, Engihjalli 8, Kópavogi.",
  keywords: [
    "bókhald",
    "bókhaldsþjónusta",
    "skattskil",
    "MiniMax",
    "fjármál",
    "reikningsskil",
    "bókhaldsstofa",
    "fyrirtækjaþjónusta",
  ],
  authors: [{ name: "MiniMax", url: SITE }],
  creator: "MiniMax",
  publisher: "MiniMax",
  openGraph: {
    siteName: "MiniMax",
    locale: "is_IS",
    type: "website",
    title: "MiniMax · Fagleg bókhaldsþjónusta",
    description:
      "Fagleg og áreiðanleg bókhaldsþjónusta fyrir einstaklinga og fyrirtæki",
    // The share image is app/opengraph-image.jpg (picked up automatically).
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2a2829",
};

// Business details for Google (shown in search results and on Maps)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "MiniMax",
  url: SITE,
  image: `${SITE}/opengraph-image.jpg`,
  email: "gunnar@minimax.is",
  telephone: "+354 897 2833",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Engihjalli 8",
    postalCode: "200",
    addressLocality: "Kópavogur",
    addressCountry: "IS",
  },
  areaServed: "IS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="is">
      <body className={`font-elisabethische antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Topbar />
        {children}
        <Footer />
        {/* Cloudflare Web Analytics: cookieless page views, read by the Victory Studio dashboard */}
        <Script
          id="cf-web-analytics"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "27abc0f2aa9445beb025a634eee8d2b7"}'
        />
      </body>
    </html>
  );
}
