import SponsorComponent from "@/components/costume/sponsor_component";
import Sponsor from "@/Models/sponsors";
import { ArrowRight, Hash } from "lucide-react";



export default function SponsorsSection() {

    const SPONSORS_LOGOS_ROOT = "/logo/"
    const sponsors_and_partners = [
        new Sponsor("/logo/google.svg","partner","www.google.com", "","something"),
        new Sponsor("/logo/google.svg","bronze","", "something",""),
        new Sponsor("/logo/google.svg","gold","/","",""),
        new Sponsor("/logo/socode.svg","gold","/","",""),
        new Sponsor("/logo/socode.svg","silver","/","","")
    ]

    const get_specific_tier_items = (tier:"partner" | "gold" | "silver" | "bronze") => {
        return sponsors_and_partners.filter((item) => item.relation_type == tier)
    }


    return (
        <section
            className="w-screen"
            id="Sponsors">
            {/* Title */}
            <div className="px-8 pt-10 pb-4 flex gap-2">
                <ArrowRight size={30} />
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-xl lg:text-2xl dark:text-gray-300">Meet</span>
                    <span>
                        <span className="text-2xl lg:text-3xl"> Our Sponsors </span>
                        <span className="text-xl lg:text-2xl dark:text-gray-300"> and</span>
                        <span className="text-2xl lg:text-3xl"> Partners </span>
                    </span>
                </h1>
            </div>

            {/* Partners */}
            <div className="w-screen flex items-end justify-center px-16 py-4 gap-8">
                {get_specific_tier_items("partner").map((partner, index) =>{
                    return <SponsorComponent sponsor={partner} key={index} />
                })}
            </div>

            {/* Sponsors */}
            <div>
                <div className="px-8 flex items-center justify-center gap-1 py-8">
                    <Hash size={20} />
                <h1 className="flex instrument-sans-small gap-2">
                    <span className="text-xl lg:text-2xl dark:text-gray-300">Our</span>
                    <span>
                        <span className="text-2xl lg:text-3xl"> Sponsors </span>

                    </span>
                </h1>
            </div>
            {/* ----- Gold ---- */}
                <div className="w-screen flex items-end justify-center px-16 py-4 gap-8 pb-2 lg:pb-12">
                {get_specific_tier_items("gold").map((partner, index) =>{
                    return <SponsorComponent sponsor={partner} key={index} />
                })}
            </div>
            {/* ----- Silver ----- */}
                <div className="w-screen flex items-end justify-center px-16 py-4 gap-8 pb-2 lg:pb-12">
                {get_specific_tier_items("silver").map((partner, index) =>{
                    return <SponsorComponent sponsor={partner} key={index} />
                })}
                </div>
                
            {/* ----- Bronze ----- */}
                <div className="w-screen flex items-end justify-center px-16 py-4 gap-8 pb-2 lg:pb-12">
                {get_specific_tier_items("bronze").map((partner, index) =>{
                    return <SponsorComponent sponsor={partner} key={index} />
                })}
            </div>
            </div>
        </section>
    )
}