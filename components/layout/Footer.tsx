import { MapPin } from "lucide-react";
import { footer } from "@/data/footer";

export default function Footer() {
  return (
    <footer className="border-t border-[#c6a15b]/25 bg-[#0b1410]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-10">
        <p
          className="text-sm text-[#cdd3c8]/70"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
        >
          {footer.copyright}
        </p>

        <a
          href={footer.map}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#e8dcc4] transition-colors hover:text-[#c6a15b]"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
        >
          <MapPin className="h-4 w-4 text-[#c6a15b]" strokeWidth={1.5} />
          {footer.mapLabel}
        </a>
      </div>
    </footer>
  );
}