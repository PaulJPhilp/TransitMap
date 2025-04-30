export interface SlideConfig {
    id: string
    path: string
    title: string
    transition?: 'slide' | 'fade' | 'none'
    description?: string
}

export interface PresentationConfig {
    title: string
    theme?: 'light' | 'dark'
    description?: string
    slides: SlideConfig[]
}

export const config: PresentationConfig = {
    title: "Introduction to Transit Lines",
    theme: "dark",
    description: "A presentation about our transit line visualization system",
    slides: [
        {
            id: "intro",
            path: "intro",
            title: "Welcome",
            transition: "fade",
            description: "Introduction to the transit line system"
        },
        {
            id: "architecture",
            path: "architecture",
            title: "System Architecture",
            transition: "slide",
            description: "Overview of the system architecture"
        },
        {
            id: "demo",
            path: "demo",
            title: "Live Demo",
            transition: "slide",
            description: "Interactive demonstration of transit lines"
        }
    ]
} 