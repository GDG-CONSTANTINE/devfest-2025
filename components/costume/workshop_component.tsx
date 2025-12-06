import WorkShopItem from "@/Models/workshop";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import FlipPfpComponent from "./flip_pfp";
import { joinWorkShop } from "@/app/services/hackathon_handler";
import { LoaderPinwheel } from "lucide-react";
import { Button } from "../ui/button";


export default function WorkShopItemComponent({ item }: { item: WorkShopItem }) {
    const [formData, setFormData] = useState({ fullName: '', email: '' });
    const [isJoined, setIsJoined] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleJoin = async () => {
        if (!formData.fullName || !formData.email)
            return;
        setIsLoading(true)
        const res = await joinWorkShop({
            fullName: formData.fullName,
            email: formData.email,
            workshopTitle: item.workshop_title
        })
        if (res.success) {
            setIsJoined(true)
            setIsLoading(false)
        }
    }


    const handleReserve = (e: React.FormEvent) => {
        e.preventDefault();
        setFormData({ fullName: '', email: '' });
        handleJoin()
    };


    return (
        <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="workshop" className="">
            <AccordionTrigger className="hover:no-underline px-6 py-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:items-start w-full text-left">
                {/* Instructor Image */}
                <div className="shrink-0 ">
                <FlipPfpComponent speaker={item.workshop_instructor} />
                </div>

                {/* Workshop Details */}
                <div className="grow min-w-0 pt-8">
                <h2 className="text-lg font-semibold text-card-foreground mb-1">
                    {item.workshop_title}
                </h2>
                <h3 className="text-sm text-muted-foreground mb-2">
                    {item.workshop_instructor.full_name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.workshop_description}
                </p>
                </div>
            </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 space-y-4">
            {/* Prerequisites */}
            <div className="bg-muted/50 rounded-lg p-4 border">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">
                    *                
                </span>
                Prerequisites
                </h4>
                <div className="text-sm text-muted-foreground space-y-2">
                {item.workshop_prerequisites.split('\n\n').map((prereq, idx) => (
                    prereq.trim() && (
                    <div key={idx} className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{prereq.trim()}</span>
                    </div>
                    )
                ))}
                </div>
            </div>

            {/* Registration Form */}
            <div className="space-y-3 pt-2">
                <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-background border-2 border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                />
                <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-2.5 bg-background border-2 border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
                />
                <Button
                    disabled={isJoined || isLoading}
                onClick={handleReserve}
                className="w-full"
                >
                            {isLoading
                            ? 
                            <div className="flex gap-2 items-center justify-center">
                                <LoaderPinwheel className="w-4 h-4 animate-spin" />
                                Joining...
                                </div>
                            :<div>
                            {isJoined ? "Joined" :  "Reserve Your Place"}
                            </div>}
                </Button>
            </div>
            </AccordionContent>
        </AccordionItem>
        </Accordion>
    );
}