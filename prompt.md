

```markdown
Create a React/TypeScript component called `TransitMap` that visualizes data as a transit map, inspired by the style of Harry Beck's London Underground map. The component should render using SVG for lines and allow custom React components for station markers.

**Component Props:**

* `data`: (Required) A JSON object containing the map data (detailed below).
* `stationComponents`: (Required) An object mapping station type strings (e.g., "terminus", "normal", "exchange") to React component references. Example: `{ terminus: TerminusMarkerComponent, normal: NormalMarkerComponent, exchange: ExchangeMarkerComponent }`.
* `sandwichBackgroundColor`: (Optional) A string specifying the CSS color for the background part of "sandwich" style lines. Defaults to `#F8F8F8`.
* `gridToPixelScale`: (Optional) A number defining the scaling factor between grid units and pixels. Defaults to `1`.

**Input `data` JSON Structure:**

The `data` prop object should have the following structure:

```typescript
interface GridPoint {
  x: number;
  y: number;
}

interface StationData {
  id: string;
  name: string; // Max 64 chars
  type: string; // e.g., 'terminus', 'normal', 'exchange' - used as key in stationComponents prop
  size: number; // 1-5, interpretation depends on the specific station component
  gridCoords: GridPoint; // Pre-calculated coordinates on the logical grid
}

interface PointDefinition {
  type: 'station' | 'bend' | 'junction';
  gridCoords: GridPoint; // Pre-calculated coordinates
  stationId?: string; // Required if type is 'station'
}

interface Segment {
  from: string; // Corresponds to a key in the line's points dictionary
  to: string;   // Corresponds to a key in the line's points dictionary
}

interface LineData {
  id: string;
  name: string;
  color: string; // CSS color string
  width: number; // Must be a multiple of 3 if style is 'sandwich'
  style: 'solid' | 'sandwich';
  points: { [pointId: string]: PointDefinition }; // Dictionary of all points used by this line
  segments: Segment[]; // Defines the connections between points for drawing
}

interface TransitMapData {
  stations: StationData[];
  lines: LineData[];
}
```

**Rendering Logic:**

1.  **SVG Canvas:** Create an SVG element. Its `viewBox` can initially be sized based on the range of `gridCoords` found in the data, scaled by `gridToPixelScale`. (e.g., if max grid coords are 500, 800 and scale is 1, viewBox="0 0 500 800").
2.  **Line Rendering:**
    * Iterate through `data.lines`.
    * For each line, iterate through its `segments`.
    * For each `segment`, retrieve the `gridCoords` for the `from` and `to` points from the line's `points` dictionary.
    * Draw an SVG `<path>` element representing a straight line between the `from` and `to` coordinates (scaled by `gridToPixelScale`). Use the `d` attribute with "M x1,y1 L x2,y2" format.
    * Apply styles based on the line's `style`, `color`, and `width`:
        * **`solid`**: Set `stroke` to `line.color`, `stroke-width` to `line.width * gridToPixelScale`, `fill` to `none`.
        * **`sandwich`**: Render two paths for each segment:
            * Background: `stroke` = `sandwichBackgroundColor`, `stroke-width` = `line.width * gridToPixelScale`, `fill` = `none`.
            * Foreground: `stroke` = `line.color`, `stroke-width` = `(line.width / 3) * gridToPixelScale`, `fill` = `none`. The foreground path should be rendered *on top* of the background path (ensure correct order in SVG).
3.  **Station Rendering:**
    * Iterate through `data.stations`.
    * For each station, look up the corresponding component in the `stationComponents` prop using `station.type` as the key.
    * If a component is found, instantiate it. Pass props to the station component, including at least `stationData={station}`, `size={station.size}`, and `gridCoords={station.gridCoords}` (or pixel coordinates after scaling: `pixelX = station.gridCoords.x * gridToPixelScale`, `pixelY = station.gridCoords.y * gridToPixelScale`).
    * Position the station component instance at the station's scaled `gridCoords`. Wrap the station component in an SVG `<g>` element and use a `transform="translate(pixelX, pixelY)"` attribute.
4.  **Label Rendering:**
    * Iterate through `data.stations`.
    * Render an SVG `<text>` element for each station's `name`.
    * Position the text near the station's scaled `gridCoords`. A simple perpendicular offset (e.g., slightly above or to the right) is sufficient for now. Use attributes like `x={pixelX}`, `y={pixelY}`, `dx` (e.g., 5), `dy` (e.g., -5), `text-anchor="start"` for positioning. No complex collision avoidance is needed.

**Other Requirements:**

* Use TypeScript for strong typing. Define interfaces for props and data structures.
* The component should be functional and use React hooks where appropriate.
* Ensure basic error handling (e.g., checking if a required station component exists for a given type, checking if points exist for segments). Log errors or render placeholders if possible.
* No interactivity (clicks, hovers) is required in this version.
* Stick to the Beck map aesthetic principles where appropriate (e.g., clean lines, clear station markers).

Please generate the React/TypeScript code for this `TransitMap` component.
```