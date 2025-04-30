// Basic geometry
export interface GridPoint {
    x: number
    y: number
}

// Station definition in the data
export interface StationData {
    id: string
    name: string // Max 64 chars
    type: string // Used as key in stationComponents prop
    size: number // 1-5
    gridCoords: GridPoint
}

// Point definition within a line (can be a station, bend, or junction)
export interface PointDefinition {
    type: 'station' | 'bend' | 'junction'
    gridCoords: GridPoint
    stationId?: string // Required if type is 'station'
}

// Segment connecting two points in a line
export interface Segment {
    from: string // Key in the line's points dictionary
    to: string // Key in the line's points dictionary
}

// Line definition in the data
export interface LineData {
    id: string
    name: string
    color: string // CSS color string
    width: number // Must be multiple of 3 if style is 'bordered'
    style: 'solid' | 'bordered'
    points: {
        [pointId: string]: PointDefinition
    }
    segments: Segment[]
}

// Overall data structure for the map
export interface TransitMapData {
    stations: StationData[]
    lines: LineData[]
}

// Props for the custom station marker components
export interface StationMarkerProps {
    stationData: StationData
    size: number
    pixelCoords: GridPoint // Calculated pixel coordinates
    isHighlighted?: boolean
    onClick?: (station: StationData) => void
    onHover?: (station: StationData | null) => void
}

// Props for the main TransitMap component
export interface TransitMapProps {
    data: TransitMapData
    stationComponents?: Record<string, React.ComponentType<StationMarkerProps>>
    gridToPixelScale?: number
    onStationClick?: (station: StationData) => void
    onLineClick?: (line: LineData) => void
    onStationHover?: (station: StationData | null) => void
    onLineHover?: (line: LineData | null) => void
} 