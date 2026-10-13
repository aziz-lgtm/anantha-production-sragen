"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { hero, services, heroPhoto } from "@/data/hero";
import Navbar from "../layout/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Slides come straight from the heroPhoto object in the data file.
const slides = Object.values(heroPhoto);

export default function Hero() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section className="relative flex w-full lg:min-h-[900px] items-center overflow-hidden" id="hero">
      <Navbar />

      <div className="relative z-10 mx-auto w-full max-w-[1226px] px-6 py-24 pt-38 md:px-10">
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
                href="#services"
                className="inline-flex items-center rounded-full border border-[#c6a15b] px-7 py-3 text-sm font-medium text-[#f3ecdd] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0b1410]"
                style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
              >
                Konsultasikan Acara Anda
              </a>
            </div>
          </div>

          {/* shadcn Carousel -- same size as the original photo:
              full width on mobile, 480px column on lg+, aspect 3:2, rounded-2xl */}
          <div className="w-full max-w-md shrink-0 sm:max-w-lg lg:w-[480px] lg:max-w-none">
            <Carousel
              opts={{ loop: true }}
              // eslint-disable-next-line react-hooks/refs
              plugins={[autoplay.current]}
              className="overflow-hidden rounded-2xl shadow-lg shadow-black/40"
            >
              <CarouselContent className="ml-0">
                {slides.map((src, i) => (
                  <CarouselItem key={src} className="pl-0">
                    <div className="relative aspect-[1/1]">
                      <Image
                        src={src}
                        alt={`Dokumentasi panggung Anantha Production ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 480px, 90vw"
                        priority={i === 0}
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3 hidden" />
              <CarouselNext className="right-3 hidden" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}