'use client'

import {
  ExchangeMarker,
  NormalMarker,
  TerminusMarker,
} from "@/components/StationMarkers";
import { TransitMap } from "@/components/TransitMap";
import type {
  StationMarkerProps,
  TransitMapData
} from "@/components/TransitMap/TransitMap.types";
import mapData from "@/data/map.json";
import type React from "react";

// Map station types to components
const stationComponentsMap: Record<string, React.ComponentType<StationMarkerProps>> = {
  normal: NormalMarker,
  terminus: TerminusMarker,
  exchange: ExchangeMarker,
};

// Type assertion helper
function assertTransitMapData(data: unknown): TransitMapData {
  const typedData = data as TransitMapData;
  for (const line of typedData.lines) {
    line.style = line.style as 'solid' | 'bordered';
  }
  return typedData;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-transparent">
      <h1 className="text-2xl font-bold mb-4">Transit Map Visualization</h1>
      <div className="w-full max-w-4xl h-[600px] border border-gray-300 shadow-lg bg-transparent">
        <TransitMap
          data={assertTransitMapData(mapData)}
          stationComponents={stationComponentsMap}
          gridToPixelScale={2}
        />
      </div>
    </main>
  );
}
