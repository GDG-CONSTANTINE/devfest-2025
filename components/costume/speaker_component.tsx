"use client";
import Speaker from "@/Models/Speakers";
import { Facebook, Github, Link2, Linkedin, Megaphone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SpeakerComponent({ speaker }: { speaker: Speaker }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const PFP_FOLDER_ROOT = "/images/pfp/";
  const ICONS_FOLDER_ROOT = "/icons/";
  const SOCIAL_MEDIA_ICON_SIZE = 22;

  const getAvailableSocials = () => {
    const socials = [];
    if (speaker.linkedin_url) socials.push({name: "linkedin", url: speaker.linkedin_url});
    if (speaker.github_url) socials.push({name: "github", url: speaker.github_url});
    if (speaker.twitter_url) socials.push({name: "twiter", url: speaker.twitter_url});
    if (speaker.facebook_url) socials.push({name: "facebook", url: speaker.facebook_url});
    return socials;
  };

  const socials = getAvailableSocials();

  return (
    <div className="p-8 flex flex-col items-center gap-4 w-full hover:-translate-y-6 transition-all duration-300">
      <div
        id="card"
        className="w-64 aspect-square 2xl:w-full lg:w-48 cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* --- Front card ---- */}
          <div
            className="absolute inset-0 rounded-full border-2 border-gray-600 dark:border-gray-300"
            style={{
              backgroundImage: `url('${PFP_FOLDER_ROOT}${speaker.pfp_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {socials.length > 0 ? (
              <a
                href={socials[0].url}
                target={"_blank"}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute w-10 h-10 rounded-full overflow-hidden bg-white bottom-5 right-0"
              >
                <Image
                  src={`${ICONS_FOLDER_ROOT}${socials[0].name || "default"}.png`}
                  alt={`${socials[0].name} icon`}
                  fill
                  className="object-cover scale-110"
                />
              </a>
            ) : (
              <div className="absolute w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-black bottom-5 right-0 items-center justify-center flex border-2 dark:border-gray-300 border-gray-600">
                <Megaphone />
              </div>
            )}
          </div>

          {/* --- Back card ---- */}
          <div
            className="absolute inset-0 rounded-full border-2 border-gray-600 dark:border-gray-300 flex items-center justify-center gap-4"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {speaker.linkedin_url && (
              <Link
                target="_blank"
                href={speaker.linkedin_url}>
                <Linkedin
                  className="hover:mb-2 hover:scale-105 duration-200 transition-all"
                  size={SOCIAL_MEDIA_ICON_SIZE}
                />
              </Link>
            )}
            {speaker.github_url && (
              <Link
                target="_blank"
                href={speaker.github_url}>
                  <Github
                    className="hover:mb-2 hover:scale-105 duration-200 transition-all"
                    size={SOCIAL_MEDIA_ICON_SIZE}
                  />
              </Link>
            )}
            {speaker.twitter_url && (
              <Link
                target="_blank"
                href={speaker.twitter_url}>
                  <X
                    className="hover:mb-2 hover:scale-105 duration-200 transition-all"
                    size={SOCIAL_MEDIA_ICON_SIZE}
                  />
              </Link>
            )}
            {speaker.facebook_url && (
              <Link
                target="_blank"
                href={speaker.facebook_url}>
                  <Facebook
                    className="hover:mb-2 hover:scale-105 duration-200 transition-all"
                    size={SOCIAL_MEDIA_ICON_SIZE}
                  />
              </Link>
            )}
            {speaker.portfolio && (
              <Link
                target="_blank"
                href={speaker.portfolio}>
                  <Link2
                    className="hover:mb-2 hover:scale-105 duration-200 transition-all"
                    size={SOCIAL_MEDIA_ICON_SIZE}
                  />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col items-center justify-center instrument-sans-regular">
        <h1 className="pr-4 text-2xl text-nowrap max-2xl:max-w-70 not-hover:truncate transition-all duration-200">{speaker.full_name}</h1>
        <p className="2xl:text-sm text-xs text-center dark:text-gray-300 text-gray-600">
          {speaker.bio}
        </p>
      </div>
    </div>
  );
}