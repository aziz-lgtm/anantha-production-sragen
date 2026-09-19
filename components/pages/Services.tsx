import Link from "next/link";
import { Button } from "@/components/ui/button";
import { services, serviceCards } from "@/data/services";

// Each card is a next/link to /services/[slug] -- that route is just a
// folder (see app/services/sewa-alat-panggung/page.tsx). No client-side
// router library needed; Next.js resolves this at build time and
// prefetches it automatically when the card scrolls into view.
export default function ServicesSection() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10" id="services">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            className="text-[2rem] font-medium leading-tight text-[#f3ecdd] md:text-[2.75rem]"
            style={{ fontFamily: "'Fraunces', 'Iowan Old Style', serif" }}
          >
            {services.title}
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {services.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((card) => (
            <Link
              key={card.slug}
              href={`/services/${card.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-[#c6a15b]/25 bg-[#101a15] p-6 transition-colors duration-300 hover:border-[#c6a15b]/70"
            >
              <div>
                <h3
                  className="text-lg font-medium text-[#f3ecdd]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-[#cdd3c8]/75"
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                >
                  {card.subtitle}
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-6 w-fit border-[#c6a15b]/60 bg-transparent text-[#e8dcc4] group-hover:bg-[#c6a15b] group-hover:text-[#0b1410]"
              >
                Lihat Detail
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}