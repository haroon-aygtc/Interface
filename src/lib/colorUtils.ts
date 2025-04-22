/**
 * Converts a hex color string to HSL values
 * @param hex Hex color string (e.g., "#ff0000")
 * @returns Object with h, s, l values as numbers
 */
export function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255;
    g = parseInt(hex[1] + hex[1], 16) / 255;
    b = parseInt(hex[2] + hex[2], 16) / 255;
  } else {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  }

  // Find the min and max values to calculate the lightness
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  // Only calculate hue and saturation if the color isn't grayscale
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  // Round the values
  h = Math.round(h);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return { h, s, l: lPercent };
}

/**
 * Converts HSL values to a CSS HSL string format
 * @param h Hue (0-360)
 * @param s Saturation (0-100)
 * @param l Lightness (0-100)
 * @returns CSS HSL string (e.g., "0 100% 50%")
 */
export function hslToString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`;
}

/**
 * Converts a hex color to a CSS HSL string for Tailwind CSS variables
 * @param hex Hex color string (e.g., "#ff0000")
 * @returns CSS HSL string (e.g., "0 100% 50%")
 */
export function hexToHSLString(hex: string): string {
  const { h, s, l } = hexToHSL(hex);
  return hslToString(h, s, l);
}

/**
 * Generates a foreground color based on the background color
 * @param hex Background color in hex
 * @returns Foreground color in HSL string format
 */
export function generateForegroundColor(hex: string): string {
  const { h, s, l } = hexToHSL(hex);
  
  // For dark backgrounds, use a light foreground
  if (l < 50) {
    return hslToString(h, Math.max(s - 10, 0), 95);
  }
  
  // For light backgrounds, use a dark foreground
  return hslToString(h, Math.max(s - 10, 0), 10);
}
