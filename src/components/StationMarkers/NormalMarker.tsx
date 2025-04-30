import React, { type ReactElement } from "react";
import type { StationMarkerProps } from "../TransitMap";
import { COLORS } from "../TransitMap/colors";
import { createColorPalette } from "../TransitMap/colors.utils";

// Circle marker for normal stations
export function NormalMarker({
    stationData,
    size
}: StationMarkerProps): ReactElement {
    const [isHovered, setIsHovered] = React.useState(false);
    const radius = 1.16 * size;
    const palette = createColorPalette(COLORS.stations.STANDARD);

    return (
        <circle
            cx={0}
            cy={0}
            r={radius}
            fill={isHovered ? palette.light : palette.base}
            stroke={COLORS.text.PRIMARY}
            strokeWidth={1}
            data-station-id={stationData.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: "fill 0.2s ease-in-out",
                cursor: "pointer"
            }}
        />
    );
}
