const SITE = "https://www.minimax.is";

export default function sitemap() {
  return ["", "/services", "/about", "/contact", "/personuvernd"].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
