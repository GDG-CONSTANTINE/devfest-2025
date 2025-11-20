"use client";
import FloatingTip from "@/components/costume/floating_tip";
import GalleryComponent from "@/components/costume/gallery";
import { ArrowRight, GraduationCap, Lightbulb, Sprout } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const STICKERS_ROOT = "/stickers/";
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!textRef.current) return;

    const elements = textRef.current.querySelectorAll("p, span.font-bold");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.7 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
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
              Google Developer Groups{" "}
            </span>
            <span className="text-lg lg:text-2xl dark:text-gray-300"> ?</span>
          </span>
        </h1>
      </div>

      <div className="flex justify-between items-end px-4 lg:px-16 pb-8">
        <div
          ref={textRef}
          className="flex flex-col gap-3 font-semibold w-full lg:max-w-full instrument-sans-regular 
                    leading-9 dark:text-gray-300 text-gray-700 [&_strong]:text-black dark:[&_strong]:text_white"
        >
          <p className="opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <FloatingTip>Google Developers Group (GDG) Constantine</FloatingTip>{" "}
            is a community where <FloatingTip>developers</FloatingTip> of all
            levels and backgrounds meet to{" "}
            <FloatingTip>learn new skills, grow professionally,</FloatingTip>{" "}
            connect with tech enthusiasts, and{" "}
            <FloatingTip>stay engaged with the local community</FloatingTip>.
          </p>
          <p className="opacity-0 translate-y-4 transition-all duration-700 ease-out">
            Our mission is to create an{" "}
            <FloatingTip>inclusive environment</FloatingTip> offering{" "}
            <FloatingTip>
              opportunities for personal and professional development
            </FloatingTip>{" "}
            to everyone in tech—from beginners to experts.
          </p>
          <span className="text-base lg:text-lg font-bold mt-4 opacity-0 translate-y-4 transition-all duration-700 ease-out">
            What is DevFest?
          </span>
          <p className="mt-2 opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <FloatingTip>DevFest</FloatingTip> is the world's largest
            community-driven tech conference, bringing together passionate
            developers from around the globe. Hosted annually by Google
            Developer Groups, DevFest offers a unique opportunity to explore
            developer tools, learn from Google and Google Developer Experts, and
            connect with fellow developers.
          </p>
          <p className="mt-2 opacity-0 translate-y-4 transition-all duration-700 ease-out">
            Last year’s DevFest centered on Responsible AI. This theme allowed
            for exploration of the importance of developing technologies that
            enhance productivity responsibly, ensuring AI serves humanity. We're
            excited to reveal the theme for this year!
          </p>
          <p className="mt-2 opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <FloatingTip>DevFest 2025:</FloatingTip> Building Safe, Secure and
            Scalable Solutions with AI and Cloud.
          </p>
          <p className="opacity-0 translate-y-4 transition-all duration-700 ease-out">
            This year, DevFest 2025 will empower developer communities worldwide
            to architect the future. We'll focus on driving the practical
            integration of AI and Google Cloud into their solutions. Our goal is
            to equip developers with the skills to build innovative, scalable,
            and ethically sound applications, acknowledging their pivotal role
            in shaping a technology-driven future that benefits everyone.
          </p>
          <p className="mt-2 flex flex-col opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <span className="flex items-center-safe gap-2 ">
              <ArrowRight />
              <FloatingTip>Workshops</FloatingTip>
            </span>
            <span>
              {" "}
              Join us at DevFest for intensive workshops on building fast, safe
              AI applications! Get hands-on with cutting-edge tools to craft
              secure, reliable solutions using AI and Cloud.{" "}
            </span>
          </p>
          <p className="mt-2 flex flex-col opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <span className="flex items-center-safe gap-2">
              <ArrowRight />
              <FloatingTip>Talks</FloatingTip>
            </span>
            <span>
              {" "}
              Discover game-changing talks at DevFest from top experts on secure
              AI and Cloud strategies. Unlock fresh insights to scale
              innovative, ethical tech that drives real impact.{" "}
            </span>
          </p>
          <p className="mt-2 flex flex-col opacity-0 translate-y-4 transition-all duration-700 ease-out">
            <span className="flex items-center-safe gap-2">
              <ArrowRight />
              <FloatingTip>Conferences</FloatingTip>
            </span>
            <span>
              {" "}
              Network and collaborate at DevFest's dynamic conference sessions,
              blending AI and Cloud for scalable futures. Connect with global
              devs to spark ideas and build lasting partnerships.{" "}
            </span>
          </p>
        </div>

        {/* --------------- falling imgs ------------------ */}
        <div className="hidden lg:block relative w-1/3 min-h-[900px] shrink-0">
          {/* Cubes */}
          <div
            className="border-2 border-dashed dark:border-white border-gray-400 text-black dark:text-white rounded-md w-32 h-32 p-8
          absolute top-0 left-40 -translate-x-1/2
          flex flex-col gap-2 items-center righteous-regular justify-center"
          >
            <Lightbulb size={30} />
            Innovate
          </div>
          <div
            className="border-2 border-dashed dark:border-white border-gray-400 text-black dark:text-white rounded-md w-32 h-32 p-8
          absolute top-50 right-0 -translate-x-1/2
          flex flex-col gap-2 items-center righteous-regular justify-center"
          >
            <GraduationCap size={30} />
            Learn
          </div>
          <div
            className="border-2 border-dashed dark:border-white border-gray-400 text-black dark:text-white rounded-md w-32 h-32 p-8
          absolute top-100 left-50 -translate-x-1/2
          flex flex-col gap-2 items-center righteous-regular justify-center"
          >
            <Sprout size={30} />
            Grow
          </div>
          {/* upper images */}
          <div className="flex items-end">
            <Image
              className="absolute left-10 transition-transform duration-1000 delay-[400ms]"
              style={{
                transform: isVisible
                  ? "translateY(0) rotate(-60deg)"
                  : "translateY(-3000px) rotate(-60deg)",
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
                  : "translateY(-3000px) rotate(-30deg)",
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
                  : "translateY(-3000px) rotate(-80deg)",
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
                transform: isVisible ? "translateY(0)" : "translateY(-3000px)",
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
                  : "translateY(-3000px) rotate(48deg)",
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
                transform: isVisible ? "translateY(0)" : "translateY(-3000px)",
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
