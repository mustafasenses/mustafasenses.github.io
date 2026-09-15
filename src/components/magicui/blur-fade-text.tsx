"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "motion/react";
import { useMemo } from "react";

interface BlurFadeTextProps {
  text: string;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  characterDelay?: number;
  delay?: number;
  yOffset?: number;
  animateByCharacter?: boolean;
  as?: "p" | "span" | "h1" | "h2" | "h3";
}
const BlurFadeText = ({
  text,
  className,
  variant,
  duration = 0.4,
  characterDelay = 0.03,
  delay = 0,
  yOffset = 8,
  animateByCharacter = false,
  as: Tag = "p",
}: BlurFadeTextProps) => {
  const defaultVariants: Variants = {
    hidden: { y: -yOffset, opacity: 0, filter: "blur(8px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
  };
  const combinedVariants = variant || defaultVariants;
  const characters = useMemo(() => Array.from(text), [text]);

  if (animateByCharacter) {
    return (
      <Tag className={cn("flex m-0", className)}>
        {characters.map((char, i) => {
          const charVariants: Variants = {
            hidden: { y: -yOffset, opacity: 0, filter: "blur(8px)" },
            visible: { y: 0, opacity: 1, filter: "blur(0px)" },
          };
          return (
            <motion.span
              key={i}
              initial="hidden"
              animate="visible"
              variants={charVariants}
              transition={{
                duration,
                delay: delay + i * characterDelay,
                ease: "easeOut",
              }}
              className="inline-block"
              style={{ width: char.trim() === "" ? "0.2em" : "auto" }}
            >
              {char}
            </motion.span>
          );
        })}
      </Tag>
    );
  }

  return (
    <Tag className={cn("flex m-0", className)}>
      <motion.span
        key={text}
        initial="hidden"
        animate="visible"
        variants={combinedVariants}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Tag>
  );
};

export default BlurFadeText;
