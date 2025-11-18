import ScheduleDisplayItem from "@/components/costume/schedule_display_item";
import ScheduleItem from "@/Models/schedule_item";
import Speaker from "@/Models/Speakers";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScheduleSection() {
  const moc_schedule_data = [
    new ScheduleItem(
      "08:00",
      "10:00",
      11,
      Date.now(),
      "Starting off",
      null,
      "the opening day ceremony held in room number 67"
    ),
    new ScheduleItem("08:00", "10:00", 12, Date.now(), "Starting off", null),
    new ScheduleItem("08:00", "10:00", 13, Date.now(), "Starting off", null),
    new ScheduleItem(
      "10:00",
      "11:00",
      12,
      Date.now(),
      "Doing something about some topic in the middle of some time in somewhere",
      new Speaker(
        "John Doe",
        "place_holder_2.jpg",
        "",
        "https://linkedin.com/in/johndoe",
        "http://github/",
        "",
        "",
        "John is a software engineer with 10 years of experience."
      ),
      "The test to check if the full of details cells look well if not fuck"
    ),
    new ScheduleItem(
      "11:00",
      "12:00",
      12,
      Date.now(),
      "Doing something about some topic in the middle of some time in somewhere",
      new Speaker(
        "John Doe",
        "place_holder_4.jpg",
        "",
        "https://linkedin.com/in/johndoe",
        "http://github/",
        "",
        "",
        "John is a software engineer with 10 years of experience."
      )
    ),
    new ScheduleItem(
      "13:00",
      "14:00",
      13,
      Date.now(),
      "Doing something about some topic in the middle of some time in somewhere",
      new Speaker(
        "John Doe",
        "place_holder_4.jpg",
        "",
        "https://linkedin.com/in/johndoe",
        "http://github/",
        "",
        "",
        "John is a software engineer with 10 years of experience."
      )
    ),
  ];

  // Organize items by time slots
  const timeSlots = new Map<
    string,
    {
      start: string;
      end: string;
      day11?: ScheduleItem;
      day12?: ScheduleItem;
      day13?: ScheduleItem;
    }
  >();

  moc_schedule_data.forEach((item) => {
    const key = `${item.start_time}-${item.end_time}`;
    if (!timeSlots.has(key)) {
      timeSlots.set(key, { start: item.start_time, end: item.end_time });
    }
    const slot = timeSlots.get(key)!;

    if (item.day_number === 11) slot.day11 = item;
    else if (item.day_number === 12) slot.day12 = item;
    else if (item.day_number === 13) slot.day13 = item;
  });

  const [currentDay, setCurrentDay] = useState(11);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const days = [11, 12, 13];
  const currentIndex = days.indexOf(currentDay);

  const goToPrevDay = () => {
    setCurrentDay(days[(currentIndex + 2) % 3]);
  };

  const goToNextDay = () => {
    setCurrentDay(days[(currentIndex + 1) % 3]);
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
                  December 11
                </th>
                <th className="text-lg font-semibold pb-4 text-center">
                  December 12
                </th>
                <th className="text-lg font-semibold pb-4 text-center">
                  December 13
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
              day11_item={slot.day11}
              day12_item={slot.day12}
              day13_item={slot.day13}
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
