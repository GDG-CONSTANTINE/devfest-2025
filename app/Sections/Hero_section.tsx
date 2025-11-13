"use client"
import FloatingStickers from "@/components/costume/stickers_layer";
import TimerBlock from "@/components/costume/timer_block";


export default function HeroSection() {
    return (
        <section
            id="Home"
            className="w-screen h-screen relative overflow-hidden">
            {/* <------------   Bg Image  -----------> */}
            <div className="absolute top-25 right-40 w-screen h-screen -z-10 overflow-hidden no-select-image">
                <img
                    draggable={false}
                    className="w-4/6 object-cover no-select-image"
                    src={"/images/google_colord_strips.png"}
                    alt={"bg_colored_strips_image"} />
            </div>


            {/* ------------- Floating Stickers Layer ----------------- */}
            <div className="absolute w-screen h-screen -z-9 pt-12" draggable="false">
                <FloatingStickers />
            </div>


            {/* ------------- Hero Content Layer ----------------- */}
            <div className="w-screen h-screen flex flex-col justify-center pt-18 items-center text-center no-select-image">
                {/* -------- Title ---------- */}
                <div className="instrument-sans-regular">
                    <h1 className="text-6xl font-semibold">DevFest</h1>
                    <div className="flex flex-col">
                        <span className="text-gray-700 dark:text-gray-200 text-2xl">
                        Constantine
                        </span>
                        <span className="text-md">
                        Season 2025 - Embrace the Future of Tech with Us!
                        </span>
                    </div>
                </div>

                {/* ---------- Timer Block ------------- */}
                <div className="flex flex-col items-center pt-24">
                    <h1 className="instrument-sans-regular">
                        DevFest Start the <strong>11th of December 2025</strong> Don't Miss It!
                    </h1>
                    <TimerBlock />
                </div>
            </div>
        </section>
    )
}