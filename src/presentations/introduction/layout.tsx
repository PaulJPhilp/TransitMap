'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import dynamic from 'next/dynamic'
import React from 'react'
import { config } from './presentation.config'
import IntroSlide from './slides/intro/page'

// Dynamically import slides
const slides = {
    intro: IntroSlide,
    architecture: dynamic(() => import('@/presentations/introduction/slides/architecture/page')),
    demo: dynamic(() => import('@/presentations/introduction/slides/demo/page'))
}

interface PresentationLayoutProps {
    initialSlide?: number
}

export default function PresentationLayout({ initialSlide = 0 }: PresentationLayoutProps) {
    const [currentSlide, setCurrentSlide] = React.useState(initialSlide)

    return (
        <div className="min-h-screen bg-background p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">{config.title}</h1>
                {config.description && (
                    <p className="text-muted-foreground mt-2">{config.description}</p>
                )}
            </header>

            <Carousel
                opts={{
                    loop: false,
                    skipSnaps: false,
                    startIndex: initialSlide
                }}
                className="w-full max-w-6xl mx-auto"
                setApi={(api) => {
                    if (!api) return
                    api.on('select', () => setCurrentSlide(api.selectedScrollSnap()))
                }}
            >
                <CarouselContent>
                    {config.slides.map((slide) => {
                        const SlideComponent = slides[slide.id as keyof typeof slides]
                        return (
                            <CarouselItem key={slide.id} className="p-6">
                                {SlideComponent && <SlideComponent />}
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <footer className="mt-8 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                    Slide {currentSlide + 1} of {config.slides.length}
                </div>
                <div className="text-sm font-medium">
                    {config.slides[currentSlide]?.title}
                </div>
            </footer>
        </div>
    )
} 