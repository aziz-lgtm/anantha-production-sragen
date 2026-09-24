import { contact } from "@/data/contact";

// No canvas, no "use client" needed here -- same as Hero, this section
// just needs to read through the InteractiveBackground light field.
export default function Contact() {
  // 1. Definisikan pesan otomatis yang ingin dikirim
  const whatsappMessage = encodeURIComponent("Halo, saya ingin bertanya mengenai layanan dari Anantha Production.");

  // 2. Gabungkan link dasar dari data dengan parameter pesan (?text=...)
  // Kita pastikan dulu jika contact.links.whatsapp ada isinya
  const whatsappUrl = contact.links.whatsapp 
    ? `${contact.links.whatsapp}?text=${whatsappMessage}` 
    : undefined;

  return (
    <section
      className="relative flex w-full items-center overflow-hidden py-28 md:py-36"
      id="contact">
      <div className="relative z-10 mx-auto w-full max-w-[1226px] px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-[2.2rem] font-medium leading-[1.12] tracking-tight text-[#f3ecdd] md:text-[3rem]"
            style={{ fontFamily: "'Fraunces', 'Iowan Old Style', serif" }}>
            {contact.title}
          </h2>

          <p
            className="mx-auto mt-6 max-w-[52ch] text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80 md:text-[1.125rem]"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
            {contact.subtitle}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!whatsappUrl}
              className="inline-flex items-center rounded-full border border-[#c6a15b] px-7 py-3 text-sm font-medium text-[#f3ecdd] transition-colors duration-300 hover:bg-[#c6a15b] hover:text-[#0b1410] aria-disabled:pointer-events-none aria-disabled:opacity-40">
              Chat via WhatsApp
            </a>

            <a 
              href={contact.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-[#c6a15b]/40 px-7 py-3 text-sm font-medium text-[#e8dcc4]/90 transition-colors duration-300 hover:border-[#c6a15b] hover:text-[#f3ecdd]">
              Instagram
            </a>

            {/* TikTok link left empty in data/contact.ts -- fill it in
                and this will pick it up automatically */}
            <a 
              href={contact.links.tiktok || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!contact.links.tiktok}
              className="inline-flex items-center rounded-full border border-[#c6a15b]/40 px-7 py-3 text-sm font-medium text-[#e8dcc4]/90 transition-colors duration-300 hover:border-[#c6a15b] hover:text-[#f3ecdd] aria-disabled:pointer-events-none aria-disabled:opacity-40">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}