import ThemedPlaceHolderSVG from "@/public/vectors/place_holder";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

export default function StayTunnedPlaceHolder() {
    const {theme} = useTheme()

    return (
        <section 
            id="Schedule" 
            className=" w-full flex flex-col gap-8 md:gap-12 items-center justify-center 
            instrument-sans-regular px-4 sm:px-6 py-12 sm:py-16 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
        >
            {/* Section Title */}
            <div className="px-4 sm:px-8 pt-6 sm:pt-10 pb-4 flex gap-2 text-center">
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-base sm:text-lg lg:text-2xl dark:text-gray-300 text-gray-600">
                        The Event
                    </span>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200">
                        Schedule
                    </span>
                </h1>
            </div>

            <div className="relative w-full max-w-2xl px-4">
                {/* Decorative corner elements */}
                <div className="hidden md:absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-dashed border-gray-400 dark:border-gray-500"></div>
                <div className="hidden md:absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-dashed border-gray-400 dark:border-gray-500"></div>
                <div className="hidden md:absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-dashed border-gray-400 dark:border-gray-500"></div>
                <div className="hidden md:absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-dashed border-gray-400 dark:border-gray-500"></div>
                
                {/* Main content box */}
                <div className="flex flex-col items-center gap-6 sm:gap-8 p-6 sm:p-10 md:p-12 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-900 shadow-xl">
                    <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-full blur-2xl opacity-30"></div>
                        <ThemedPlaceHolderSVG 
                            theme={((theme ?? "light") as "dark" | "light")} 
                            width={200} 
                            height={200}
                        />
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4 text-center max-w-md px-2">
                        <div className="inline-block px-3 sm:px-4 py-1 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-full">
                            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                Coming Soon
                            </span>
                        </div>
                        
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                            Schedule will be posted soon
                        </h2>
                        
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                            Please stay tuned for updates
                        </p>
                    </div>

                    {/* Decorative dots */}
                    <div className="flex gap-2 sm:gap-3">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}