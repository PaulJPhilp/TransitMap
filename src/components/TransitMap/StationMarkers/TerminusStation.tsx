import React from "react"
import type { StationMarkerProps } from "../TransitMap.types"
import { COLORS } from "../colors"
import { createColorPalette } from "../colors.utils"

export function TerminusStation({ stationData, size }: StationMarkerProps) {
    const [isHovered, setIsHovered] = React.useState(false)
    const radius = 4 * size
    const palette = createColorPalette(COLORS.stations.TERMINUS)
    const squareSize = radius * 1.8 // Make square slightly larger than circle would be

    return (
        <g
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
        >
            {/* Square background */}
            <rect
                x={-squareSize / 2}
                y={-squareSize / 2}
                width={squareSize}
                height={squareSize}
                fill={isHovered ? palette.light : palette.base}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1.5}
                rx={radius * 0.2} // Rounded corners
                ry={radius * 0.2}
                style={{ transition: "fill 0.2s ease-in-out" }}
            />
            {/* Inner circle */}
            <circle
                r={radius * 0.6}
                fill={isHovered ? palette.lighter : palette.light}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1}
                style={{ transition: "fill 0.2s ease-in-out" }}
            />
        </g>
    )
} 