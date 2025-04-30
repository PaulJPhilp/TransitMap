import type React from "react";
import type { StationMarkerProps } from "../TransitMap.types";
import { BaseStation } from "./BaseStation";
import { InterchangeStation } from "./InterchangeStation";
import { TerminusStation } from "./TerminusStation";

// Default mapping of station types to components
export const defaultStationComponents = {
    normal: BaseStation,
    interchange: InterchangeStation,
    terminus: TerminusStation,
} as const satisfies Record<string, React.ComponentType<StationMarkerProps>>;

export { BaseStation, InterchangeStation, TerminusStation };
