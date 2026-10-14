export const popBundleLamaran = {
  title: "Dekorasi Panggung",
  description:
    "Layanan pengaturan dan dekorasi panggung profesional. Kami menyediakan backdrop tematik, rangkaian bunga, serta instalasi pencahayaan estetika untuk menciptakan panggung visual yang memukau.",
};

export type Product = {
  nama: string;
  layanan: string;
  harga: string; // kept as the raw display string, e.g. "600,000"
  foto: string; // DITAMBAH
};

export const products: Product[] = [
  { nama: "Bola Juntai", layanan: "", harga: "15,000", foto: "/DEKORASI-DAN-BACKDROP/bola-juntai.png" },
  { nama: "Bunga Artificial Putih Per Box", layanan: "", harga: "50,000", foto: "/DEKORASI-DAN-BACKDROP/bunga-artificial.png" },
  { nama: " Busa Elastis Bunga", layanan: "6 buah. per buah 3rb", harga: "3,000", foto: "/DEKORASI-DAN-BACKDROP/busa-elastis-bunga.png" },
  { nama: "Kain Backdrop Hitam Besar 10X4", layanan: "", harga: "", foto: "/DEKORASI-DAN-BACKDROP/kain-backdrop-hitam-besar.png" },
  { nama: "Kain Backdrop Putih", layanan: "10 helai, per helai 20rb", harga: "20,000", foto: "/DEKORASI-DAN-BACKDROP/kain-backdrop-putih.png" },
  { nama: "Karpet Bludru Abu-abu", layanan: "", harga: "15,000", foto: "/DEKORASI-DAN-BACKDROP/KARPET-BLUDRU-ABU-ABU-15.000.png" },
  { nama: "Karpet Permadani", layanan: "", harga: "35,000", foto: "/DEKORASI-DAN-BACKDROP/KARPET-PERMADHANI-35.000.png" },
  { nama: "Kursi Tiffany", layanan: "", harga: "20,000", foto: "/DEKORASI-DAN-BACKDROP/KURSI-TIFFANY-PUNYA-2-20.000.png" },
  { nama: "Photoprops", layanan: "", harga: "5,000", foto: "/DEKORASI-DAN-BACKDROP/PHOTOPROPS-PUNYA-5-5.000.png" },
  { nama: "Stand Bakcdrop Tipe Gawangan", layanan: "", harga: "25,000", foto: "/DEKORASI-DAN-BACKDROP/STAND BACKDROP-TIPE-GAWANGAN-25.000.png" },
  { nama: "Kain Backdrop Putih", layanan: "", harga: "25,000", foto: "/DEKORASI-DAN-BACKDROP/STAND-BACKDROP-TIPE-T-25.000.png" },
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