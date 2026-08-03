import type { OgCardContent } from './types';

// A minimal stand-in for a React element — satori only cares about this
// exact `{ type, props }` shape at runtime, so building the tree by hand
// avoids pulling in React as a dependency just to author JSX.
export interface SatoriNode {
  type: string;
  key: null;
  props: Record<string, unknown>;
}

function el(
  type: string,
  style: Record<string, unknown>,
  children?: SatoriNode | SatoriNode[] | string,
): SatoriNode {
  return { type, key: null, props: children === undefined ? { style } : { style, children } };
}

// Matches src/styles/global.css's `@theme` tokens (light palette — the card
// always renders on the warm-paper background regardless of the viewer's
// system theme, for consistent appearance across every social platform).
const COLOR = {
  paper: '#faf9f6',
  ink: '#1a1a18',
  subtle: '#62615c',
  faint: '#8a8983',
  line: '#ddd9d0',
  accent: '#2e6f40',
} as const;

export const OG_CANVAS = { width: 1200, height: 630 } as const;
const SAFE_MARGIN = 90;
const CONTENT_MAX_WIDTH = OG_CANVAS.width - SAFE_MARGIN * 2;

// Stepped rather than continuously fluid — satori lays out real text, so a
// handful of size tiers (picked by character count) is enough to keep a
// two-word show name and a long article title both reading as "the same
// design" without measuring text ourselves.
function pickTitleFontSize(title: string): number {
  const len = title.length;
  if (len <= 14) return 96;
  if (len <= 22) return 84;
  if (len <= 34) return 68;
  if (len <= 50) return 56;
  if (len <= 70) return 46;
  return 40;
}

function pickDescriptionFontSize(description: string): number {
  return description.length > 100 ? 25 : 28;
}

export function buildOgNode(content: OgCardContent): SatoriNode {
  const children: SatoriNode[] = [];

  if (content.eyebrow) {
    children.push(
      el(
        'div',
        {
          display: 'flex',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: COLOR.accent,
          marginBottom: 22,
        },
        content.eyebrow,
      ),
    );
  }

  const hasSecondaryContent = Boolean(content.description || content.meta);

  children.push(
    el(
      'div',
      {
        // `-webkit-box` + line-clamp is satori's supported mechanism for
        // multi-line text truncation — ellipsis is the last-resort fallback
        // for a title too long to fit even at the smallest size tier.
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: pickTitleFontSize(content.title),
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: -1.5,
        color: COLOR.ink,
        maxWidth: CONTENT_MAX_WIDTH,
        marginBottom: hasSecondaryContent ? 26 : 0,
      },
      content.title,
    ),
  );

  if (hasSecondaryContent) {
    children.push(
      el('div', {
        display: 'flex',
        width: 120,
        height: 2,
        backgroundColor: COLOR.line,
        marginBottom: 24,
      }),
    );
  }

  if (content.description) {
    children.push(
      el(
        'div',
        {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: pickDescriptionFontSize(content.description),
          lineHeight: 1.45,
          color: COLOR.subtle,
          maxWidth: 900,
          marginBottom: content.meta ? 14 : 0,
        },
        content.description,
      ),
    );
  }

  if (content.meta) {
    children.push(
      el(
        'div',
        {
          display: 'flex',
          fontSize: 22,
          color: COLOR.faint,
          letterSpacing: 0.3,
        },
        content.meta,
      ),
    );
  }

  const contentBlock = el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    children,
  );

  // Reproduces the site's own hero glow (see BaseLayout.astro) at card scale
  // — a soft radial wash, not a hard-edged blob, kept subtle enough not to
  // reduce text legibility at small preview sizes.
  const glow = el('div', {
    position: 'absolute',
    top: 0,
    left: 0,
    width: OG_CANVAS.width,
    height: 420,
    backgroundImage:
      'radial-gradient(ellipse at 50% 0%, rgba(46,111,64,0.22) 0%, rgba(46,111,64,0.09) 40%, rgba(250,249,246,0) 72%)',
  });

  const footerRow = el(
    'div',
    {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
    },
    [
      el(
        'div',
        {
          display: 'flex',
          fontSize: 24,
          color: COLOR.faint,
          letterSpacing: 0.4,
        },
        content.footer,
      ),
      el(
        'div',
        {
          display: 'flex',
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: COLOR.accent,
          alignItems: 'center',
          justifyContent: 'center',
        },
        el(
          'div',
          {
            display: 'flex',
            fontSize: 17,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: -0.5,
          },
          'HG',
        ),
      ),
    ],
  );

  return el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      width: OG_CANVAS.width,
      height: OG_CANVAS.height,
      padding: SAFE_MARGIN,
      backgroundColor: COLOR.paper,
      position: 'relative',
      fontFamily: 'Inter',
    },
    [glow, contentBlock, footerRow],
  );
}
