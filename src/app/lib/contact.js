// Single source of truth for MiniMax contact details.
export const EMAIL = "gunnar@minimax.is";

export const PHONES = [
  { label: "Skrifstofa", number: "547 2210" },
  { label: "Bein lína Gunnars", number: "547 2211" },
  { label: "GSM", number: "897 2833" },
];

export const tel = (n) => `tel:+354${n.replace(/\s/g, "")}`;
