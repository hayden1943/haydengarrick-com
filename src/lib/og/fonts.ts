import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

// Inter (SIL OFL) is bundled purely as a build-time asset for OG image
// rendering — it's the closest legally-embeddable match to the site's
// system font stack (SF Pro / Helvetica), and satori needs real font bytes
// (it can't fall back to system fonts like a browser would).
const require = createRequire(import.meta.url);
const fontsDir = require.resolve('@fontsource/inter/package.json').replace('package.json', 'files/');

const WEIGHTS = [400, 600, 700, 800] as const;
export type InterWeight = (typeof WEIGHTS)[number];

function fontFilePath(weight: InterWeight): string {
  return `${fontsDir}inter-latin-${weight}-normal.woff`;
}

export interface SatoriFontEntry {
  name: string;
  data: Buffer;
  weight: InterWeight;
  style: 'normal';
}

interface LoadedOgFonts {
  /** Passed to satori's `fonts` option for text layout/shaping. */
  satoriFonts: SatoriFontEntry[];
  /** Passed to resvg's `font.fontFiles` option for rasterization. */
  fontFilePaths: string[];
}

let cached: LoadedOgFonts | null = null;

// Both satori and resvg need the font independently (satori for layout, resvg
// for the actual raster pass) — loaded once per process and reused.
export function loadOgFonts(): LoadedOgFonts {
  if (cached) return cached;
  cached = {
    satoriFonts: WEIGHTS.map((weight) => ({
      name: 'Inter',
      data: readFileSync(fontFilePath(weight)),
      weight,
      style: 'normal',
    })),
    fontFilePaths: WEIGHTS.map(fontFilePath),
  };
  return cached;
}
