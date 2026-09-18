export const popAlatPanggung = {
  title: "Alat Panggung",
  description:
    "Menyediakan layanan sewa perlengkapan teknis panggung profesional seperti sound system, lighting, rigging, dan stage floor berkualitas tinggi untuk menjamin kelancaran acara Anda.",
};

export type Product = {
  nama: string;
  kegunaan: string;
  harga: string; // kept as the raw display string, e.g. "300,000"
};

export const products: Product[] = [
  { nama: "Gitar", kegunaan: "Mengiringi Musik", harga: "300,000" },
  { nama: "Drum", kegunaan: "Mengiringi Musik", harga: "300,000" },
  { nama: "Violin", kegunaan: "Mengiringi Musik", harga: "300,000" },
  { nama: "Bass Guitar", kegunaan: "Mengiringi Musik", harga: "300,000" },
  { nama: "Piano", kegunaan: "Mengiringi Musik", harga: "1,000,000" },
];

// +62 881-2783-841 with the "+" and separators stripped -- this is the
// exact format wa.me expects.
export const WHATSAPP_NUMBER = "628812783841";
export const REFERRAL_CODE = "REZA123";
export const REFERRAL_DISCOUNT = 0.1; // 10%

/** "300,000" -> 300000 */
export function parsePrice(raw: string): number {
  return Number(raw.replace(/[^0-9]/g, ""));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}