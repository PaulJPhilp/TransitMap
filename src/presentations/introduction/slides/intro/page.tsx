import ReactMarkdown from 'react-markdown'

const content = `
# Welcome to Transit Lines

This presentation will cover:

- Overview of the transit line visualization system
- System architecture and components
- Live demonstration of features

Let's explore how we visualize and manage transit lines in our application.
`

export default function IntroSlide() {
    return (
        <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>

            <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-medium mb-2">Quick Start</h3>
                <ul className="list-disc list-inside">
                    <li>Navigate using arrow keys or buttons</li>
                    <li>Press &apos;F&apos; for fullscreen</li>
                    <li>Press &apos;Esc&apos; to exit fullscreen</li>
                </ul>
            </div>
        </div>
    )
} 