import SpeakerCarousel from "@/components/costume/speakers_carousel";
import { ArrowRight } from "lucide-react";
import SPEAKERS from "../data/speakers";



export default function SpeakersSection() {
    return (
        <section
            id="Speakers"
            className="w-screen/**"
        >
            <div className="px-4 md:px-8 pt-10 pb-4 flex gap-2">
                <ArrowRight size={30} />
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-lg md:text-2xl dark:text-gray-300">What</span>
                    <span>
                        <span className="text-xl md:text-3xl"> Speakers </span>
                        <span className="text-lg md:text-2xl dark:text-gray-300"> do we have lined up ?</span>
                    </span>
                </h1>
            </div>

            <p className="instrument-sans-regular text-gray-600 dark:text-gray-300 pl-8 md:pl-16">
                Listen and connect with top voices in many fields all in one place and one event
            </p>


            {/* speakers list display */}
            <SpeakerCarousel speakers={SPEAKERS} />
        </section>
    )
}