"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const stickers = [
  "/stickers/arrow_sticker.png",
  "/stickers/bar_side.png",
  "/stickers/bigger_then.png",
  "/stickers/three_dots.png",
  "/stickers/dot.png",
  "/stickers/plus.png",
  "/stickers/x.png",
  "/stickers/open_quote.png",
  "/stickers/close_quote.png",
];

type StickerData = {
  src: string;
  randomX: number;
  randomY: number;
  randomScale: number;
  randomRotate: number;
  randomWiggleX: number;
  randomWiggleRotate: number;
  randomDuration: number;
};

export default function FloatingStickers() {
  const [stickerData, setStickerData] = useState<StickerData[]>([]);

  useEffect(() => {
    const data = stickers.map((src) => {
      let randomX = 0,
        randomY = 0;
      let attempts = 0;
      const maxAttempts = 70;
      let distFromCenter = 0;

      do {
        // Bias towards right side: 70% chance right (50-95%), 30% chance left (5-50%)
        const isRightSide = Math.random() > 0.4;
        if (isRightSide) {
          randomX = 50 + Math.random() * 45; // 50-95% (right half, with margin)
        } else {
          randomX = 5 + Math.random() * 45; // 5-50% (left side, with margin)
        }

        // Vertical: avoid top navbar (start from 10%) and bottom (end at 90%)
        randomY = 10 + Math.random() * 80; // 10-90% (avoiding navbar and bottom)

        // Check distance from center (50%,50%)
        distFromCenter = Math.sqrt((randomX - 50) ** 2 + (randomY - 50) ** 2);
        attempts++;
      } while (distFromCenter < 35 && attempts < maxAttempts); // Slightly smaller dead zone

      const randomScale = Math.random() * 1 + 0.5;
      const randomRotate = Math.random() * 20 - 10;
      const randomWiggleX = Math.random() * 30 - 15; // Reduced wiggle to prevent overflow
      const randomWiggleRotate = Math.random() * 10 - 5;
      const randomDuration = 8 + Math.random() * 8;

      return {
        src,
        randomX,
        randomY,
        randomScale,
        randomRotate,
        randomWiggleX,
        randomWiggleRotate,
        randomDuration,
      };
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStickerData(data);
  }, []);

  if (stickerData.length === 0) return null;

  return (
    <div className="inset-0 pointer-events-none z-0 overflow-hidden no-select-image">
      {stickerData.map((data, index) => {
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              scale: data.randomScale,
              rotate: data.randomRotate,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, data.randomWiggleX, 0],
              rotate: [
                data.randomRotate,
                data.randomRotate + data.randomWiggleRotate,
                data.randomRotate,
              ],
            }}
            transition={{
              duration: data.randomDuration,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${data.randomX}%`,
              top: `${data.randomY}%`,
              width: "60px",
              height: "60px",
              transform: "translate(-50%, -50%)", // Center the sticker on the position
            }}
          >
            <Image
              draggable="false"
              src={data.src}
              alt={`Sticker ${index + 1}`}
              width={60}
              height={60}
              className="object-contain drop-shadow-lg no-select-image"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
