    import SponsorItem from "@/components/costume/sponsors_items";
    import Sponsor from "@/Models/sponsors";
    import { ArrowRight, Hash } from "lucide-react";
    import { useTheme } from "next-themes";



    export default function SponsorsSection() {
        const { theme } = useTheme()
        const SPONSORS_LOGOS_ROOT = "/logo/"
        const sponsors_and_partners = [
            new Sponsor("/logo/google.svg","partner","www.google.com", 'Google','test the situation you want to see how the text display',"","something"),
            new Sponsor("/logo/google.svg","partner","www.google.com", 'Google','test the situation you want to see how the text display',"","something"),
            new Sponsor("/logo/google.svg","gold",'Test','test the situation you',"/","",""),
            new Sponsor("/logo/socode.svg","gold",'Test','test the situation you',"/","",""),
            new Sponsor("/logo/socode.svg","silver",'Test','test the situation you',"/","",""),
            new Sponsor("/logo/google.svg","bronze",'Test','test the situation you',"", "something",""),
        ]


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
                <div className="w-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 px-12 py-8">
                    {sponsors_and_partners.map((partner, index) =>{
                        return <SponsorItem sponsor={partner} darkMode={theme === 'dark'} key={index} />
                    })}
                </div>                
            </section>
        )
    }