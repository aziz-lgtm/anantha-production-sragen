import Image from 'next/image';
import Owl from '@/public/owl-new.png';
import Navbar from '@/components/layout/Navbar';

export default function Hero() {
    return (
        // Changed to a full-width dark theme section
        <section id='hero' className="relative w-full min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />
            
            {/* Main Content Container: Flex row for left/right split */}
            <div className="flex flex-col lg:flex-row items-center justify-between flex-1 px-8 lg:px-24 py-16 gap-12 max-w-[1440px] mx-auto w-full">
                
                {/* Left Side: Title, Subtitle, and Description */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
                    
                    {/* Optional Badge (inspired by your reference image) */}
                    <div className="inline-block px-4 py-2 bg-gray-900 border border-gray-700 rounded-full text-sm font-semibold text-gray-300 w-max">
                        ⭐ One-Stop Solution Event
                    </div>
                    
                    {/* H1 Title */}
                    <h1 className="font-['Afacad_Flux'] text-5xl lg:text-7xl font-bold leading-tight">
                        ANANTHA <br />
                        <span className="text-gray-400">PRODUCTION</span>
                    </h1>
                    
                    {/* Subtitle */}
                    <h2 className="text-2xl font-semibold text-gray-200">
                        Solusi Visual & Teknis Terintegrasi 
                    </h2>

                    {/* Paragraph derived from your Motto */}
                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                        Kami melayani mulai dari perencanaan konsep, eksekusi dekorasi Engagement yang artistik, pembuatan properti custom-made yang presisi, hingga sewa alat panggung yang aman dan andal. Dengan sistem satu pintu, kami menyederhanakan koordinasi antar-vendor agar Anda dapat menikmati momen berharga Anda dengan tenang.
                    </p>
                    
                    {/* Call to Action Buttons (Matching the style of the reference image) */}
                    <div className="flex gap-4 mt-6">
                        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            Booking Sekarang
                        </button>
                        <button className="px-8 py-3 bg-transparent border border-gray-500 text-white font-bold rounded-full hover:border-white transition-colors">
                            Lihat Layanan
                        </button>
                    </div>
                </div>

                {/* Right Side: Picture */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center">
                    {/* Container for the image with rounded corners matching the reference */}
                    <div className="relative w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex justify-center items-center">
                        <Image 
                            src={Owl} 
                            alt='Anantha Production Mascot' 
                            fill
                            style={{ objectFit: 'cover' }}
                            className="p-10" // Optional padding if your owl is a logo rather than a full-bleed photo
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}