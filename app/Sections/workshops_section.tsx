import WorkShopItemComponent from "@/components/costume/workshop_component";
import workshops_list from "../data/workshops";
import { ArrowRight } from "lucide-react";


export default function WorkShopsSection() {
    return (
        <div id="Workshops" className="w-screen min-h-screen">
            {/* Title */}
            <div className="px-8 pt-10 pb-4 flex gap-2">
                <ArrowRight size={30} />
                <h1 className="flex flex-col instrument-sans-small">
                    <span className="text-xl lg:text-2xl dark:text-gray-300">Check The</span>
                    <span>
                        <span className="text-2xl lg:text-3xl"> WorkShops </span>
                        <span className="text-xl lg:text-2xl dark:text-gray-300"> we have</span>
                        <span className="text-2xl lg:text-3xl"> Ready </span>
                    </span>
                </h1>
            </div>
            {/* content */}
            {workshops_list.map((item, index) => {
                return <WorkShopItemComponent item={item} key={index}/>
            })}
        </div>
    )
}