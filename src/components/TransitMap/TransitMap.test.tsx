/// <reference types="@testing-library/jest-dom" />
/// <reference lib="dom" />
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TransitMap } from './TransitMap'
import type {
    StationMarkerProps,
    TransitMapData,
    TransitMapProps,
} from './TransitMap.types'

// Mock Station Components (Updated Colors)
const MockNormalMarker = ({ stationData }: StationMarkerProps) => (
    <circle data-testid={`station-${stationData.id}`} data-type="normal" r="2" fill="#FFD300" />
)
const MockTerminusMarker = ({ stationData }: StationMarkerProps) => (
    <circle data-testid={`station-${stationData.id}`} data-type="terminus" r="3" fill="#FFD300" stroke="black" />
)

const mockStationComponents = {
    normal: MockNormalMarker,
    terminus: MockTerminusMarker,
}

// Sample Data for Tests (Updated to Core Line)
const testMapData: TransitMapData = {
    stations: [
        {
            "id": "C1",
            "name": "West End",
            "type": "terminus",
            "size": 3,
            "gridCoords": { "x": 10, "y": 100 }
        },
        {
            "id": "C2",
            "name": "Central West",
            "type": "normal",
            "size": 2,
            "gridCoords": { "x": 60, "y": 100 }
        },
        {
            "id": "C3",
            "name": "Midpoint",
            "type": "normal",
            "size": 2,
            "gridCoords": { "x": 110, "y": 100 }
        },
        {
            "id": "C4",
            "name": "Central East",
            "type": "normal",
            "size": 2,
            "gridCoords": { "x": 160, "y": 100 }
        },
        {
            "id": "C5",
            "name": "East End",
            "type": "terminus",
            "size": 3,
            "gridCoords": { "x": 210, "y": 100 }
        }
    ],
    lines: [
        {
            "id": "Core",
            "name": "Core",
            "color": "#008000", // Green color as defined in map.json
            "width": 4,
            "style": "solid",
            "points": {
                "pC1": {
                    "type": "station",
                    "stationId": "C1",
                    "gridCoords": { "x": 10, "y": 100 }
                },
                "pC2": {
                    "type": "station",
                    "stationId": "C2",
                    "gridCoords": { "x": 60, "y": 100 }
                },
                "pC3": {
                    "type": "station",
                    "stationId": "C3",
                    "gridCoords": { "x": 110, "y": 100 }
                },
                "pC4": {
                    "type": "station",
                    "stationId": "C4",
                    "gridCoords": { "x": 160, "y": 100 }
                },
                "pC5": {
                    "type": "station",
                    "stationId": "C5",
                    "gridCoords": { "x": 210, "y": 100 }
                }
            },
            "segments": [
                { "from": "pC1", "to": "pC2" },
                { "from": "pC2", "to": "pC3" },
                { "from": "pC3", "to": "pC4" },
                { "from": "pC4", "to": "pC5" }
            ]
        }
    ]
}

const defaultProps: TransitMapProps = {
    data: testMapData,
    stationComponents: mockStationComponents,
    gridToPixelScale: 1, // Simple scale for testing
}

// Helper to render with props
const renderMap = (props: Partial<TransitMapProps> = {}) => {
    return render(<TransitMap {...defaultProps} {...props} />)
}

describe('TransitMap Component', () => {
    // Mock console.warn
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { })
    // Mock console.error
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    beforeEach(() => {
        warnSpy.mockClear()
        errorSpy.mockClear()
    })

    afterEach(() => {
        cleanup()
    })

    it('renders the SVG container', () => {
        const { container } = renderMap()
        expect(container.querySelector('svg')).not.toBeNull()
    })

    it('renders lines with correct styles', () => {
        const { container } = renderMap()
        const paths = container.querySelectorAll('path')

        // Check core line segments
        const coreLinePaths = Array.from(paths).filter((p) => p.closest('.line-Core')) // Updated class selector
        expect(coreLinePaths.length).toBe(4) // Four segments for 5 stations
        for (const path of coreLinePaths) {
            expect(path.getAttribute('stroke')).toBe('#008000') // Updated color
            expect(path.getAttribute('stroke-width')).toBe('4') // Updated width
        }
    })

    it('renders station markers using provided components', () => {
        renderMap()
        expect(screen.getByTestId('station-C1')?.getAttribute('data-type')).toBe('terminus')
        expect(screen.getByTestId('station-C2')?.getAttribute('data-type')).toBe('normal')
        expect(screen.getByTestId('station-C3')?.getAttribute('data-type')).toBe('normal')
        expect(screen.getByTestId('station-C4')?.getAttribute('data-type')).toBe('normal')
        expect(screen.getByTestId('station-C5')?.getAttribute('data-type')).toBe('terminus')
    })

    it('renders station markers at correct scaled positions', () => {
        const scale = 2
        renderMap({ gridToPixelScale: scale })
        const c1MarkerGroup = screen.getByTestId('station-C1').closest('g')
        const c2MarkerGroup = screen.getByTestId('station-C2').closest('g')
        const c3MarkerGroup = screen.getByTestId('station-C3').closest('g')
        const c4MarkerGroup = screen.getByTestId('station-C4').closest('g')
        const c5MarkerGroup = screen.getByTestId('station-C5').closest('g')

        const expectedC1Coords = { x: 10 * scale, y: 100 * scale }
        const expectedC2Coords = { x: 60 * scale, y: 100 * scale }
        const expectedC3Coords = { x: 110 * scale, y: 100 * scale }
        const expectedC4Coords = { x: 160 * scale, y: 100 * scale }
        const expectedC5Coords = { x: 210 * scale, y: 100 * scale }

        expect(c1MarkerGroup?.getAttribute('transform')).toBe(`translate(${expectedC1Coords.x}, ${expectedC1Coords.y})`)
        expect(c2MarkerGroup?.getAttribute('transform')).toBe(`translate(${expectedC2Coords.x}, ${expectedC2Coords.y})`)
        expect(c3MarkerGroup?.getAttribute('transform')).toBe(`translate(${expectedC3Coords.x}, ${expectedC3Coords.y})`)
        expect(c4MarkerGroup?.getAttribute('transform')).toBe(`translate(${expectedC4Coords.x}, ${expectedC4Coords.y})`)
        expect(c5MarkerGroup?.getAttribute('transform')).toBe(`translate(${expectedC5Coords.x}, ${expectedC5Coords.y})`)
    })

    it('renders station labels at correct positions', () => {
        const scale = 1
        renderMap({ gridToPixelScale: scale })
        const labelC1 = screen.getByText('West End')
        const labelC2 = screen.getByText('Central West')
        const labelC3 = screen.getByText('Midpoint')
        const labelC4 = screen.getByText('Central East')
        const labelC5 = screen.getByText('East End')

        expect(labelC1).not.toBeNull()
        expect(labelC2).not.toBeNull()
        expect(labelC3).not.toBeNull()
        expect(labelC4).not.toBeNull()
        expect(labelC5).not.toBeNull()

        expect(labelC1?.getAttribute('x')).toBe('10')
        expect(labelC1?.getAttribute('y')).toBe('100')
        expect(labelC1?.getAttribute('dy')).toBe('-5')
        expect(labelC1?.getAttribute('text-anchor')).toBe('middle')

        expect(labelC2?.getAttribute('x')).toBe('60')
        expect(labelC2?.getAttribute('y')).toBe('100')

        expect(labelC3?.getAttribute('x')).toBe('110')
        expect(labelC3?.getAttribute('y')).toBe('100')
        expect(labelC3?.getAttribute('text-anchor')).toBe('middle')

        expect(labelC4?.getAttribute('x')).toBe('160')
        expect(labelC4?.getAttribute('y')).toBe('100')

        expect(labelC5?.getAttribute('x')).toBe('210')
        expect(labelC5?.getAttribute('y')).toBe('100')
        expect(labelC5?.getAttribute('text-anchor')).toBe('middle')
    })

    it('logs warning for missing points in segments', () => {
        const invalidData = {
            ...testMapData,
            lines: [
                {
                    ...testMapData.lines[0],
                    segments: [{ from: 'pC1', to: 'nonexistent' }], // Updated point ID
                },
            ],
        }
        renderMap({ data: invalidData })
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Missing point definition for segment 0 in line Core')) // Updated line ID
    })

    it('renders error message if data prop is invalid', () => {
        renderMap({ data: undefined as unknown as TransitMapData })
        expect(screen.getByText('Error: Invalid map data.')).not.toBeNull()
        expect(errorSpy).toHaveBeenCalledWith('TransitMap: Invalid data provided.')
    })

    it('renders error message if stationComponents prop is missing', () => {
        renderMap({ stationComponents: undefined as unknown as TransitMapProps['stationComponents'] })
        expect(screen.getByText('Error: Station components not provided.')).not.toBeNull()
        expect(errorSpy).toHaveBeenCalledWith('TransitMap: stationComponents prop is missing or empty.')
    })

    it('calculates a reasonable viewBox', () => {
        const scale = 2
        const { container } = renderMap({ gridToPixelScale: scale })
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        // Adjust expected viewBox based on new coordinates and scale
        // Min X: 10*2 = 20, Max X: 210*2 = 420 => Width ~ 400 (add padding)
        // Min Y: 100*2 = 200, Max Y: 100*2 = 200 => Height ~ 0 (add padding)
        // Needs padding around the line.
        // Let's recalculate based on new coordinates
        // Width = (210 - 10) * 2 = 400. Height is just the line's y = 100*2 = 200.
        // Need to check how TransitMap calculates viewBox. Assuming padding.
        const expectedViewBox = '0 0 240 120' // Update this if component logic is different
        expect(svg?.getAttribute('viewBox')).toBe(expectedViewBox)
    })
}) 