export type TeamMember = {
  name: string;
  role: string;
  /** path under /public, e.g. "/reza.png" -- omit if no photo yet */
  photoMain?: string;
  photoMain2?: string;
  photoMain3?: string;
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
      name: "Reza Maulana Fadillah, S.Pd.",
      role: "Owner & Art Director",
      photoMain: "/REZA2FOR.jpg",
      photoMain2: "/REZA1.jpg",
      photoMain3: "",
      
    },
    // role given as "?" in the source data -- left as-is, replace once known
    { name: "Rana Dinar Algadisa, S.Pd.", 
      role: "Lead Makeup Artist & Fashion Consultant" , photoMain: "/RANA1FOR.jpg"
      ,photoMain2: "/RANA2.jpg"
      ,photoMain3: "",
    },
    { name: "Tsania Hukma Al Ghadiza", 
      role: "Videographer, Video Editor & Content Marketer" , photoMain:"/SANIA-FORMALLL.jpg"
      , photoMain2: "/SANIA1.jpg"
      ,photoMain3: "/SANIA2.jpg",
    },
    { name: "⁠Dinanty D'tya putri", 
      role: "In-House Model & Brand Ambassador", 
      photoMain:"/DINAN1FOR.jpg"
      ,photoMain2: "/DINAN2.jpg"
      ,photoMain3: "/DINAN3.jpg",
    },
    {
      name: "Syaifira Dinawati Aulia, Amd.Keb",
      role: "Assistant Makeup Artist & Attire Coordinator",
      photoMain:"/SAFIRA1FOR.jpg", 
      photoMain2: "/SAFIRA2.jpg"
      ,photoMain3: "",
    },
    {
      name: "Widia wahana Kurnia putra, S.Pd.",
      role: "Photographer & Custom Prop Specialist",
      photoMain:"/WIDIA-Formal.jpg", 
      photoMain2: "/WIDIA1.jpg"
      ,photoMain3: "",
    },
    { name: "Abdul Rozaq Mubarok, S.Pd.", 
      role: "Photo Editor & Decor Production Manager", photoMain: "/ROZAQ1FOR.jpg", 
      photoMain2: "/ROZAQ2.jpg"
      ,photoMain3: "",
     },
    { name: "Aziz Ahmad Faizal Abror", 
      role: "Software Engineer", 
      photoMain:"/FAISAL1FOR.jpg", 
      photoMain2: "/FAISAL2.jpg"
    ,photoMain3: "", },
  ],
};