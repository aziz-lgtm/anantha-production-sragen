export const popBundleLamaran = {
  title: "Bundle Lamaran",
  description:
    "Paket sewa hemat dan lengkap khusus momen lamaran. Paket sudah mencakup backdrop dekoratif, set kursi & meja ringkes, signage, serta lighting romantis yang siap pakai.",
};

export type Product = {
  nama: string;
  layanan: string;
  harga: string; // kept as the raw display string, e.g. "600,000"
};

export const products: Product[] = [
  { nama: "Classic Botanica Vista", layanan: "Decor Only", harga: "600,000" },
  { nama: "Rustic Warm Vista", layanan: "Decor Only", harga: "700,000" },
  { nama: "Ethernal Horizon Vista", layanan: "Decor Only", harga: "700,000" },
  { nama: "Pure Canvas Elegance", layanan: "Mengiringi Musik", harga: "800,000" },
  { nama: "Floral Radial Elegance", layanan: "Decor Only", harga: "900,000" },
];

// +62 881-2783-841 with the "+" and separators stripped -- exact format
// wa.me expects.
export const WHATSAPP_NUMBER = "628812783841";
export const REFERRAL_CODE = "REZA123";
export const REFERRAL_DISCOUNT = 0.1; // 10%

// Unlike Sewa Alat Panggung, this page has only one discount path -- the
// referral code. No weekend package rule here, so there's nothing to
// avoid stacking against.
export function getDiscount(subtotal: number, referralValid: boolean) {
  if (referralValid) {
    return {
      amount: subtotal * REFERRAL_DISCOUNT,
      label: `Diskon Referral (${REFERRAL_CODE}) 10%`,
    };
  }
  return { amount: 0, label: null as string | null };
}

/** "600,000" -> 600000 */
export function parsePrice(raw: string): number {
  return Number(raw.replace(/[^0-9]/g, ""));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}