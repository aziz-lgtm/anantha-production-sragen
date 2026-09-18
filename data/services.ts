export const services = {
  title: "Apa yang Kami Kerjakan",
  subtitle:
    "Kami melayani Pembuatan Custom Property, Sewa Alat Panggung, Dekorasi Panggung, dan Bundle Lamaran. Klik pada card di bawah untuk detailnya:",
};

export type ServiceCard = {
  slug: string;
  title: string;
  subtitle: string;
};

export const customProperty: ServiceCard = {
  slug: "custom-property",
  title: "Custom Property",
  subtitle: "Pembuatan property panggung sesuai request yang diinginkan",
};

export const sewaAlatPanggung: ServiceCard = {
  slug: "sewa-alat-panggung",
  title: "Sewa Alat Panggung",
  subtitle:
    "Kami menyediakan setup-setup panggung yang professional dan mewah dengan harga yang terjangkau",
};

export const dekorasiPanggung: ServiceCard = {
  slug: "dekorasi-panggung",
  title: "Dekorasi Panggung",
  subtitle: "Mengerjakan dekorasi panggung yang berbeda dari yang lain tetapi mewah",
};

export const bundleLamaran: ServiceCard = {
  slug: "bundle-lamaran",
  title: "Bundle Lamaran",
  subtitle: "Bundle untuk acara lamaran",
};

// Order the cards render in the grid. Each slug maps 1:1 to a folder
// under app/services/<slug>/page.tsx — that folder IS the route, no
// router config needed.
export const serviceCards: ServiceCard[] = [
  customProperty,
  sewaAlatPanggung,
  dekorasiPanggung,
  bundleLamaran,
];