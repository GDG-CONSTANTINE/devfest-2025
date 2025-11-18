"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Simple hook to detect if element is in view
function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold } // Trigger when 20% visible
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

export default function AnimatedStickersSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const [isAnimating, setIsAnimating] = useState(false);

    const STICKERS_ROOT = "/stickers/"
    
  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true); // Trigger once
    }
  }, [inView, isAnimating]);

  return (
    <div ref={sectionRef} className="relative w-1/3 h-[800px]"> {/* Add height for scroll space; adjust */}
      {/* Upper images */}
      <div className="flex items-end relative h-64">
        <Image 
          className={`
            absolute -rotate-60 left-10 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-400' : ''} /* Stagger: 400ms */
          `} 
          src={`${STICKERS_ROOT}bar_side.png`} 
          width={60} 
          height={10} 
          alt="Bar side sticker" 
        />
        <Image 
          className={`
            w-42 h-24 -rotate-30 absolute left-20 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-500' : ''} /* 500ms */
          `} 
          src={`${STICKERS_ROOT}arrow_sticker.png`} 
          width={42} 
          height={24} 
          alt="Arrow sticker" 
        />
        <Image 
          className={`
            w-28 h-32 -rotate-80 absolute left-53 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-600' : ''} /* 600ms */
          `} 
          src={`${STICKERS_ROOT}bigger_then.png`} 
          width={28} 
          height={32} 
          alt="Bigger than sticker" 
        />
      </div>
      
      {/* Lower images */}
      <div className="flex items-end relative h-64 mt-8">
        <Image 
          className={`
            absolute left-10 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-0' : ''} /* Starts immediately */
          `} 
          src={`${STICKERS_ROOT}three_dots.png`} 
          width={230} 
          height={230} 
          alt="Three dots sticker" 
        />
        <Image 
          className={`
            rotate-48 pb-4 absolute left-67 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-200' : ''} /* 200ms */
          `} 
          src={`${STICKERS_ROOT}hashtag.png`} 
          width={100} 
          height={80} 
          alt="Hashtag sticker" 
        />
        <Image 
          className={`
            w-12 h-12 absolute left-91 translate-y-[-50vh] opacity-0 transition-all duration-1000 ease-out
            ${isAnimating ? 'animate-fall delay-300' : ''} /* 300ms */
          `} 
          src={`${STICKERS_ROOT}dot.png`} 
          width={12} 
          height={12} 
          alt="Dot sticker" 
        />
      </div>
    </div>
  );
}