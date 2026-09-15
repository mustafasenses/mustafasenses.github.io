"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  alt?: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  className?: string
  imgClassName?: string
}

export const PixelImage = ({
  src,
  alt = "Pixel image",
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1300,
  customGrid,
  className,
  imgClassName,
}: PixelImageProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [softenGrid, setSoftenGrid] = useState(false)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    setIsVisible(true)

    const colorTimeout = setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)

    const softenTimeout = setTimeout(
      () => {
        setSoftenGrid(true)
      },
      colorRevealDelay + pixelFadeInDuration
    )

    return () => {
      clearTimeout(colorTimeout)
      clearTimeout(softenTimeout)
    }
  }, [colorRevealDelay, pixelFadeInDuration])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      const left = col * (100 / cols)
      const top = row * (100 / rows)
      const right = (col + 1) * (100 / cols)
      const bottom = (row + 1) * (100 / rows)

      // Deterministic delay with fixed precision — avoids SSR float serialization mismatch
      const seed = Math.sin((index + 1) * 12.9898) * 43758.5453
      const delay = Math.round((seed - Math.floor(seed)) * maxAnimationDelay)

      return {
        clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div
      className={cn(
        "relative h-72 w-72 select-none md:h-96 md:w-96",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "absolute inset-0 z-[2] h-full w-full rounded-[2.5rem] object-cover transition-opacity ease-out",
          softenGrid ? "opacity-100" : "opacity-0",
          imgClassName
        )}
        style={{
          transitionDuration: `${pixelFadeInDuration}ms`,
        }}
        draggable={false}
      />

      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 z-[1] transition-all ease-out",
            softenGrid
              ? "opacity-0"
              : isVisible
                ? "opacity-100"
                : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: softenGrid ? "0ms" : `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden
            className={cn(
              "z-1 h-full w-full rounded-[2.5rem] object-cover",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale"),
              imgClassName
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
