import Sponsor from "@/Models/sponsors";
import Image from "next/image";
import { CircleStar, Facebook, Globe, Handshake, Linkedin } from "lucide-react";
import { SweepButton } from "./swap_button";
import Link from "next/link";


export default function SponsorComponent({ sponsor }: { sponsor: Sponsor }) {
    

    //* changeable
    const relation = sponsor.relation_type[0].toUpperCase() + sponsor.relation_type.substring(1, sponsor.relation_type.length)
    const displayColor = sponsor.relation_type == "gold"
        ? "text-yellow-500 dark:text-yellow-400 border-yellow-400" : sponsor.relation_type == "silver"
            ? "text-gray-400 dark:text-gray-300 border-gray-300" : sponsor.relation_type == "bronze"
                ? "text-orange-600/50 dark:text-orange-400/50 border-orange-400/50" : "text-black dark:text-white"
    const icon = sponsor.relation_type == "partner" ? <Handshake /> : <CircleStar />
    
    //* UI
    return (
        <div className="flex flex-col gap-8">
            <Image src={sponsor.logo_path} alt={"sponsor"} width={150} height={150} />
            {/* actions keys */}
            <SweepButton
                className={`bg-gray-100/50 dark:bg-gray-100/20 hover:bg-transparent
            border-2 border-dashed pt-2 rounded-md items-center justify-center flex py-2 ${displayColor}`}
            
            topContent={<div className="flex gap-2 items-center">
                    <h1>{ relation }</h1>
                    {icon}
                </div>}
            
                bottomContent={<div className="flex gap-2">
                    {sponsor.website_link && <Link className="hover:-translate-y-2 duration-300 transition-all m-1"
                    target="_blank"
                        href={sponsor.website_link}>
                    <Globe />
                    </Link>}
                    {sponsor.facebook_link && <Link className="hover:-translate-y-2 duration-300 transition-all m-1"
                    target="_blank"
                        href={sponsor.facebook_link}>
                        <Facebook />
                    </Link>}
                    {sponsor.linkedin_link && <Link className="hover:-translate-y-2 duration-300 transition-all m-1"
                    target="_blank"
                        href={sponsor.linkedin_link}>
                    <Linkedin />
                    </Link>}
            </div>}
            />
        </div>
    )
}