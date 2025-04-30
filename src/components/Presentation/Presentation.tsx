import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface Slide {
    type: 'markdown' | 'component' | 'transit-lines'
    content: string | React.ReactNode
    transitLines?: string[] // Array of line IDs to show/highlight
}

interface PresentationProps {
    slides: Slide[]
    className?: string
}

export function Presentation({ slides, className = '' }: PresentationProps) {
    const [currentSlide, setCurrentSlide] = React.useState(0)
    const totalSlides = slides.length

    const renderSlideContent = (slide: Slide) => {
        switch (slide.type) {
            case 'markdown':
                return (
                    <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown>{slide.content as string}</ReactMarkdown>
                    </div>
                )
            case 'component':
                return slide.content
            case 'transit-lines':
                // TODO: Implement transit line visualization
                return <div>Transit lines visualization placeholder</div>
            default:
                return null
        }
    }

    return (
        <div className={`w-full max-w-6xl mx-auto ${className}`}>
            <Carousel
                opts={{
                    loop: false,
                    skipSnaps: false,
                }}
                className="w-full"
                setApi={(api) => {
                    if (!api) return
                    api.on('select', () => setCurrentSlide(api.selectedScrollSnap()))
                }}
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={`${slide.type}-${index}`} className="p-6">
                            {renderSlideContent(slide)}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex justify-center items-center mt-4 text-sm">
                Slide {currentSlide + 1} of {totalSlides}
            </div>
        </div>
    )
} 