import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

export default function CreatorButton(): React.ReactElement {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="page-container">
        
        {/* Massive Dark Card */}
        <div className="relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-[#151619] px-6 pt-20 text-center sm:px-12 sm:pt-28 lg:rounded-[4rem] lg:pt-36 border border-white/5 shadow-2xl">
          
          {/* Vibrant Glows Behind Graphic */}
          <div aria-hidden className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 blur-[100px]" />

          {/* Text Content */}
          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="mb-6 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl text-balance">
              Are you a Creator?
            </h2>
            <p className="mb-12 text-xl font-medium leading-relaxed text-slate-300 sm:text-2xl text-balance">
              Turn your expertise into a thriving business. Join hundreds of Indian creators 
              who use Creonex to host sessions, sell courses, and build communities.
            </p>
            <Button 
              size="lg" 
              nativeButton={false}
              render={<Link href="/creators" />}
              className="group/button h-16 rounded-full px-12 text-lg font-bold shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-transform hover:-translate-y-1"
            >
              See features for creators
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-5 w-5 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </div>

          {/* Massive Cascading Graphic at Bottom */}
          <div className="relative z-10 mt-20 flex w-full max-w-[1100px] justify-center lg:mt-32">
             
             {/* Left peek card */}
             <div className="absolute left-[-5%] top-20 z-10 aspect-video w-[70%] -rotate-[8deg] overflow-hidden rounded-t-[2rem] border-x border-t border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] brightness-50 transition-all duration-700 hover:-rotate-[12deg] hover:-translate-x-6 sm:left-[2%]">
                <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" alt="Analytics Dashboard" fill className="object-cover" />
             </div>

             {/* Right peek card */}
             <div className="absolute right-[-5%] top-20 z-10 aspect-video w-[70%] rotate-[8deg] overflow-hidden rounded-t-[2rem] border-x border-t border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] brightness-50 transition-all duration-700 hover:rotate-[12deg] hover:translate-x-6 sm:right-[2%]">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Code Interface" fill className="object-cover" />
             </div>

             {/* Main Center UI Card */}
             <div className="relative z-20 aspect-video w-[95%] translate-y-10 overflow-hidden rounded-t-[2rem] border-x border-t border-white/10 bg-[#0f172a] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 hover:-translate-y-4 sm:w-[80%] sm:rounded-t-[3rem]">
               <Image
                 src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1600&q=80"
                 alt="Creator Dashboard Main"
                 fill
                 className="object-cover opacity-90"
               />
               {/* Bottom shadow gradient to blend into the card floor */}
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#151619] via-[#151619]/80 to-transparent" />
             </div>
             
          </div>

        </div>

      </div>
    </section>
  );
}
