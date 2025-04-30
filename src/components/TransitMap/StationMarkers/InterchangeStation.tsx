import React from "react"
import type { StationMarkerProps } from "../TransitMap.types"
import { COLORS } from "../colors"
import { createColorPalette } from "../colors.utils"

export function InterchangeStation({ stationData, size }: StationMarkerProps) {
    const [isHovered, setIsHovered] = React.useState(false)
    const radius = 4 * size // Slightly larger than base station
    const innerRadius = radius * 0.7
    const palette = createColorPalette(COLORS.stations.INTERCHANGE)

    return (
        <g
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
        >
            {/* Outer circle */}
            <circle
                r={radius}
                fill={isHovered ? palette.light : palette.base}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1.5}
                style={{ transition: "fill 0.2s ease-in-out" }}
            />
            {/* Inner circle */}
            <circle
                r={innerRadius}
                fill={isHovered ? palette.lighter : palette.light}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1}
                style={{ transition: "fill 0.2s ease-in-out" }}
            />
        </g>
    )
} 