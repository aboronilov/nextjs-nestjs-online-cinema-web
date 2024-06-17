"use client"

import { useState } from "react"

export const useSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slideIn, setSlideIn] = useState(true)

  const isNextElementExists = currentIndex + 1 < length
  const isPrevElementExists = currentIndex - 1 >= 0

  const handleArrowClick = (direction: "next" | "previous") => {
    const newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1
    setSlideIn(false)

    setTimeout(() => {
      setCurrentIndex(newIndex)
      setSlideIn(true)
    }, 300)
  }

  return {
    slideIn,
    index: currentIndex,
    isNext: isNextElementExists,
    isPrev: isPrevElementExists,
    handleClick: handleArrowClick,
  }
}
