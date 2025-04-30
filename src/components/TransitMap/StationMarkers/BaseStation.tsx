import React from "react"
import type { StationMarkerProps } from "../TransitMap.types"
import { COLORS } from "../colors"
import { createColorPalette } from "../colors.utils"

export function BaseStation({ stationData, size }: StationMarkerProps) {
    const [isHovered, setIsHovered] = React.useState(false)
    const radius = 3 * size
    const palette = createColorPalette(COLORS.stations.STANDARD)

    return (
        <circle
            r={radius}
            fill={isHovered ? palette.light : palette.base}
            stroke={COLORS.text.PRIMARY}
            strokeWidth={1}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: "fill 0.2s ease-in-out",
                cursor: "pointer"
            }}
        />
    )
} 