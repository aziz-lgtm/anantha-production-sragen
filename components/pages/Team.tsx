import Image from "next/image";
import { team } from "@/data/team";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "?";
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
            <div key={person.name} className="flex flex-col items-center text-center">
              {/* round frame -- photo when we have one, initials otherwise */}
              <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[#c6a15b]/60 bg-[#101a15]">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span
                      className="text-xl font-medium text-[#c6a15b]"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {getInitials(person.name)}
                    </span>
                  </div>
                )}
              </div>

              <h3
                className="mt-4 text-sm font-medium text-[#f3ecdd] md:text-base"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {person.name}
              </h3>
              <p className="mt-1 text-xs leading-snug text-[#cdd3c8]/70">
                {person.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}