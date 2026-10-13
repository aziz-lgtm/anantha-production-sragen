"use client";

import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  popBundleLamaran,
  products,
  parsePrice,
  formatRupiah,
  WHATSAPP_NUMBER,
  REFERRAL_CODE,
  getDiscount,
  type Product,
} from "@/data/services/bundle-lamaran";

type CartLine = { product: Product; qty: number };

// +62 881-2783-841 in wa.me format (digits only, with country code)
const INVOICE_WA_NUMBER = "628812783841";

export default function BundleLamaranContent() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateUntil, setDateUntil] = useState("");
  const [referral, setReferral] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);

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

  const lines = useMemo(() => Object.values(cart), [cart]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + parsePrice(l.product.harga) * l.qty, 0),
    [lines]
  );
  const referralValid = referral.trim().toUpperCase() === REFERRAL_CODE;
  const { amount: discount, label: discountLabel } = getDiscount(subtotal, referralValid);
  const total = subtotal - discount;

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
      "Halo, saya ingin memesan paket Bundle Lamaran.",
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

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current || !canSubmit || downloading) return;

    setDownloading(true);
    try {
      // make sure custom fonts are loaded before capturing
      if (document.fonts?.ready) await document.fonts.ready;

      const options = {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#0b1410",
      };

      // first call "warms up" fonts/styles (fixes blank/wrong fonts on Safari),
      // second call is the real result
      await toPng(invoiceRef.current, options);
      const dataUrl = await toPng(invoiceRef.current, options);

      const safeName = name.trim().replace(/\s+/g, "-") || "bundle-lamaran";
      const link = document.createElement("a");
      link.download = `invoice-${safeName}.png`;
      link.href = dataUrl;
      link.click();

      // open the share popup
      setInvoiceUrl(dataUrl);
      setShowShare(true);
    } catch (err) {
      console.error("Gagal membuat invoice:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Opens a chat with the target number. wa.me can only carry text, not images,
  // so the user attaches the downloaded PNG manually in the chat.
  const handleOpenWhatsApp = () => {
    const text = [
      "Halo, saya sudah memesan paket Bundle Lamaran.",
      `Nama: ${name}`,
      `Total: ${formatRupiah(total)}`,
      "",
      "Invoice saya lampirkan di chat ini.",
    ].join("\n");
    window.open(
      `https://wa.me/${INVOICE_WA_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  // Web Share API: shares the actual image file (mobile browsers).
  // The user picks WhatsApp and then the contact in the share sheet.
  const handleShareImage = async () => {
    if (!invoiceUrl) return;
    try {
      const blob = await (await fetch(invoiceUrl)).blob();
      const file = new File([blob], "invoice.png", { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Invoice Bundle Lamaran" });
      } else {
        handleOpenWhatsApp();
      }
    } catch (err) {
      // user cancelled the share sheet or it failed
      console.error("Gagal membagikan invoice:", err);
    }
  };

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
      <div className="max-w-2xl">
        <h1
          className="text-[2.2rem] font-medium text-[#f3ecdd] md:text-[2.75rem]"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {popBundleLamaran.title}
        </h1>
        <p
          className="mt-4 text-[1.05rem] leading-[1.7] text-[#cdd3c8]/80"
          style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}
        >
          {popBundleLamaran.description}
        </p>
      </div>

      {/* product grid */}
      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const qty = cart[product.nama]?.qty ?? 0;
          const price = parsePrice(product.harga);
          return (
            <div
              key={product.nama}
              className="flex flex-col rounded-2xl border border-[#c6a15b]/25 bg-[#101a15] p-5"
            >
              <div className="ml-0">
                {[product.foto].map((src, i) => (
                  <div key={src} className="pl-0">
                    <div className="relative aspect-[1/1]">
                      <Image
                        src={src}
                        alt={`Dokumentasi panggung Anantha Production ${i + 1}`}
                        fill
                        sizes="(min-width: 1024px) 480px, 90vw"
                        priority={i === 0}
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <h3
                className="mt-4 text-base font-medium text-[#f3ecdd]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {product.nama}
              </h3>
              <p className="mt-1 text-xs text-[#cdd3c8]/70">{product.layanan}</p>
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

      {/* order form */}
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
                  {referralValid
                    ? "Kode valid — diskon 10% diterapkan."
                    : "Kode tidak dikenali."}
                </p>
              )}
            </div>
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

          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-[#c6a15b] text-[#0b1410] hover:bg-[#e8c77a] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Pesan via WhatsApp
            </Button>
            <Button
              onClick={handleDownloadInvoice}
              disabled={!canSubmit || downloading}
              variant="outline"
              className="border-[#c6a15b]/60 bg-transparent text-[#e8dcc4] hover:bg-[#c6a15b]/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {downloading ? "Membuat invoice..." : "Download Invoice (PNG)"}
            </Button>
          </div>
          {!canSubmit && (
            <p className="mt-2 text-xs text-[#cdd3c8]/50">
              Isi nama, No. HP, dan pilih minimal satu item untuk melanjutkan.
            </p>
          )}
        </div>
      </div>

      {/* Share popup, shown after the invoice is downloaded */}
      {showShare && invoiceUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowShare(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Kirim invoice"
        >
          <div
            className="max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-2xl border border-[#c6a15b]/30 bg-[#101a15] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-lg font-medium text-[#f3ecdd]"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Invoice terunduh
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#cdd3c8]/80">
              Kirim invoice ke WhatsApp +62 881-2783-841 agar pesanan diproses.
            </p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={invoiceUrl}
              alt="Pratinjau invoice"
              className="mt-4 w-full rounded-lg border border-[#c6a15b]/20"
            />

            <div className="mt-5 flex flex-col gap-3">
              <Button
                onClick={handleShareImage}
                className="bg-[#c6a15b] text-[#0b1410] hover:bg-[#e8c77a]"
              >
                Bagikan gambar invoice
              </Button>
              <Button
                onClick={handleOpenWhatsApp}
                variant="outline"
                className="border-[#c6a15b]/60 bg-transparent text-[#e8dcc4] hover:bg-[#c6a15b]/10"
              >
                Buka chat WhatsApp
              </Button>
              <button
                onClick={() => setShowShare(false)}
                className="text-xs text-[#cdd3c8]/60 hover:text-[#cdd3c8]"
              >
                Tutup
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#cdd3c8]/50">
              Jika memilih &quot;Buka chat WhatsApp&quot;, lampirkan file invoice.png yang baru
              diunduh ke chat tersebut.
            </p>
          </div>
        </div>
      )}

      {/* Invoice: rendered off-screen, captured to PNG by html-to-image.
          Inline styles on purpose, they are the most reliable for capture.
          Do NOT use display:none / hidden here or the PNG will be blank. */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <div
          ref={invoiceRef}
          style={{
            width: 480,
            padding: 32,
            background: "#0b1410",
            color: "#f3ecdd",
            fontFamily: "'Manrope', system-ui, sans-serif",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Invoice – {popBundleLamaran.title}
          </h2>
          <p style={{ fontSize: 12, opacity: 0.7, margin: "4px 0 0" }}>{today}</p>

          <div style={{ marginTop: 20, fontSize: 13, lineHeight: 1.6 }}>
            <div>Nama: {name}</div>
            <div>No. HP: {phone}</div>
            {dateFrom && dateUntil && (
              <div>
                Tanggal Sewa: {dateFrom} s/d {dateUntil}
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 20,
              borderTop: "1px solid rgba(198,161,91,0.35)",
              paddingTop: 12,
            }}
          >
            {lines.map((l) => (
              <div
                key={l.product.nama}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  fontSize: 13,
                  padding: "4px 0",
                }}
              >
                <span>
                  {l.product.nama} x{l.qty}
                </span>
                <span>{formatRupiah(parsePrice(l.product.harga) * l.qty)}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 12,
              borderTop: "1px solid rgba(198,161,91,0.35)",
              paddingTop: 12,
              fontSize: 13,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            {discountLabel && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#c6a15b",
                }}
              >
                <span>{discountLabel}</span>
                <span>-{formatRupiah(discount)}</span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 600,
                marginTop: 6,
              }}
            >
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}