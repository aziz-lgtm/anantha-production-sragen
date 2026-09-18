"use client";

import { useMemo, useState } from "react";
import { Music2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  popAlatPanggung,
  products,
  parsePrice,
  formatRupiah,
  WHATSAPP_NUMBER,
  REFERRAL_CODE,
  isSpecialWeekendPackage,
  getDiscount,
  type Product,
} from "@/data/services/sewa-alat-panggung";

type CartLine = { product: Product; qty: number };

export default function AlatPanggungContent() {
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateUntil, setDateUntil] = useState("");
  const [referral, setReferral] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.nama];
      return {
        ...prev,
        [product.nama]: { product, qty: (existing?.qty ?? 0) + 1 },
      };
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.nama];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const next = { ...prev };
        delete next[product.nama];
        return next;
      }
      return { ...prev, [product.nama]: { product, qty: existing.qty - 1 } };
    });
  };

  const lines = Object.values(cart);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + parsePrice(l.product.harga) * l.qty, 0),
    [lines]
  );
  const referralValid = referral.trim().toUpperCase() === REFERRAL_CODE;
  const isWeekendPackage = isSpecialWeekendPackage(dateFrom, dateUntil);
  const { amount: discount, label: discountLabel } = getDiscount(
    subtotal,
    dateFrom,
    dateUntil,
    referralValid
  );
  const total = subtotal - discount;

  // referral was typed and valid, but got overridden because the chosen
  // range already qualifies for the bigger 3-day weekend package discount
  const referralOverridden = referralValid && isWeekendPackage;

  const canSubmit = name.trim().length > 0 && phone.trim().length > 0 && lines.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;

    const itemLines = lines
      .map(
        (l) =>
          `- ${l.product.nama} x${l.qty} (${formatRupiah(
            parsePrice(l.product.harga) * l.qty
          )})`
      )
      .join("\n");

    const message = [
      "Halo, saya ingin memesan sewa alat panggung.",
      "",
      `Nama: ${name}`,
      `No. HP: ${phone}`,
      dateFrom && dateUntil ? `Tanggal Sewa: ${dateFrom} s/d ${dateUntil}` : "",
      "",
      "Item:",
      itemLines,
      "",
      `Subtotal: ${formatRupiah(subtotal)}`,
      discountLabel ? `${discountLabel}: -${formatRupiah(discount)}` : "",
      `Total: ${formatRupiah(total)}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <div className="max-w-2xl">
        <h1
          className="text-[2.2rem] font-medium text-[#f3ecdd] md:text-[2.75rem]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {popAlatPanggung.title}
        </h1>
        <p
          className="mt-4 text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
        >
          {popAlatPanggung.description}
        </p>
      </div>

      {/* product grid -- swap the Music2 icon per-card for a real product
          photo (e.g. next/image) once you have assets */}
      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const qty = cart[product.nama]?.qty ?? 0;
          const price = parsePrice(product.harga);
          return (
            <div
              key={product.nama}
              className="flex flex-col rounded-2xl border border-[#c6a15b]/25 bg-[#101a15] p-5"
            >
              <div className="flex h-28 items-center justify-center rounded-xl bg-[#0b1410]">
                <Music2 className="h-10 w-10 text-[#c6a15b]" strokeWidth={1.5} />
              </div>
              <h3
                className="mt-4 text-base font-medium text-[#f3ecdd]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {product.nama}
              </h3>
              <p className="mt-1 text-xs text-[#cdd3c8]/70">{product.kegunaan}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-[#e8dcc4]">
                  {formatRupiah(price)}
                </span>
                {qty === 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Tambah ${product.nama}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c6a15b]/60 text-[#e8dcc4] transition-colors hover:bg-[#c6a15b] hover:text-[#0b1410]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(product)}
                      aria-label={`Kurangi ${product.nama}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c6a15b]/60 text-[#e8dcc4]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-4 text-center text-sm text-[#f3ecdd]">{qty}</span>
                    <button
                      onClick={() => addToCart(product)}
                      aria-label={`Tambah ${product.nama}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c6a15b]/60 text-[#e8dcc4]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* order form -- builds the pre-filled WhatsApp message on submit */}
      <div className="mt-16 grid gap-8 rounded-2xl border border-[#c6a15b]/25 bg-[#101a15] p-6 md:grid-cols-2 md:p-8">
        <div>
          <h2
            className="text-lg font-medium text-[#f3ecdd]"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Detail Pemesanan
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="text-xs text-[#cdd3c8]/70">Nama</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className="mt-1 w-full rounded-lg border border-[#c6a15b]/30 bg-[#0b1410] px-3 py-2 text-sm text-[#f3ecdd] outline-none focus:border-[#c6a15b]"
              />
            </div>
            <div>
              <label className="text-xs text-[#cdd3c8]/70">No. HP / WhatsApp</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xx-xxxx-xxxx"
                className="mt-1 w-full rounded-lg border border-[#c6a15b]/30 bg-[#0b1410] px-3 py-2 text-sm text-[#f3ecdd] outline-none focus:border-[#c6a15b]"
              />
            </div>
            <div>
              <label className="text-xs text-[#cdd3c8]/70">Tanggal Sewa</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wide text-[#cdd3c8]/50">
                    Dari
                  </span>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#c6a15b]/30 bg-[#0b1410] px-3 py-2 text-sm text-[#f3ecdd] outline-none [color-scheme:dark] focus:border-[#c6a15b]"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wide text-[#cdd3c8]/50">
                    Sampai
                  </span>
                  <input
                    type="date"
                    value={dateUntil}
                    onChange={(e) => setDateUntil(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#c6a15b]/30 bg-[#0b1410] px-3 py-2 text-sm text-[#f3ecdd] outline-none [color-scheme:dark] focus:border-[#c6a15b]"
                  />
                </div>
              </div>
              {isWeekendPackage && (
                <p className="mt-1 text-xs text-[#c6a15b]">
                  Paket 3 hari penuh (Jumat–Minggu) terdeteksi — diskon 50%
                  otomatis diterapkan.*
                </p>
              )}
            </div>
            <div>
              <label className="text-xs text-[#cdd3c8]/70">Kode Referral (opsional)</label>
              <input
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                placeholder={`Gunakan ${REFERRAL_CODE} untuk diskon 10%`}
                className="mt-1 w-full rounded-lg border border-[#c6a15b]/30 bg-[#0b1410] px-3 py-2 text-sm text-[#f3ecdd] outline-none focus:border-[#c6a15b]"
              />
              {referral.length > 0 && (
                <p
                  className={`mt-1 text-xs ${
                    referralValid ? "text-[#c6a15b]" : "text-[#cdd3c8]/50"
                  }`}
                >
                  {referralOverridden
                    ? "Kode valid, tapi tidak diterapkan karena diskon paket 3 hari sudah aktif dan lebih besar.*"
                    : referralValid
                    ? "Kode valid — diskon 10% diterapkan."
                    : "Kode tidak dikenali."}
                </p>
              )}
            </div>

            <p className="text-xs leading-relaxed text-[#cdd3c8]/50">
              *Diskon 50% hanya berlaku untuk sewa paket penuh 3 hari berturut-turut
              (Jumat–Sabtu–Minggu), bukan untuk satu hari saja meskipun jatuh di
              akhir pekan. Diskon ini tidak dapat digabungkan dengan kode
              referral — sistem akan otomatis menerapkan salah satu yang berlaku.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2
              className="text-lg font-medium text-[#f3ecdd]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Ringkasan
            </h2>
            {lines.length === 0 ? (
              <p className="mt-4 text-sm text-[#cdd3c8]/60">Belum ada item dipilih.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-[#cdd3c8]/85">
                {lines.map((l) => (
                  <li key={l.product.nama} className="flex justify-between">
                    <span>
                      {l.product.nama} x{l.qty}
                    </span>
                    <span>{formatRupiah(parsePrice(l.product.harga) * l.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 space-y-1 border-t border-[#c6a15b]/20 pt-4 text-sm">
              <div className="flex justify-between text-[#cdd3c8]/80">
                <span>Subtotal</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              {discountLabel && (
                <div className="flex justify-between text-[#c6a15b]">
                  <span>{discountLabel}</span>
                  <span>-{formatRupiah(discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 text-base font-medium text-[#f3ecdd]">
                <span>Total</span>
                <span>{formatRupiah(total)}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="mt-6 bg-[#c6a15b] text-[#0b1410] hover:bg-[#e8c77a] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Pesan via WhatsApp
          </Button>
          {!canSubmit && (
            <p className="mt-2 text-xs text-[#cdd3c8]/50">
              Isi nama, No. HP, dan pilih minimal satu item untuk melanjutkan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}