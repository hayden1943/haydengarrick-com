import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { loadOgFonts } from './fonts';
import { buildOgNode, OG_CANVAS } from './template';
import type { OgCardContent } from './types';

// satori's public type signature expects a React element (it types against
// `react`, which this project doesn't otherwise depend on) — the tree built
// by `buildOgNode` matches the shape satori actually reads at runtime, so
// the cast below just clears a type-only mismatch, not a real one.
type SatoriInput = Parameters<typeof satori>[0];

export async function renderOgCard(content: OgCardContent): Promise<Buffer> {
  const fonts = loadOgFonts();

  const svg = await satori(buildOgNode(content) as unknown as SatoriInput, {
    width: OG_CANVAS.width,
    height: OG_CANVAS.height,
    fonts: fonts.satoriFonts,
  });

  const resvg = new Resvg(svg, {
    font: {
      fontFiles: fonts.fontFilePaths,
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',
    },
  });

  return resvg.render().asPng();
}
