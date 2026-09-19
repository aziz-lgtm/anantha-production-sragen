import { whyUs, whyUsIntro } from "@/data/why-us";

export default function WhyUsSection() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            className="text-[2rem] font-medium leading-tight text-[#f3ecdd] md:text-[2.75rem]"
            style={{ fontFamily: "'Fraunces', 'Iowan Old Style', serif" }}
          >
            {whyUsIntro.title}
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {whyUsIntro.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="flex flex-col rounded-2xl border border-[#c6a15b]/25 bg-[#101a15] p-6 transition-colors duration-300 hover:border-[#c6a15b]/70"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c6a15b]/50 bg-[#0b1410]">
                  <Icon className="h-5 w-5 text-[#c6a15b]" strokeWidth={1.75} />
                </div>
                <h3
                  className="mt-5 text-lg font-medium text-[#f3ecdd]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {reason.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-[#cdd3c8]/75"
                  style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}