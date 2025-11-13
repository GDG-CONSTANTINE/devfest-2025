"use client"
import { ArrowRight, ExternalLink } from "lucide-react"
import { FlipButton, FlipButtonBack, FlipButtonFront } from "../animate-ui/components/buttons/flip"
import { useEffect, useState } from "react"
import { ThemeTogglerButton } from "../animate-ui/components/buttons/theme-toggler"
import GDGConstantineLogo from "@/public/logo/gdg_constantine_logo"
import { useTheme } from "next-themes"

export default function NavBar() {
    //* manage current theme for the logo
    const { theme, resolvedTheme } = useTheme(); 
    const currentMode = resolvedTheme || theme || 'light'; 
    const [currentTheme, setCurrentTheme] = useState(currentMode === 'dark' ? 'white' : 'black');


    //* Manage the nav bar movement underline effect
    useEffect(() => {
        const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('nav a');
        const underline: HTMLElement | null = document.getElementById('underline');

        //* update underline position
        const updateUnderline = (activeLink: HTMLAnchorElement) => {
            const left = activeLink.offsetLeft;
            const width = activeLink.offsetWidth;
            if (underline) {
                underline.style.width = `${width}px`;
                underline.style.transform = `translateX(${left}px)`;
            }
        };

        //* Handle clicks
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                //* Remove active class from all links
                links.forEach(l => {
                    l.classList.remove('active', 'text-black');
                });

                //* Add active class to clicked link
                link.classList.add('active', 'text-black');

                //* Slide underline
                updateUnderline(link);
            });
        });

        //* Set initial active state first link have the active class at start by default
        const initialActive: HTMLAnchorElement | null = document.querySelector('nav a.active');
        if (initialActive) {
            updateUnderline(initialActive);
        }
    }, []); 


    return (
        <div className="flex items-center justify-between pl-4 pt-2
        absolute top-0 left-0 w-[99%] z-20 backdrop-blur-md bg-white/30 dark:bg-black/30">
            {/* ------------ logo ------ */}
            <div className="flex flex-row gap-1 items-center pb-1">
                <GDGConstantineLogo fillColor={currentTheme} />
                {/* --- Title --- */}
                <div className="flex flex-col leading-tight">
                    <h3 className="font-semibold">
                        DevFest
                    </h3>
                    <p className="text-xs instrument-sans-regular">
                        Constantine - 2025
                    </p>
                </div>
            </div>

            

            {/* ------------ nav items ------ */}
            <nav className="flex gap-2 instrument-sans-regular text-lg relative overflow-hidden navbar-links 
                transition-all duration-300">
                <a 
                    href="#Home" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md active"
                >
                    Home
                </a>
                <a 
                    href="#About" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    About
                </a>
                <a 
                    href="#Schedule" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Schedule
                </a>
                <a 
                    href="#Speakers" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Speakers
                </a>
                <a 
                    href="#Sponsors" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Sponsors
                </a>
                <a 
                    href="#Hackathon" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Hackathon
                </a>
                <a 
                    href="#Connect" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Connect
                </a>
                
                {/* -------------- Sliding underline indicator ------------ */}
                <div 
                    id="underline" 
                    className="absolute bottom-0 mt-2 left-0 h-0.5 bg-black dark:bg-white transition-all duration-300 ease-in-out"
                    style={{ width: '0px', transform: 'translateX(0px)' }}
                />
            </nav>

            

            {/* ------------ Buttons ------ */}
            <div className="flex gap-2">
            {/* ------ Theme button ------ */}
            <ThemeTogglerButton
            onClick={() => {
                //Ex: the theme change animation delay the logo color change so here just switch it up quickly (u_u)
                // also it now work before the theme actually change so we need to do the opposite of the current mode
                setCurrentTheme(currentMode === 'dark' ? 'black' : 'white');
            }}
            modes={["dark","light"]}
            className="border border-gray-400 border-dashed 
            bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300" />

                
            {/* -------- CTA ----------- */}
            <FlipButton>
                <FlipButtonFront className="border border-gray-400 border-dashed 
                bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600
                font-medium instrument-sans-regular">
                    Attend The Event
                    <ArrowRight size={16} />
                </FlipButtonFront>
                <FlipButtonBack className="border border-gray-400 border-dashed 
                bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600
                font-medium instrument-sans-regular">
                    Jump Right To It
                    <ExternalLink size={16} />
                </FlipButtonBack>
            </FlipButton>
            </div>
        </div>
    )
}