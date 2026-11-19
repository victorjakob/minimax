import About2 from "../components/about/About2";
import About3 from "../components/about/About3";
import AboutHero from "../components/about/AboutHero";
import WeAre from "../components/about/WeAre";
import Contact from "../components/homepage/Contact";

export const metadata = {
  title: "Um okkur",
  description:
    "Kynntu þér MiniMax og fólkið á bak við bókhaldsstofuna: reynsla, nákvæmni og persónuleg þjónusta í Kópavogi.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <div>
      <AboutHero />
      <About2 />
      <About3 />
      <WeAre />
      <Contact />
    </div>
  );
}
