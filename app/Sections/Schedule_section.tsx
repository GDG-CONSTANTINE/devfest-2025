import ScheduleDisplayItem from "@/components/costume/schedule_display_item";
import ScheduleItem from "@/Models/schedule_item";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import SCHEDULE_ITEMS from "../data/schedule";
import { DAYS } from "../data/settings";

export default function ScheduleSection() {
  // Organize items by time slots
  const timeSlots = new Map<
    string,
    {
      start: string;
      end: string;
      day_one?: ScheduleItem;
      day_two?: ScheduleItem;
      day_three?: ScheduleItem;
    }
  >();

  SCHEDULE_ITEMS.forEach((item) => {
    const key = `${item.start_time}-${item.end_time}`;
    if (!timeSlots.has(key)) {
      timeSlots.set(key, { start: item.start_time, end: item.end_time });
    }
    const slot = timeSlots.get(key)!;

    if (item.day_number === DAYS[0]) slot.day_one = item;
    else if (item.day_number === DAYS[1]) slot.day_two = item;
    else if (item.day_number === DAYS[2]) slot.day_three = item;
  });

  const [currentDay, setCurrentDay] = useState(DAYS[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  
  const currentIndex = DAYS.indexOf(currentDay);

  const goToPrevDay = () => {
    setCurrentDay(DAYS[(currentIndex + 2) % 3]);
  };

  const goToNextDay = () => {
    setCurrentDay(DAYS[(currentIndex + 1) % 3]);
  };

  return (
    <section id="Schedule" className="w-screen overflow-x-hidden">
      {/* Section Title */}
      <div className="px-8 pt-10 pb-4 flex gap-2">
        <ArrowRight size={30} />
        <h1 className="flex flex-col instrument-sans-small">
          <span className="text-lg lg:text-2xl dark:text-gray-300">
            The Event
          </span>
          <span>
            <span className="text-xl lg:text-3xl"> Schedule </span>
            <span className="text-lg lg:text-2xl dark:text-gray-300"> For</span>
          </span>
        </h1>
      </div>
      {isMobile && (
        <div className="px-8 flex justify-between items-center gap-4 mb-4">
          <button
            onClick={goToPrevDay}
            className="text-black dark:text-white rounded-full p-2 disabled:opacity-50 
                        disabled:cursor-not-allowed hover:bg-gray-100 hover:dark:bg-gray-500/50 transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <span className="text-lg font-semibold">December {currentDay}</span>
          <button
            onClick={goToNextDay}
            className="text-black dark:text-white rounded-full p-2 disabled:opacity-50 
                        disabled:cursor-not-allowed hover:bg-gray-100 hover:dark:bg-gray-500/50 transition"
            aria-label="Previous"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
      <table className="mx-1 lg:mx-8 w-full instrument-sans-regular my-8 border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="w-auto lg:w-24 text-lg font-semibold pb-4">Time</th>
            {!isMobile ? (
              <>
                <th className="text-lg font-semibold pb-4 text-center">
                  December {DAYS[0]}
                </th>
                <th className="text-lg font-semibold pb-4 text-center">
                  December {DAYS[1]}
                </th>
                <th className="text-lg font-semibold pb-4 text-center">
                  December {DAYS[2]}
                </th>
              </>
            ) : (
              <th className="text-lg font-semibold pb-4 text-center">
                December {currentDay}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from(timeSlots.values()).map((slot, index) => (
            <ScheduleDisplayItem
              key={index}
              time_slot={`${slot.start}-${slot.end}`}
              start_time={slot.start}
              end_time={slot.end}
              day11_item={slot.day_one}
              day12_item={slot.day_two}
              day13_item={slot.day_three}
              current_date={Date.now()}
              isSingleDay={isMobile}
              singleDay={isMobile ? currentDay : undefined}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
