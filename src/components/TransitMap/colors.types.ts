// Hex color string type
export type HexColor = `#${string}`

// Corporate colors type
export type TflCorporateColors = {
    readonly CORE_BLUE: HexColor
    readonly CORE_RED: HexColor
    readonly CORE_WHITE: HexColor
    readonly CORE_BLACK: HexColor
    readonly SAFETY_BLUE: HexColor
    readonly SAFETY_RED: HexColor
    readonly SAFETY_GREEN: HexColor
    readonly SAFETY_WHITE: HexColor
}

// Tube line colors type
export type TubeLineColors = {
    readonly BAKERLOO: HexColor
    readonly CENTRAL: HexColor
    readonly CIRCLE: HexColor
    readonly DISTRICT: HexColor
    readonly DLR: HexColor
    readonly ELIZABETH: HexColor
    readonly HAMMERSMITH: HexColor
    readonly JUBILEE: HexColor
    readonly METROPOLITAN: HexColor
    readonly NORTHERN: HexColor
    readonly PICCADILLY: HexColor
    readonly VICTORIA: HexColor
    readonly WATERLOO: HexColor
    readonly OVERGROUND: HexColor
}

// Accessibility colors type
export type AccessibilityColors = {
    readonly STEP_FREE: HexColor
    readonly INTERCHANGE: HexColor
    readonly OUT_OF_SERVICE: HexColor
    readonly SPECIAL_SERVICE: HexColor
}

// Text colors type
export type TextColors = {
    readonly PRIMARY: HexColor
    readonly SECONDARY: HexColor
    readonly WARNING: HexColor
    readonly DISABLED: HexColor
}

// Station marker colors type
export type StationMarkerColors = {
    readonly STANDARD: HexColor
    readonly INTERCHANGE: HexColor
    readonly TERMINUS: HexColor
    readonly OUT_OF_SERVICE: HexColor
}

// Color palette type
export interface ColorPalette {
    readonly corporate: TflCorporateColors
    readonly lines: TubeLineColors
    readonly accessibility: AccessibilityColors
    readonly text: TextColors
    readonly stations: StationMarkerColors
} 