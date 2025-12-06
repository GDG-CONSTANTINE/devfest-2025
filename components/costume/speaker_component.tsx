"use client";
import Speaker from "@/Models/Speakers";
import FlipPfpComponent from "./flip_pfp";

export default function SpeakerComponent({ speaker }: { speaker: Speaker }) {

  return (
    <div className="p-8 flex flex-col items-center gap-4 w-full hover:-translate-y-6 transition-all duration-300">
      <FlipPfpComponent speaker={speaker} />
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
