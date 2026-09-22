"use client";

import React from "react";
import Image from "next/image";
import { team } from "@/data/team";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "?";
}

function TeamMemberCard({ person }: { person: (typeof team.people)[0] }) {
  // Filter foto yang kosong
  const photos = [person.photoMain, person.photoMain2, person.photoMain3].filter(
    (photo) => typeof photo === "string" && photo.trim() !== ""
  );

  return (
    <Card className="flex flex-col items-center text-center bg-transparent border-none shadow-none p-0">
      <CardHeader className="p-0 flex flex-col items-center">
        {/* Ukuran ditambah untuk md ke atas (md:h-44 md:w-44) */}
        <div className="relative h-28 w-28 md:h-44 md:w-44 overflow-hidden rounded-full border-2 border-[#c6a15b]/60 bg-[#101a15]">
          {photos.length > 0 ? (
            <Carousel
              opts={{ loop: true }}
              plugins={[Autoplay({ delay: 3500 })]}
              className="w-full h-full"
            >
              <CarouselContent className="m-0 h-full">
                {photos.map((photo, idx) => (
                  <CarouselItem key={idx} className="relative h-28 w-28 md:h-44 md:w-44 p-0 basis-full">
                    <Image
                      src={photo as string}
                      alt={`${person.name} - Photo ${idx + 1}`}
                      fill
                      sizes="(min-width: 768px) 176px, 112px"
                      className="object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span
                className="text-xl md:text-2xl font-medium text-[#c6a15b]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {getInitials(person.name)}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="mt-4 p-0 flex flex-col items-center">
        <CardTitle
          className="text-sm font-medium text-[#f3ecdd] md:text-base"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {person.name}
        </CardTitle>
        <CardDescription className="mt-1 text-xs leading-snug text-[#cdd3c8]/70">
          {person.role}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default function TeamSection() {
  return (
    <section className="relative w-full px-6 py-24 md:px-10" id="our-team">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            className="text-[2rem] font-medium leading-tight text-[#f3ecdd] md:text-[2.75rem]"
            style={{ fontFamily: "'Fraunces', 'Iowan Old Style', serif" }}
          >
            {team.title}
          </h2>
          <p
            className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
          >
            {team.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {team.people.map((person) => (
            <TeamMemberCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}