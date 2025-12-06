import AnimatedTerminal from "@/components/costume/costume_terminal";
import { Expand, Minus, SkipForward, X } from "lucide-react";
import { useRef } from "react";



export default function HackathonSection() {
    const CONTROLLER_BUTTONS_SIZE = 22
    const terminalRef = useRef(null)

    return (
        <section
            id="Hackathon"
            className="w-screen min-h-screen"
        >
            {/* window terminal */}
            <div className="border border-gray-100/50 m-0 md:m-8 min-h-screen bg-black text-white">


                {/*----- Control bar ----- */}
                <div className="w-full h-12 border-gray-100/50 border-b flex justify-between items-center">
                    {/* window title */}
                    <h1 className="pl-4 text-lg jaro-regular">Hackathon.EXE</h1>
                    {/* control buttons */}
                    <div className="flex ">
                        <div
                            onClick={() => {
                                if (terminalRef.current && (terminalRef.current as { triggerAction: () => void }).triggerAction) {
                                    (terminalRef.current as { triggerAction: () => void }).triggerAction()
                                }
                            }}
                            className="p-3 border-l dark:border-gray-50/50 border-gray-400/50 
                        dark:hover:bg-gray-50/20 hover:bg-gray-400/10">
                            <SkipForward size={CONTROLLER_BUTTONS_SIZE} />
                        </div>
                        <div className="p-3 border-l dark:border-gray-50/50 border-gray-400/50 
                        dark:hover:bg-gray-50/20 hover:bg-gray-400/10">
                            <Minus size={CONTROLLER_BUTTONS_SIZE} />
                        </div>
                        <div className="p-3 border-l dark:border-gray-50/50 border-gray-400/50 
                        dark:hover:bg-gray-50/20 hover:bg-gray-400/10">
                            <Expand size={CONTROLLER_BUTTONS_SIZE} />
                        </div>
                        <div className="p-3 border-l dark:border-gray-50/50 border-gray-400/50 
                        dark:hover:bg-gray-50/20 hover:bg-gray-400/10">
                            <X size={CONTROLLER_BUTTONS_SIZE} />
                        </div>
                    </div>
                </div>


                {/* ----- Window Content ------ */}
                <AnimatedTerminal ref={terminalRef} />
            </div>

        </section>
    )
}