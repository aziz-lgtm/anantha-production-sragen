export const hero = {
  title: "One-Stop Solution Event yang Mewah dalam Design, tetapi Ramah di Kantong",
  subtitle:
    "Kami melayani mulai dari perencanaan konsep, eksekusi dekorasi Engagement yang artistik, pembuatan properti custom-made yang presisi, hingga sewa alat panggung yang aman dan andal. Dengan sistem satu pintu, kami menyederhanakan koordinasi antar-vendor agar Anda dapat menikmati momen berharga Anda dengan tenang.",
};

const services = [
  "Bundle Lamaran",
  "Dekorasi Panggung",
  "Custom Property",
  "Sewa Alat Panggung",
];

// No canvas, no "use client" needed here -- the light field lives in
// InteractiveBackground, mounted once at the layout level. This section
// only needs a transparent (or semi-transparent dark) background so that
// field reads through it.
export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden">
      {/* faint vignette to keep text legible over the light field */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 20% 50%, rgba(11,20,16,0.75) 20%, rgba(11,20,16,0.15) 60%, rgba(11,20,16,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:px-10">
        <div className="max-w-2xl">
          <h1
            className="font-serif text-[2.4rem] font-medium leading-[1.12] tracking-tight text-[#f3ecdd] md:text-[3.4rem] lg:text-[4rem]"
            style={{ fontFamily: "'Fraunces', 'Iowan Old Style', serif" }}
          >
            {hero.title}
          </h1>

          <p
            className="mt-7 max-w-[56ch] text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80 md:text-[1.125rem]"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {services.map((service, i) => (
              <span key={service} className="flex items-center gap-6">
                {i !== 0 && (
                  <span className="h-3.5 w-px bg-[#c6a15b]/40" aria-hidden="true" />
                )}
                <span className="text-sm text-[#e8dcc4]/90">{service}</span>
              </span>
            ))}
          </div>

          <div className="mt-10">
            <a
              href="#konsultasi"
              className="inline-flex items-center rounded-full border border-[#c6a15b] px-7 py-3 text-sm font-medium text-[#f3ecdd] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0b1410]"
              style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
            >
              Konsultasikan Acara Anda
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}