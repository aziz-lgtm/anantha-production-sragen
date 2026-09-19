export const popCustomProperty = {
  title: "Custom Property",
  description:
    "Wujudkan dekorasi dan properti custom impian untuk acara Anda. Tim kami siap merancang dan membuat properti khusus yang disesuaikan dengan konsep, tema, dan kebutuhan event Anda.",
};

export type Product = {
  nama: string;
  kegunaan: string;
  harga: string; // kept as the raw display string, e.g. "300,000"
};

export const products: Product[] = [
  { nama: "Batu", kegunaan: "Custom Batu untuk theater", harga: "300,000" },
  { nama: "Masjid", kegunaan: "Custom Masjid untuk Pengajian", harga: "300,000" },
  { nama: "Pohon", kegunaan: "Custom Pohon untuk Pentas Drama", harga: "300,000" },
  {
    nama: "Hewan-hewanan",
    kegunaan: "Custom binatang-binatang untuk figura",
    harga: "300,000",
  },
];

// +62 881-2783-841 with the "+" and separators stripped -- exact format
// wa.me expects.
export const WHATSAPP_NUMBER = "628812783841";
export const REFERRAL_CODE = "REZA123";
export const REFERRAL_DISCOUNT = 0.1; // 10%

// Same as Bundle Lamaran: referral discount only, no weekend package rule
// (that 50% logic is specific to Sewa Alat Panggung).
export function getDiscount(subtotal: number, referralValid: boolean) {
  if (referralValid) {
    return {
      amount: subtotal * REFERRAL_DISCOUNT,
      label: `Diskon Referral (${REFERRAL_CODE}) 10%`,
    };
  }
  return { amount: 0, label: null as string | null };
}

/** "300,000" -> 300000 */
export function parsePrice(raw: string): number {
  return Number(raw.replace(/[^0-9]/g, ""));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}