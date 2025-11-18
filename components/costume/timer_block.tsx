import { useState, useEffect } from "react"
import { SlidingNumber } from "../ui/shadcn-io/sliding-number"

const TARGET_DATE = new Date('2025-12-31T23:59:59'); // Change this to your specific target date/time

function calculateTimeLeft(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  
  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds };
}

export default function TimerBlock() {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    // Initial calculation
    const updateTimer = () => {
      const { days: d, hours: h, minutes: m, seconds: s } = calculateTimeLeft(TARGET_DATE);
      setDays(d.toString().padStart(2, '0'));
      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
      setSeconds(s.toString().padStart(2, '0'));
    };

    updateTimer(); // Run immediately on mount

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:flex gap-6 py-4 ">
      <TimerUnit value={days} label="Days" />
      <TimerUnit value={hours} label="Hours" />
      <TimerUnit value={minutes} label="Minutes" />
      <TimerUnit value={seconds} label="Seconds" />
    </div>
  )
}

function TimerUnit({ value, label }: { value: string, label: string }) { 
  return (
    <div className="border-dashed border-2 border-gray-600 rounded-lg px-2 
      py-2 w-22 lg:w-16 flex flex-col justify-center items-center backdrop-blur-lg righteous-regular ">
      <h1 className="text-3xl lg:text-2xl font-semibold py-1">
        <SlidingNumber
          number={value}
          inView={true}
          decimalPlaces={0}
          transition={{ stiffness: 100, damping: 15 }}
        />
      </h1>
      <span className="text-base lg:text-xs text-black dark:text-white">{label}</span>
    </div>
  )
}