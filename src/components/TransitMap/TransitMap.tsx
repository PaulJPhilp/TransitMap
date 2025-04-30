"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { defaultStationComponents } from "./StationMarkers";
import type {
    GridPoint,
    LineData,
    TransitMapData,
    TransitMapProps,
} from "./TransitMap.types";
import { COLORS } from "./colors";
import type { HexColor } from "./colors.types";
import { createColorPalette } from "./colors.utils";

const DEFAULT_GRID_SCALE = 1;

// CSS styles
const styles = {
    stationLabel: {
        fontSize: '9px',
        fontFamily: 'sans-serif',
        pointerEvents: 'none'
    },
    lineLabel: {
        fontSize: '10px',
        fontFamily: 'sans-serif',
        pointerEvents: 'none',
        fontWeight: 'bold'
    },
    legendLabel: {
        fontSize: '12px',
        fontFamily: 'sans-serif',
        pointerEvents: 'none'
    }
} as const;

// Helper function to calculate pixel coordinates
function getPixelCoords(gridCoords: GridPoint, scale: number): GridPoint {
    return { x: gridCoords.x * scale, y: gridCoords.y * scale };
}

// Helper to get bounds for viewBox calculation
function getMapBounds(data: TransitMapData): {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
} {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const station of data.stations) {
        minX = Math.min(minX, station.gridCoords.x);
        minY = Math.min(minY, station.gridCoords.y);
        maxX = Math.max(maxX, station.gridCoords.x);
        maxY = Math.max(maxY, station.gridCoords.y);
    }

    for (const line of data.lines) {
        for (const point of Object.values(line.points)) {
            minX = Math.min(minX, point.gridCoords.x);
            minY = Math.min(minY, point.gridCoords.y);
            maxX = Math.max(maxX, point.gridCoords.x);
            maxY = Math.max(maxY, point.gridCoords.y);
        }
    }

    // Add some padding if bounds are finite
    if (Number.isFinite(minX)) {
        return {
            minX: minX - 20,
            minY: minY - 20,
            maxX: maxX + 20,
            maxY: maxY + 20,
        };
    }
    return { minX: 0, minY: 0, maxX: 200, maxY: 200 }; // Default fallback doubled
}

export function TransitMap({
    data,
    stationComponents = defaultStationComponents,
    gridToPixelScale = DEFAULT_GRID_SCALE,
    onLineHover,
}: TransitMapProps): React.ReactElement {
    // State for hover effects
    const [hoveredLine, setHoveredLine] = useState<LineData | null>(null);

    // Hooks must be top-level
    const memoizedBounds = useMemo(() => {
        return data
            ? getMapBounds(data)
            : { minX: 0, minY: 0, maxX: 100, maxY: 100 };
    }, [data]);

    // Memoize line color palettes
    const linePalettes = useMemo(() => {
        if (!data?.lines) return new Map();
        return new Map(
            data.lines.map((line) => [
                line.id,
                createColorPalette(line.color as HexColor),
            ]),
        );
    }, [data?.lines]);

    // Prop validation AFTER hooks
    if (!data || !data.lines || !data.stations) {
        console.error("TransitMap: Invalid data provided.");
        return (
            <div style={{ color: COLORS.text.WARNING }}>Error: Invalid map data.</div>
        );
    }
    if (!stationComponents || Object.keys(stationComponents).length === 0) {
        console.error("TransitMap: stationComponents prop is missing or empty.");
        return (
            <div style={{ color: COLORS.text.WARNING }}>
                Error: Station components not provided.
            </div>
        );
    }

    // Calculate viewBox dimensions using memoized bounds AFTER validation
    const { minX, minY, maxX, maxY } = memoizedBounds;
    const width = (maxX - minX + 80) * gridToPixelScale; // Double padding
    const height = (maxY - minY + 160) * gridToPixelScale; // Double padding for legend
    const viewBox = `${(minX - 40) * gridToPixelScale} ${(minY - 40) * gridToPixelScale} ${width} ${height}`;


    const handleLineHover = (line: LineData | null) => {
        setHoveredLine(line);
        onLineHover?.(line);
    };

    return (
        <div
            className="transit-map-container"
            style={{ width: "100%", height: "100%" }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Transit Map"
            >
                <title>Transit Map Visualization</title>
                {/* Render Lines */}
                <g className="lines">
                    {data.lines.map((line) => {
                        const linePalette = linePalettes.get(line.id);
                        const isHighlighted = hoveredLine?.id === line.id;
                        const strokeWidth = line.width * gridToPixelScale;

                        return (
                            <g
                                key={line.id}
                                className={`line-${line.id}`}
                                onMouseEnter={() => handleLineHover(line)}
                                onMouseLeave={() => handleLineHover(null)}
                            >
                                {/* Line Segments */}
                                {line.segments.map((segment, index) => {
                                    const fromPoint = line.points[segment.from];
                                    const toPoint = line.points[segment.to];

                                    if (!fromPoint || !toPoint) {
                                        console.warn(
                                            `Missing point definition for segment ${index} in line ${line.id}`
                                        );
                                        return null;
                                    }

                                    const { x: x1, y: y1 } = getPixelCoords(
                                        fromPoint.gridCoords,
                                        gridToPixelScale
                                    );
                                    const { x: x2, y: y2 } = getPixelCoords(
                                        toPoint.gridCoords,
                                        gridToPixelScale
                                    );

                                    return (
                                        <path
                                            key={`${segment.from}-${segment.to}-${index}`}
                                            d={`M ${x1} ${y1} L ${x2} ${y2}`}
                                            stroke={isHighlighted ? linePalette?.light : (linePalette?.base ?? line.color)}
                                            strokeWidth={strokeWidth}
                                            fill="none"
                                            style={{ transition: "all 0.2s ease-in-out" }}
                                        />
                                    );
                                })}
                            </g>
                        );
                    })}
                </g>

                {/* Render Stations */}
                <g className="stations">
                    {data.stations.map((station) => {
                        const { x, y } = getPixelCoords(station.gridCoords, gridToPixelScale);
                        const StationComponent = stationComponents[station.type] || stationComponents.normal;

                        return (
                            <g
                                key={station.id}
                                className={`station station-${station.id}`}
                                transform={`translate(${x}, ${y})`}
                            >
                                <StationComponent
                                    stationData={station}
                                    size={station.size * gridToPixelScale}
                                    pixelCoords={{ x, y }}
                                />
                                <text
                                    x={station.id === 'F2' ? 10 : (station.id.startsWith('F') ? -10 : 0)}
                                    y={station.id.startsWith('A') ? 13.5 : -13.5}
                                    textAnchor={station.id === 'F2' ? "start" : (station.id.startsWith('F') ? "end" : "middle")}
                                    fill="black"
                                    className="station-label"
                                    style={styles.stationLabel}
                                >
                                    {station.name}
                                </text>
                            </g>
                        );
                    })}
                </g>

                {/* Legend */}
                <g className="legend" transform={`translate(${minX * gridToPixelScale}, ${(maxY + 45) * gridToPixelScale})`}>
                    {data.lines.map((line, index) => {
                        const linePalette = linePalettes.get(line.id);
                        return (
                            <g
                                key={line.id}
                                transform={`translate(${index * 100 * gridToPixelScale}, 0)`}
                            >
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="30"
                                    y2="0"
                                    stroke={linePalette?.base ?? line.color}
                                    strokeWidth={line.width * gridToPixelScale}
                                />
                                <text
                                    x="40"
                                    y="0"
                                    dy="4"
                                    style={styles.legendLabel}
                                >
                                    {line.name}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}