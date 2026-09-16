import Image from "next/image";

import Hero from "@/components/pages/Hero";
import Services from "@/components/pages/Services";
import Why from "@/components/pages/WhyUs";
import Team from "@/components/pages/Team";
import Testimonial from "@/components/pages/Testimonials";
import Contact from "@/components/pages/Contact";
import Blog from "@/components/pages/Blog";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="justify-center flex flex-col">
    <Hero />
    <Services />
    <Why />
    <Team />
    <Testimonial />
    <Contact />
    <Blog />
    <Footer />
    </div>
  );
}
