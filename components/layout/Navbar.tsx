'use client'

import { useState } from 'react';
import Image from 'next/image'
import Owl from '@/public/owl-new.png'
import {navbar} from '@/data/navbar';

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "our-team", label: "Our Team" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
];

export default function Navbar() {
    const [active, setActive] = useState('hero');
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        setActive(id);
        setMenuOpen(false);

        const el = document.getElementById('id'); if (!el) return;

        const navbarOffset = 96;

        const y = el.getBoundingClientRect().top + window.scrollY - navbarOffset;

        window.scrollTo({
            top: y, behavior: "smooth"
        })
    }
    return(
        <section className="fixed top-4 z-100 justify-between self-center">
            <nav className="border rounded-2xl border-white/10 bakcdrop-blur-lg bg-white/10 w-[1373px] h-[100px]">
                <div className="w-[559px] h-[99px] flex flex-row bg-red-300">
                    <Image src={Owl} width={99} height={99} alt='Owl Logo' />
                    <div className='flex flex-col w-[331px] h-[78px] bg-transparent justify-center self-center'>
                    <span className=" font-['Afacad_Flux]  text-white text-center text-[40px] bg-amber-800 w-[211px] h-[63px] leading-[1.2]top-whitespace-break-spaces">ANANTHA</span>
                    <span className="font-['Afacad_Flux] font-[400px] w-[211px] h-[35px] text-white text-center text-[18px] bg-amber-400 whitespace-break-spaces leading-[1.2] tracking-[0px] -mt-3">-PRODUCTION-</span>
                    </div>
                </div>
            </nav>

        </section>
    )
}