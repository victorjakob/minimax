import Link from "next/link";
import { EMAIL, PHONES, tel } from "../lib/contact";

export default function Footer() {
  return (
    <footer className="border-t border-foreground bg-background text-main shadow">
      <div className="mx-auto w-full max-w-[90%] p-4 md:p-6 md:py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex justify-center md:justify-start">
            <span className="text-3xl font-extralight tracking-tighter md:text-4xl">
              MiniMax
            </span>
          </Link>

          {/* Links Section */}
          <div className="flex flex-col items-center space-y-3 md:mb-0 md:space-y-2">
            <Link
              href="/services"
              className="text-base hover:underline md:text-sm"
            >
              Þjónusta
            </Link>
            <Link
              href="/about"
              className="text-base hover:underline md:text-sm"
            >
              Um okkur
            </Link>
            <Link
              href="/contact"
              className="text-base hover:underline md:text-sm"
            >
              Hafðu samband
            </Link>
            <Link
              href="/personuvernd"
              className="text-base hover:underline md:text-sm"
            >
              Persónuvernd
            </Link>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-2 text-center md:items-end md:space-y-1 md:text-right">
            <p className="text-sm md:text-xs">
              Studio E8
              <br /> Engihjalli 8<br />
              200 Kópavogur
            </p>
            {PHONES.map((p) => (
              <a key={p.number} href={tel(p.number)} className="text-sm hover:underline md:text-xs">
                {p.label}: {p.number}
              </a>
            ))}

            <a href={`mailto:${EMAIL}`} className="text-sm hover:underline md:text-xs">{EMAIL}</a>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

        {/* Copyright Section */}
        <span className="block text-center text-sm md:text-xs">
          © 2003–{new Date().getFullYear()}{" "}
          <Link href="/" className="font-semibold hover:underline">
            MiniMax™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
