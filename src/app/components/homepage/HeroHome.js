import Image from "next/image";

export default function HeroHome() {
  return (
    <div className="relative h-screen">
      <div className="relative mx-auto h-[95%] w-[95%] overflow-hidden">
        <Image
          src="/office.jpg"
          alt="Skrifstofa MiniMax í Studio E8, Kópavogi"
          fill
          priority
          sizes="95vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-10 px-4 text-main">
        <h1 className="text-center text-3xl text-second sm:text-4xl md:text-5xl">
          Við erum sérfræðingar í bókhaldi
        </h1>
      </div>
    </div>
  );
}
