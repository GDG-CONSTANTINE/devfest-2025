"use client";
import FloatingTip from "@/components/costume/floating_tip";
import GalleryComponent from "@/components/costume/gallery";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const STICKERS_ROOT = "/stickers/";
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);


  //
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger when the bottom of the section reaches the viewport
      if (rect.bottom < windowHeight && rect.bottom > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="About"
      className="h-fit w-screen overflow-x-hidden"
    >
      {/* ----------- Gallery ------------- */}
      <GalleryComponent />

      {/* ----------- About Area ------------- */}
      <div className="px-4 lg:px-8 pt-10 pb-4 flex gap-2">
        <ArrowRight size={30} />
        <h1 className="flex flex-col instrument-sans-small">
          <span className="text-lg lg:text-2xl dark:text-gray-300">
            So What is
          </span>
          <span>
            <span className="text-xl lg:text-3xl">
              {" "}
              Google Developers Group{" "}
            </span>
            <span className="text-lg lg:text-2xl dark:text-gray-300"> ?</span>
          </span>
        </h1>
      </div>

      <div className="flex justify-between items-end px-4 lg:px-16 pb-8">
        <div
          className="flex flex-col gap-3 font-semibold w-full lg:max-w-3/5 instrument-sans-regular 
                    leading-9 dark:text-gray-300 text-gray-700 [&_strong]:text-black dark:[&_strong]:text_white"
        >
          <p>
            <FloatingTip>Google Developers Group (GDG)</FloatingTip> is where{" "}
            <FloatingTip>developers</FloatingTip> of all levels, interests, and
            background meet to{" "}
            <FloatingTip>
              learn new skills and share passion for technology
            </FloatingTip>
            .
          </p>
          <p>
            <FloatingTip>GDG Constantine</FloatingTip> provides opportunities to{" "}
            <FloatingTip>learn and grow,</FloatingTip> meet fellow developers
            and other people in tech, and{" "}
            <FloatingTip>
              stay in touch with the local tech community
            </FloatingTip>
            .
          </p>
          <p>
            Our mission is to provide an{" "}
            <FloatingTip>inclusive environment</FloatingTip> where everyone and
            anyone interested in tech — from beginner developers to experienced
            professionals — will get an{" "}
            <FloatingTip>opportunity for personal and growth</FloatingTip>.
          </p>
        </div>

        {/* --------------- falling imgs ------------------ */}
        <div className="hidden lg:block relative w-1/3 h-[300px]">
          {/* upper images */}
          <div className="flex items-end">
            <Image
              className="absolute left-10 transition-transform duration-1000 delay-[400ms]"
              style={{
                transform: isVisible
                  ? "translateY(0) rotate(-60deg)"
                  : "translateY(-2000px) rotate(-60deg)",
                bottom: "40px",
              }}
              src={`${STICKERS_ROOT}bar_side.png`}
              width={60}
              height={10}
              alt=""
            />
            <img
              className="w-42 h-24 absolute left-20 transition-transform duration-1000 delay-[500ms]"
              style={{
                transform: isVisible
                  ? "translateY(0) rotate(-30deg)"
                  : "translateY(-2000px) rotate(-30deg)",
                bottom: "120px",
              }}
              src={`${STICKERS_ROOT}arrow_sticker.png`}
              alt=""
            />
            <img
              className="w-28 h-32 absolute left-53 transition-transform duration-1000 delay-[600ms]"
              style={{
                transform: isVisible
                  ? "translateY(0) rotate(-80deg)"
                  : "translateY(-2000px) rotate(-80deg)",
                bottom: "60px",
              }}
              src={`${STICKERS_ROOT}bigger_then.png`}
              alt=""
            />
          </div>
          {/* lower images */}
          <div className="flex items-end">
            <Image
              className="absolute left-10 transition-transform duration-1000 delay-0"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(-2000px)",
                bottom: "0px",
              }}
              src={`${STICKERS_ROOT}three_dots.png`}
              width={230}
              height={230}
              alt={""}
            />
            <Image
              className="pb-4 absolute left-67 transition-transform duration-1000 delay-[200ms]"
              style={{
                transform: isVisible
                  ? "translateY(0) rotate(48deg)"
                  : "translateY(-2000px) rotate(48deg)",
                bottom: "4px",
              }}
              src={`${STICKERS_ROOT}hashtag.png`}
              width={100}
              height={80}
              alt={""}
            />
            <img
              className="w-12 h-12 absolute left-91 transition-transform duration-1000 delay-[300ms]"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(-2000px)",
                bottom: "0px",
              }}
              src={`${STICKERS_ROOT}dot.png`}
              alt={""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
