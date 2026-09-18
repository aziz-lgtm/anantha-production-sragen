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

// Friday-to-Sunday event bookings (a full 3-day package) get this discount
// instead -- it does NOT stack with the referral discount. Booking just one
// day that happens to fall on a Fri/Sat/Sun does NOT qualify; it has to be
// the full 3-day span. See getDiscount() below for the rule that picks one
// discount or the other.
export const SPECIAL_WEEKEND_DISCOUNT = 0.5; // 50%

/**
 * true only if start is a Friday, end is a Sunday, and the range is
 * exactly 3 days inclusive (i.e. Fri, Sat, Sun booked as one full package)
 */
export function isSpecialWeekendPackage(startStr: string, endStr: string): boolean {
  if (!startStr || !endStr) return false;
  // parsed as local time (not UTC) so the day-of-week can't shift off by one
  const start = new Date(`${startStr}T00:00:00`);
  const end = new Date(`${endStr}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;

  const diffDays = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  const isThreeDaySpan = diffDays === 2; // start + 2 more days = 3 days inclusive

  return isThreeDaySpan && start.getDay() === 5 && end.getDay() === 0; // Fri -> Sun
}

export type DiscountResult = {
  amount: number;
  label: string | null;
};

/**
 * The two discounts never stack. A full Friday-to-Sunday booking always
 * wins over a referral code (it's the bigger discount anyway), and the
 * referral only applies when the booking doesn't qualify for that package.
 */
export function getDiscount(
  subtotal: number,
  startDate: string,
  endDate: string,
  referralValid: boolean
): DiscountResult {
  if (isSpecialWeekendPackage(startDate, endDate)) {
    return {
      amount: subtotal * SPECIAL_WEEKEND_DISCOUNT,
      label: "Diskon Paket 3 Hari (Jumat–Minggu) 50%",
    };
  }
  if (referralValid) {
    return {
      amount: subtotal * REFERRAL_DISCOUNT,
      label: `Diskon Referral (${REFERRAL_CODE}) 10%`,
    };
  }
  return { amount: 0, label: null };
}

/** "300,000" -> 300000 */
export function parsePrice(raw: string): number {
  return Number(raw.replace(/[^0-9]/g, ""));
}

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString("id-ID")}`;
}