import { Presentation, type Slide } from './Presentation'

const exampleSlides: Slide[] = [
    {
        type: 'markdown',
        content: `# Welcome to the Presentation
    
This is a markdown slide that supports **bold**, *italic*, and other markdown features.

- List item 1
- List item 2
- List item 3`
    },
    {
        type: 'component',
        content: (
            <div className="bg-blue-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Custom React Component</h2>
                <p>This is a custom React component slide.</p>
            </div>
        )
    },
    {
        type: 'transit-lines',
        content: '',
        transitLines: ['Core', 'Feeder'] // Example line IDs
    }
]

export function PresentationExample() {
    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <Presentation slides={exampleSlides} />
        </div>
    )
} 