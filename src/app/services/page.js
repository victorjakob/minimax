import ServicesHero from "../components/services/ServicesHero";
import Servicess from "../components/services/Services";
export const metadata = {
  title: "Þjónusta",
  description:
    "Bókhald, skattskil, skattaráðgjöf, rekstrargreiningar og lífeyrisráðgjöf fyrir einstaklinga og fyrirtæki af öllum stærðum.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <div>
      <ServicesHero />
      <Servicess />
    </div>
  );
}
