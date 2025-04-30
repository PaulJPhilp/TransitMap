import React, { type ReactElement } from "react";
import type { StationMarkerProps } from "../TransitMap";
import { COLORS } from "../TransitMap/colors";
import { createColorPalette } from "../TransitMap/colors.utils";

// Circle marker with border for terminus stations
export function TerminusMarker({
    stationData,
    size
}: StationMarkerProps): ReactElement {
    const [isHovered, setIsHovered] = React.useState(false);
    const radius = 1.03 * size;
    const palette = createColorPalette(COLORS.stations.TERMINUS);

    return (
        <g
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: "pointer" }}
            data-station-id={stationData.id}
        >
            <circle
                r={radius}
                fill={isHovered ? palette.light : palette.base}
                stroke={COLORS.text.PRIMARY}
                strokeWidth={1.5}
                style={{ transition: "fill 0.2s ease-in-out" }}
            />
        </g>
    );
}
