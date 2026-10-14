export const popBundleLamaran = {
  title: "Properti Kustom",
  description:
    "Wujudkan dekorasi dan properti custom impian untuk acara Anda. Tim kami siap merancang dan membuat properti khusus yang disesuaikan dengan konsep, tema, dan kebutuhan acara Anda. Di bawah merupakan property yang telah dibuat. Akan tetapi jika anda ingin memesan custom property, pilih pada 'custom property' item",
};

export type Product = {
  nama: string;
  layanan: string;
  harga: string; // kept as the raw display string, e.g. "600,000"
  foto: string; // DITAMBAH
};

export const products: Product[] = [
  { nama: "Kendi Tanah Liat", layanan: "Sewa", harga: "5,000", foto: "/LAIN-LAIN/kendi.png" },
  { nama: "Kursi Portable 4 Unit", layanan: "Sewa", harga: "10,000", foto: "/LAIN-LAIN/portable-kursi-isi-4.png" },
  { nama: "Piring Tanah Liat", layanan: "Sewa", harga: "3,000", foto: "/LAIN-LAIN/piring-tanah-liat.png" },
  { nama: "Custom Property", layanan: "Tambahkan ini untuk Pre-Order Property Sesuai Kebutuhan Anda", harga: "0", foto: "/LAIN-LAIN/menek.jpg" },
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

export const heroPhoto = {
    pic: ""
  }