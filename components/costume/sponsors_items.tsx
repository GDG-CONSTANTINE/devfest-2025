    import Sponsor from "@/Models/sponsors";
    import { ExternalLink, Facebook, Globe, Linkedin } from "lucide-react";
    import { SweepButton } from "./swap_button";
    import Link from "next/link";

    const SponsorItem = ({ sponsor, darkMode }: {
        sponsor:Sponsor, darkMode: boolean
    }) => {
    const tierStyles = {
        gold: {
        accent: darkMode ? 'from-amber-400 to-yellow-500' : 'from-amber-500 to-yellow-600',
        bg: darkMode ? 'bg-amber-500/10' : 'bg-amber-50',
        border: darkMode ? 'border-amber-500/30' : 'border-amber-200',
        button: darkMode 
            ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500' 
            : 'bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800'
        },
        silver: {
        accent: darkMode ? 'from-slate-300 to-gray-400' : 'from-slate-500 to-gray-600',
        bg: darkMode ? 'bg-slate-500/10' : 'bg-slate-50',
        border: darkMode ? 'border-slate-400/30' : 'border-slate-200',
        button: darkMode 
            ? 'bg-gradient-to-r from-slate-500 to-gray-600 hover:from-slate-400 hover:to-gray-500' 
            : 'bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800'
        },
        bronze: {
        accent: darkMode ? 'from-orange-400 to-amber-500' : 'from-orange-500 to-amber-600',
        bg: darkMode ? 'bg-orange-500/10' : 'bg-orange-50',
        border: darkMode ? 'border-orange-500/30' : 'border-orange-200',
        button: darkMode 
            ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500' 
            : 'bg-gradient-to-r from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800'
        },
        partner: {
        accent: darkMode ? 'from-blue-400 to-cyan-500' : 'from-blue-500 to-cyan-600',
        bg: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
        border: darkMode ? 'border-blue-500/30' : 'border-blue-200',
        button: darkMode 
            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500' 
            : 'bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800'
        }
    };

        const styles = tierStyles[sponsor.relation_type];
        const displayColor = sponsor.relation_type == "gold"
        ? "text-yellow-500 dark:text-yellow-400 border-yellow-400" : sponsor.relation_type == "silver"
            ? "text-gray-400 dark:text-gray-300 border-gray-300" : sponsor.relation_type == "bronze"
                ? "text-orange-600/50 dark:text-orange-400/50 border-orange-400/50" : "text-blue-600 dark:text-blue-400 border-blue-400"
    
    return (
        <div className="group relative instrument-sans-regular ">
        {/* Decorative corner accent */}
        <div className={`absolute -top-1 -left-1 w-8 h-8  ${styles.accent} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
        <div className={`absolute -bottom-1 -right-1 w-8 h-8 ${styles.accent} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`}></div>
        
        {/* Main container with diagonal cut */}
        <div className={`relative overflow-hidden transition-all duration-300 group-hover:shadow-2xl `}
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}>
            
            {/* Top accent bar */}
            <div className={`h-1 bg-linear-to-r ${styles.accent}`}></div>
            
            <div className="p-6">
            {/* Logo */}
            <div className="flex items-center justify-between mb-4 no-select-image">
                <div className={`w-32 h-25 flex items-center justify-center overflow-hidden`}>
                {/* If using image: */}
                <img src={sponsor.logo_path} alt={sponsor.name} className="w-35 h-25 object-contain p-2 " />
                </div>
            </div>
            
            {/* Content */}
            <h3 className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {sponsor.name}
            </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'} 
                min-h-10`}>
                {sponsor.description}
            </p>
            
                        {/* actions keys */}
                        <SweepButton
                    className={`hover:bg-transparent
                border-2 border-dashed pt-2 rounded-md items-center justify-center flex py-2 w-full ${displayColor}`}
                
                topContent={<div className="flex gap-2 items-center">
                        <h1>{ sponsor.relation_type[0].toUpperCase() + sponsor.relation_type.substring(1, sponsor.relation_type.length) }</h1>
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
        </div>
        </div>
    );
    };



    export default SponsorItem