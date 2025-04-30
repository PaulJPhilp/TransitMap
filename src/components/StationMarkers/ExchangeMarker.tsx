import React, { type ReactElement } from "react";
import type { StationMarkerProps } from "../TransitMap";
import { COLORS } from "../TransitMap/colors";
import { createColorPalette } from "../TransitMap/colors.utils";

// Diamond marker for interchange stations
export function ExchangeMarker({
    stationData,
    size
}: StationMarkerProps): ReactElement {
    const [isHovered, setIsHovered] = React.useState(false);
    const radius = 4 * size; // Slightly larger than base station
    const innerRadius = radius * 0.7;
    const palette = createColorPalette(COLORS.stations.INTERCHANGE);

    return (
        <g
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
            data-station-id={stationData.id}
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
    );
}
