import type {
    AccessibilityColors,
    ColorPalette,
    StationMarkerColors,
    TextColors,
    TflCorporateColors,
    TubeLineColors
} from './colors.types'

// Transport for London Corporate Colors
export const TFL_CORPORATE: TflCorporateColors = {
    CORE_BLUE: '#113B92',       // TfL Corporate Blue
    CORE_RED: '#DC241F',        // TfL Corporate Red
    CORE_WHITE: '#FFFFFF',      // TfL Corporate White
    CORE_BLACK: '#000000',      // TfL Text Black
    SAFETY_BLUE: '#0019A8',     // Safety Blue
    SAFETY_RED: '#EE3124',      // Safety Red
    SAFETY_GREEN: '#00782A',    // Safety Green
    SAFETY_WHITE: '#FFFFFF',    // Safety White
} as const

// London Underground Line Colors
export const TUBE_LINES: TubeLineColors = {
    BAKERLOO: '#B36305',        // Brown
    CENTRAL: '#E32017',         // Red
    CIRCLE: '#FFD300',          // Yellow
    DISTRICT: '#00782A',        // Green
    DLR: '#00A4A7',            // Turquoise
    ELIZABETH: '#6950A1',       // Purple
    HAMMERSMITH: '#F3A9BB',     // Pink
    JUBILEE: '#A0A5A9',         // Silver
    METROPOLITAN: '#9B0056',    // Magenta
    NORTHERN: '#000000',        // Black
    PICCADILLY: '#003688',      // Dark Blue
    VICTORIA: '#0098D4',        // Light Blue
    WATERLOO: '#95CDBA',        // Mint Green
    OVERGROUND: '#EE7C0E',      // Orange
} as const

// Accessibility Colors
export const ACCESSIBILITY: AccessibilityColors = {
    STEP_FREE: '#0019A8',       // Step-free access
    INTERCHANGE: '#0019A8',     // Interchange stations
    OUT_OF_SERVICE: '#DC241F',  // Out of service
    SPECIAL_SERVICE: '#00782A', // Special service running
} as const

// Text Colors
export const TEXT: TextColors = {
    PRIMARY: '#000000',         // Main text
    SECONDARY: '#113B92',       // Secondary information
    WARNING: '#DC241F',         // Warning text
    DISABLED: '#A0A5A9',        // Disabled text
} as const

// Station Marker Colors
export const STATION_MARKERS: StationMarkerColors = {
    STANDARD: '#FFD300',        // Standard station (now yellow)
    INTERCHANGE: '#FFD300',     // Interchange station (now yellow)
    TERMINUS: '#FFD300',        // Terminus station (now yellow)
    OUT_OF_SERVICE: '#DC241F',  // Out of service station
} as const

// Combined color palette
export const COLORS: ColorPalette = {
    corporate: TFL_CORPORATE,
    lines: TUBE_LINES,
    accessibility: ACCESSIBILITY,
    text: TEXT,
    stations: STATION_MARKERS
} as const 