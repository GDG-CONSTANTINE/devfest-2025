import { useEffect } from "react"
import { SlidingNumber } from "../ui/shadcn-io/sliding-number"




export default function TimerBlock() {

    
    return (
        <div className="flex gap-6 py-4">
            <TimerUnit value="12" label="Days" />
            <TimerUnit value="08" label="Hours" />
            <TimerUnit value="34" label="Minutes" />
            <TimerUnit value="56" label="Seconds" />
        </div>
    )
}


function TimerUnit({ value, label }: { value: string, label: string }) { 
    return (
        <div className="border-dashed border-2 border-gray-600 rounded-lg px-2 
        py-2 w-16 flex flex-col justify-center items-center backdrop-blur-lg instrument-sans-regular">
            <h1 className="text-2xl font-semibold py-1">
            <SlidingNumber
            number={value}
            inView={true}
            decimalPlaces={0}
            transition={{ stiffness: 100, damping: 15 }}
            />
            </h1>
            <span className="text-xs text-black dark:text-white">{label}</span>
        </div>
    )
}