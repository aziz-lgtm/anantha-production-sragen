import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display, Afacad_Flux,} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import InteractiveBackground from "@/components/InteractiveBackground";
import CustomCursor from "@/components/CustomCursor";


const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const afacadFlux = Afacad_Flux({
  variable: "--font-afacad-flux",
  subsets: ["latin"]
}
)

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anantha Production",
  description: "Solusi Dekorasi Anda",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", notoSans.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full justify-center">
        <CustomCursor />
        <InteractiveBackground />
        <div className="relative z-10">{children}</div>
        </body>
    </html>
  );
}
