"use client"
import { useEffect, useRef } from 'react';
import AboutSection from "./Sections/About_section";
import ConnectSection from "./Sections/Connect_section";
import HackathonSection from "./Sections/Hackathon_section";
import HeroSection from "./Sections/Hero_section";
import ScheduleSection from "./Sections/Schedule_section";
import SpeakersSection from "./Sections/Speakers_section";
import SponsorsSection from "./Sections/Sponsors_section";
import { DISPLAY_HACKATHON, DISPLAY_SCHEDULE } from './data/settings';
import StayTunnedPlaceHolder from '@/components/costume/stay_tuned_place_holder';
import CostumeToast from '@/components/costume/costume_toast';
import WorkShopsSection from './Sections/workshops_section';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeSectionRef = useRef<string | null>(null);

  useEffect(() => {
    // Query sections after the component mounts (DOM is ready)
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0) {
      console.warn('No sections with IDs found. Check your section components.');
      return;
    }

    // Create an IntersectionObserver to watch when sections enter/leave viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio (most visible)
        let mostVisibleEntry: IntersectionObserverEntry | null = null;
        let maxRatio = -1;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleEntry = entry;
          }
        });

        if (mostVisibleEntry && (mostVisibleEntry as IntersectionObserverEntry).isIntersecting && maxRatio > 0.1) {  // Threshold for "active"
          const newActiveId = (mostVisibleEntry as IntersectionObserverEntry).target.id;

          // Only update if changed (avoids spam)
          if (newActiveId !== activeSectionRef.current) {
            activeSectionRef.current = newActiveId;
            // Update URL hash
            history.replaceState(null, "null", `#${newActiveId}`);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -80% 0px'
      }
    );

    // Start observing each section
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    // Handle initial load: Scroll to hash if present, or set to first
    const handleInitial = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
          activeSectionRef.current = hash;
        }
      } else if (sections.length > 0) {
        const firstSection = sections[0] as HTMLElement;
        history.replaceState(null, "null", `#${firstSection.id}`);
        activeSectionRef.current = firstSection.id;
      }
    };

    // Run initial after a short delay to ensure layout is settled
    const timeoutId = setTimeout(handleInitial, 100);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <CostumeToast />
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <WorkShopsSection />
      {DISPLAY_SCHEDULE
        ? <ScheduleSection />
        : <StayTunnedPlaceHolder />}
      {DISPLAY_HACKATHON
        && <HackathonSection />}
      <SponsorsSection />
      <ConnectSection />
    </main>
  );
}