/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { cn, getInitials } from "@/lib/utils";
import { withBasePath } from "@/lib/content";

type EntityAvatarProps = {
  name: string;
  src?: string;
  className?: string;
};

export function EntityAvatar({ name, src, className }: EntityAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const resolvedSrc = src ? withBasePath(src) : "";
  const showImage = Boolean(resolvedSrc) && !imageError;

  if (showImage) {
    return (
      <img
        src={resolvedSrc}
        alt={name}
        className={cn(
          "size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none bg-background",
          className
        )}
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "size-8 md:size-10 border rounded-full shadow ring-2 ring-border bg-muted flex-none flex items-center justify-center text-[10px] md:text-xs font-semibold tracking-tight text-muted-foreground",
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
