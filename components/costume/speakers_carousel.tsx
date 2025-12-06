import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Speaker from "@/Models/Speakers";
import SpeakerComponent from "./speaker_component";

export default function SpeakerCarousel({ speakers }: { speakers: Speaker[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [containerWidth, setContainerWidth] = useState(0);
  const [gapPx, setGapPx] = useState(8);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = 3000;

  const getItemsPerView = (width: number): number => {
    if (width <= 440) return 1; // Mobile
    if (width <= 768) return 2; // Tablet/small laptop
    if (width <= 1024) return 3; // Medium screens
    return 5; // Desktop/large
  };

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const width = trackRef.current.clientWidth;
        setContainerWidth(width);

        // Get gap from computed style (handles responsive gap classes)
        const style = window.getComputedStyle(trackRef.current);
        const computedGap = parseFloat(style.gap);
        setGapPx(isNaN(computedGap) ? 8 : computedGap);

        const newItemsPerView = getItemsPerView(width);
        setItemsPerView(newItemsPerView);

        // Reset index if necessary to avoid out-of-bounds
        const newMaxIndex = Math.max(0, speakers.length - newItemsPerView);
        if (currentIndex > newMaxIndex) {
          setCurrentIndex(newMaxIndex);
        }
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [currentIndex, speakers.length]);

  const itemWidth = containerWidth > 0 ? containerWidth / itemsPerView : 0;
  const slideWidth = itemWidth + gapPx;
  const maxIndex = Math.max(0, speakers.length - itemsPerView);

  const translateX = currentIndex * slideWidth;

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Loop back to start when reaching the end
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [maxIndex, isPaused, autoScrollInterval]);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="w-full py-2 px-4 sm:px-8">
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={trackRef}>
          <div
            className="flex transition-transform duration-300 ease-in-out gap-2 lg:gap-10"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {speakers.map((speaker, id) => (
              <div
                key={id}
                className="shrink-0 flex justify-center"
                style={{
                  width: `${itemWidth}px`,
                }}
              >
                <SpeakerComponent speaker={speaker} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Indicator & Navigation */}
      <div className="flex items-center justify-center mt-6 gap-2">
        {/* Previous Button */}
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="text-black dark:text-white rounded-full p-2 disabled:opacity-50 
                        disabled:cursor-not-allowed hover:bg-gray-100 hover:dark:bg-gray-500/50 transition"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-1 sm:gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all rounded-full ${idx === currentIndex
                  ? "bg-black dark:bg-white w-3 h-3 sm:w-4 sm:h-4"
                  : "w-2 h-2 bg-gray-300"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          disabled={currentIndex === maxIndex}
          className="text-black dark:text-white rounded-full p-2 disabled:opacity-50 
                        disabled:cursor-not-allowed hover:bg-gray-100 hover:dark:bg-gray-500/50 transition"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}