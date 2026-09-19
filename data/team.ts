export type TeamMember = {
  name: string;
  role: string;
  /** path under /public, e.g. "/reza.png" -- omit if no photo yet */
  photo?: string;
};

export const team: {
  title: string;
  subtitle: string;
  people: TeamMember[];
} = {
  title: "Bertemu Tim-tim Kami",
  subtitle: "Di bawah merupakan tim-tim yang menjalankan Anantha Production",
  people: [
    {
      name: "Reza Maulana Fadhilah S.pd",
      role: "Founder & Team Leader",
      photo: "/reza.png",
    },
    // role given as "?" in the source data -- left as-is, replace once known
    { name: "Rana Dinar Alghadisa", role: "Beauty & Fashion Specialist" },
    { name: "Tsania", role: "Visual Model & Commercial Talent" },
    { name: "Dinan", role: "Promotional Model & Marketing Executive" },
    {
      name: "Widia Wahana Kurnia Putra",
      role: "Visual Capture & Property Specialist",
    },
    { name: "Rozaq", role: "Visual Editor & Creative Strategist" },
    { name: "Aziz Ahmad Faizal Abror", role: "Web Architect & Digital Developer", photo:"/faizal-zoom.png" },
  ],
};