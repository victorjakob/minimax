import Location from "../components/Location";
import ContactHero from "../components/contact/ContactHero";
import Contactx from "../components/homepage/Contact";

export const metadata = {
  title: "Hafðu samband",
  description:
    "Hafðu samband við MiniMax: hringdu, sendu skilaboð eða kíktu til okkar í Engihjalla 8, 200 Kópavogi.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main className="pt-20">
      <ContactHero />
      <Contactx />
      <Location />
    </main>
  );
}
