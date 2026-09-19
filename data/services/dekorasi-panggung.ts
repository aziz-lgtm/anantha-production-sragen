export const popDekorPanggung = {
  title: "Dekorasi Panggung",
  description:
    "Layanan penataan dan dekorasi panggung profesional. Kami menyediakan backdrop tematik, floral arrangement, serta instalasi lighting estetis untuk menciptakan visual panggung yang memukau.",
};

export type Product = {
  nama: string;
  kegunaan: string;
  harga: string;
};

// Placeholder data -- no product list was provided for this page yet.
// Swap these out for the real packages/pricing whenever you have them;
// the shape (nama, kegunaan, harga) matches the other service pages.
export const products: Product[] = [
  {
    nama: "Backdrop Floral Garden",
    kegunaan: "Dekorasi backdrop bertema taman bunga",
    harga: "1,500,000",
  },
  {
    nama: "Backdrop Elegant Gold",
    kegunaan: "Dekorasi backdrop mewah nuansa emas",
    harga: "1,800,000",
  },
  {
    nama: "Paket Lighting Estetis",
    kegunaan: "Instalasi lighting artistik untuk panggung",
    harga: "1,200,000",
  },
  {
    nama: "Floral Arrangement Set",
    kegunaan: "Rangkaian bunga dekoratif untuk panggung",
    harga: "900,000",
  },
  {
    nama: "Backdrop Rustic Minimalis",
    kegunaan: "Dekorasi backdrop bertema rustic minimalis",
    harga: "1,300,000",
  },
];

// +62 881-2783-841 with the "+" and separators stripped -- exact format
// wa.me expects.
export const WHATSAPP_NUMBER = "628812783841";
export const REFERRAL_CODE = "REZA123";
export const REFERRAL_DISCOUNT = 0.1; // 10%

// Same as Bundle Lamaran and Custom Property: referral discount only, no
// weekend package rule (that 50% logic is specific to Sewa Alat Panggung).
export function getDiscount(subtotal: number, referralValid: boolean) {
  if (referralValid) {
    return {
      amount: subtotal * REFERRAL_DISCOUNT,
      label: `Diskon Referral (${REFERRAL_CODE}) 10%`,
    };
  }
  return { amount: 0, label: null as string | null };
}

export function parsePrice(raw: string): number {
  return Number(raw.replace(/[^0-9]/g, ""));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}