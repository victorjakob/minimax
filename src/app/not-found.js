import Link from "next/link";

export const metadata = { title: "Síða fannst ekki" };

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-28 text-center text-main">
      <p className="text-sm font-light tracking-widest text-main/50">404</p>
      <h1 className="mt-4 text-4xl font-light md:text-5xl">Þessi síða fannst ekki</h1>
      <p className="mt-4 max-w-md font-light leading-relaxed text-main/80">
        Hlekkurinn gæti verið úreltur eða slóðin rangt slegin inn.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="rounded-full bg-main px-8 py-3 text-white transition-colors hover:bg-brand-darker">
          Á forsíðu
        </Link>
        <Link href="/contact" className="rounded-full border border-main px-8 py-3 transition-colors hover:bg-main hover:text-second">
          Hafðu samband
        </Link>
      </div>
    </main>
  );
}
