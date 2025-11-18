"use client"
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react"
import { FlipButton, FlipButtonBack, FlipButtonFront } from "../animate-ui/components/buttons/flip"
import { useEffect, useState } from "react"
import { ThemeTogglerButton } from "../animate-ui/components/buttons/theme-toggler"
import GDGConstantineLogo from "@/public/logo/gdg_constantine_logo"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function NavBar() {
    //* manage current theme for the logo
    const { theme, resolvedTheme } = useTheme(); 
    const currentMode = resolvedTheme || theme || 'light'; 
    const [currentTheme, setCurrentTheme] = useState(currentMode === 'dark' ? 'white' : 'black');
    
    //* Mobile menu state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    //* Manage the nav bar movement underline effect (desktop only)
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const initNavbar = () => {
            const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.desktop-nav a');
            const underline: HTMLElement | null = document.getElementById('underline');
            let isNavigating = false;
            let navigationTimeout: NodeJS.Timeout;

            if (!underline || links.length === 0) return;

            //* update underline position
            const updateUnderline = (activeLink: HTMLAnchorElement) => {
                const left = activeLink.offsetLeft;
                const width = activeLink.offsetWidth;
                if (underline) {
                    underline.style.width = `${width}px`;
                    underline.style.transform = `translateX(${left}px)`;
                }
            };

            //* Set active link based on section ID
            const setActiveLink = (sectionId: string) => {
                let activeLink: HTMLAnchorElement | null = null;
                links.forEach(link => {
                    link.classList.remove('active', 'text-black', 'dark:text-white');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active', 'text-black', 'dark:text-white');
                        activeLink = link;
                    }
                });
                if (activeLink) {
                    updateUnderline(activeLink);
                }
            };

            //* Handle link clicks - set navigation flag
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const sectionId = href.replace('#', '');
                        isNavigating = true;
                        setActiveLink(sectionId);
                        
                        // Clear any existing timeout
                        clearTimeout(navigationTimeout);
                        
                        // Reset navigation flag after scroll completes
                        navigationTimeout = setTimeout(() => {
                            isNavigating = false;
                        }, 1500);
                    }
                });
            });

            //* Check hash periodically, but skip if user is navigating
            const hashCheckInterval = setInterval(() => {
                if (isNavigating) return; // Skip updates during navigation
                
                const currentHash = window.location.hash.replace('#', '') || 'Home';
                const activeLink = document.querySelector('.desktop-nav a.active');
                const expectedHref = `#${currentHash}`;
                
                if (!activeLink || activeLink.getAttribute('href') !== expectedHref) {
                    setActiveLink(currentHash);
                }
            }, 200);

            //* Set initial active state based on current hash
            const initialHash = window.location.hash.replace('#', '') || 'Home';
            setActiveLink(initialHash);

            //* Cleanup function
            return () => {
                clearInterval(hashCheckInterval);
                clearTimeout(navigationTimeout);
            };
        };

        const cleanup = initNavbar();
        return cleanup;
    }, []);

    //* Close mobile menu when clicking on a link
    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
    };


    return (
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 sticky
        top-0 left-0 w-screen z-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
            {/* ------------ logo ------ */}
            <div className="flex flex-row gap-1 items-center pb-0">
                <div className="scale-75 md:scale-100">
                    <GDGConstantineLogo fillColor={currentTheme} />
                </div>
                {/* --- Title --- */}
                <div className="flex flex-col leading-tight select-none">
                    <h3 className="font-semibold righteous-regular text-sm md:text-base">
                        DevFest
                    </h3>
                    <p className="text-[10px] md:text-xs instrument-sans-regular">
                        Constantine - 2025
                    </p>
                </div>
            </div>

            

            {/* ------------ Desktop nav items ------ */}
            <nav className="hidden lg:flex gap-2 instrument-sans-regular text-lg relative overflow-hidden navbar-links desktop-nav
                transition-all duration-300 select-none py-2">
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
                    href="#Speakers" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Speakers
                </a>
                <a 
                    href="#Schedule" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Schedule
                </a>
                <a 
                    href="#Hackathon" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Hackathon
                </a>
                <a 
                    href="#Sponsors" 
                    className="relative py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md"
                >
                    Sponsors
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
            <div className="flex gap-2 items-center">
                {/* ------ Theme button (hidden on mobile) ------ */}
                <div className="hidden lg:block">
                    <ThemeTogglerButton
                        onClick={() => {
                            setCurrentTheme(currentMode === 'dark' ? 'black' : 'white');
                        }}
                        modes={["dark","light"]}
                        className="border-2 border-gray-400 shadow-none border-dashed 
                        bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300" 
                    />
                </div>

                    
                {/* -------- CTA (hidden on mobile) ----------- */}
                <Link href={"#Connect"} className="hidden md:flex">
                    <FlipButton className="select-none">
                    <FlipButtonFront className="border-2 border-gray-400 border-dashed 
                    bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 shadow-none
                    font-medium instrument-sans-regular text-sm">
                        Attend The Event
                        <ArrowRight size={16} />
                    </FlipButtonFront>
                    <FlipButtonBack className="border border-gray-400 border-dashed 
                    bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600
                    font-medium instrument-sans-regular text-sm">
                        Jump Right To It
                        <ArrowDown size={16} />
                    </FlipButtonBack>
                </FlipButton>
                </Link>
                
                {/* -------- Mobile menu button ----------- */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 rounded-md border-2 border-gray-400 border-dashed 
                    bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 shadow-none"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>
            
            {/* ------------ Mobile menu ----------- */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800
                transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="flex flex-col p-4 space-y-2 instrument-sans-regular">
                    <a 
                        href="#Home" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Home
                    </a>
                    <a 
                        href="#About" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        About
                    </a>
                    <a 
                        href="#Speakers" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Speakers
                    </a>
                    <a 
                        href="#Schedule" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Schedule
                    </a>
                    <a 
                        href="#Sponsors" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Sponsors
                    </a>
                    <a 
                        href="#Hackathon" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Hackathon
                    </a>
                    <a 
                        href="#Connect" 
                        onClick={handleMobileLinkClick}
                        className="py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-100 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Connect
                    </a>
                    
                    {/* Mobile Theme Toggle and CTA */}
                    <div className="pt-2 space-y-2">
                        {/* Theme button in mobile menu */}
                        <div className="">
                            <ThemeTogglerButton
                                onClick={() => {
                                    setCurrentTheme(currentMode === 'dark' ? 'black' : 'white');
                                }}
                                modes={["dark","light"]}
                                className="border-2 border-gray-400 border-dashed w-full
                                bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300" 
                            />
                        </div>
                        
                        {/* Mobile CTA */}
                        <Link href="#Connect">
                        <FlipButton className="select-none w-full">
                            <FlipButtonFront className="border-2 border-gray-400 border-dashed 
                            bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600
                            font-medium instrument-sans-regular text-sm w-full">
                                Attend The Event
                                <ArrowRight size={16} />
                            </FlipButtonFront>
                            <FlipButtonBack className="border border-gray-400 border-dashed 
                            bg-gray-50 dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600
                            font-medium instrument-sans-regular text-sm w-full">
                                Jump Right To It
                                <ArrowDown size={16} />
                            </FlipButtonBack>
                        </FlipButton>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}