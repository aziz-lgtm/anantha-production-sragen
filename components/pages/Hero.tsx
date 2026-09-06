
import Image from 'next/image';
import Owl from '@/public/owl-new.png'
import Navbar from '@/components/layout/Navbar'

export default function Hero() {
     
    return(
        <section id='hero'className="relative w-[1440px] h-[900px] bg-transparent border border-black flex flex-col justify-center self-center">
            <Navbar />
            {/* box 1 */}
            <div className='relative w-[594px] h-[395px] bg-transparent justify-center flex flex-col  self-center '>
                {/* main box: logo, header 2, header 3 */}
                {/* logo */}
                <Image src={Owl} alt='owl' width={268}height={268} className='relative w-[268px] h-[268px] self-center'></Image>
                {/* H2 */}
                <h2 className="font-['Afacad_Flux'] text-[72px] font-[400px] text-white text-center -mt-10">ANANTHA</h2>
                {/* H3 */}
                <h3 className='text-center text-[24px] text-white -mt-5'>-PRODUCTION-</h3>
            </div>
        </section>
    )
}