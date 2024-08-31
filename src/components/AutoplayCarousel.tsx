"use client"

import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { useInterval } from '@/hooks/useInterval'
import { type CarouselApi } from '@/components/ui/carousel'

interface AutoplayCarouselProps {
  children: React.ReactNode
  interval?: number
}

export function AutoplayCarousel({ children, interval = 5000 }: AutoplayCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useInterval(() => {
    if (api) {
      api.scrollNext()
    }
  }, interval)

  return (
    <Carousel opts={{loop:true}}  setApi={setApi} className="w-full">
      <CarouselContent>
        {children}
      </CarouselContent>
    </Carousel>
  )
}