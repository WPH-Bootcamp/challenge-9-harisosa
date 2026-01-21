export default function HomeHero() {
  return (
    <section className="relative h-206.75 w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero.svg)" }}
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white pt-20 sm:pt-24">
        <h1 className="max-w-[18ch] sm:max-w-[24ch] text-3xl sm:text-5xl font-semibold leading-tight">
          Explore Culinary Experiences
        </h1>

        <p className="mt-3 max-w-[34ch] sm:max-w-[60ch] text-sm sm:text-base text-white/80">
          Search and refine your choice to discover the perfect restaurant.
        </p>

        <div className="mt-6 w-full max-w-130">
          <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-3 shadow-sm">
            <span className="text-black/50">🔍</span>
            <input
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/40"
              placeholder="Search restaurants, food and drink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
