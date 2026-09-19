import { hero, services } from "@/data/hero";
import Image from "next/image"
import Navbar from "../layout/Navbar";
import StagePhoto from "@/public/hero-stage-photo.jpeg";
// No canvas, no "use client" needed here -- the light field lives in
// InteractiveBackground, mounted once at the layout level. This section
// only needs a transparent (or semi-transparent dark) background so that
// field reads through it.
export default function Hero() {
  return (
    <section className="relative flex w-full lg:min-h-[900px] items-center overflow-hidden" id="hero">
      {/* faint vignette to keep text legible over the light field */}
      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-[1226px] px-6 py-24 pt-38 md:px-10">
        {/* flex-col on small screens (photo stacks below the text, full
            width); flex-row on lg+ (photo sits beside the text in its
            own reserved column). Real layout space, so it can never
            overlap the text at any width. */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
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

          {/* stage documentation photo -- full width on mobile, fixed
              column width on lg+. aspect-[3/2] matches the photo's own
              proportions (2560x1706) so nothing awkward gets cropped */}
          <div className="w-full max-w-md shrink-0 sm:max-w-lg lg:w-[480px] lg:max-w-none">
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-lg shadow-black/40">
              <Image
                src={StagePhoto}
                alt="Dokumentasi panggung Anantha Production"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}