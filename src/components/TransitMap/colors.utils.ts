import type { HexColor } from "./colors.types";

/**
 * Converts a hex color to RGB values
 */
function hexToRgb(hex: HexColor): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        throw new Error(`Invalid hex color: ${hex}`);
    }
    return [
        Number.parseInt(result[1], 16),
        Number.parseInt(result[2], 16),
        Number.parseInt(result[3], 16),
    ];
}

/**
 * Converts RGB values to a hex color
 */
function rgbToHex(r: number, g: number, b: number): HexColor {
    const toHex = (n: number) => {
        const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}` as HexColor;
}

/**
 * Adjusts the brightness of a color by a percentage
 * @param color - The hex color to adjust
 * @param percent - Percentage to adjust by (-100 to 100)
 */
export function adjustBrightness(color: HexColor, percent: number): HexColor {
    const rgb = hexToRgb(color);
    const adjustment = percent / 100;
    const adjusted = rgb.map((value) => value * (1 + adjustment)) as [
        number,
        number,
        number,
    ];
    return rgbToHex(...adjusted);
}

/**
 * Creates a tint of a color (mixture with white)
 * @param color - The hex color to tint
 * @param percent - Percentage of white to mix in (0 to 100)
 */
export function tint(color: HexColor, percent: number): HexColor {
    const rgb = hexToRgb(color);
    const amount = percent / 100;
    const tinted = rgb.map((value) => value + (255 - value) * amount) as [
        number,
        number,
        number,
    ];
    return rgbToHex(...tinted);
}

/**
 * Creates a shade of a color (mixture with black)
 * @param color - The hex color to shade
 * @param percent - Percentage of black to mix in (0 to 100)
 */
export function shade(color: HexColor, percent: number): HexColor {
    const rgb = hexToRgb(color);
    const amount = 1 - percent / 100;
    const shaded = rgb.map((value) => value * amount) as [number, number, number];
    return rgbToHex(...shaded);
}

/**
 * Checks if a color is light or dark
 * @param color - The hex color to check
 * @returns true if the color is light, false if dark
 */
export function isLightColor(color: HexColor): boolean {
    const [r, g, b] = hexToRgb(color);
    // Using relative luminance formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}

/**
 * Gets a contrasting color (black or white) for text
 * @param backgroundColor - The background color to contrast against
 */
export function getContrastingTextColor(backgroundColor: HexColor): HexColor {
    return isLightColor(backgroundColor) ? "#000000" : "#FFFFFF";
}

/**
 * Creates a color palette with different variations of a base color
 */
export function createColorPalette(baseColor: HexColor): {
    lighter: HexColor;
    light: HexColor;
    base: HexColor;
    dark: HexColor;
    darker: HexColor;
} {
    return {
        lighter: tint(baseColor, 70),
        light: tint(baseColor, 35),
        base: baseColor,
        dark: shade(baseColor, 35),
        darker: shade(baseColor, 70),
    };
}

/**
 * Generates an accessible color pair that meets WCAG contrast requirements
 * @param backgroundColor - The background color
 * @param minimumContrast - Minimum contrast ratio (4.5 for normal text, 3 for large text)
 */
export function getAccessibleTextColor(
    backgroundColor: HexColor,
    minimumContrast = 4.5,
): HexColor {
    const [r, g, b] = hexToRgb(backgroundColor);
    const bgLuminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    // Try black and white first
    const blackContrast = (bgLuminance + 0.05) / 0.05;
    const whiteContrast = 1.05 / (bgLuminance + 0.05);

    if (blackContrast >= minimumContrast) return "#000000";
    if (whiteContrast >= minimumContrast) return "#FFFFFF";

    // If neither works, adjust the darker color until we meet the contrast ratio
    return bgLuminance > 0.5
        ? shade(backgroundColor, 90)
        : tint(backgroundColor, 90);
}
