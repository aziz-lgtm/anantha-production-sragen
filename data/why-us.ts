import type { LucideIcon } from "lucide-react";
import { BadgePercent, Award, ShieldCheck, HeartHandshake } from "lucide-react";

// No section heading was given for Why Us (unlike Hero/Services, which had
// one) -- wrote a plain one to fill the gap. Edit or remove freely.
export const whyUsIntro = {
  title: "Kenapa Memilih Kami",
  subtitle: "Beberapa alasan klien terus mempercayakan acara mereka kepada kami.",
};

export type WhyUsItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyUs: WhyUsItem[] = [
  {
    title: "Lebih Murah",
    description:
      "Kami memiliki harga yang kompetitif dan diskon 50% pada hari-hari special",
    icon: BadgePercent,
  },
  {
    title: "Berkualitas",
    description:
      "Kami pernah menjadi penyedia alat panggung pada acara perkumpulan raja-raja nusantara di Kota Sragen",
    icon: Award,
  },
  {
    title: "Jelas dan Terpercaya",
    description:
      "Semua deal secara secara jelas dan terang-terangan kepada client yang bersangkutan, tanpa ada yang abu-abu",
    icon: ShieldCheck,
  },
  {
    title: "Ramah",
    // left blank in the source data -- placeholder below, swap for the
    // real copy whenever you have it
    description:
      "Tim kami selalu siap membantu dengan komunikasi yang hangat dan responsif di setiap tahap acara Anda.",
    icon: HeartHandshake,
  },
];