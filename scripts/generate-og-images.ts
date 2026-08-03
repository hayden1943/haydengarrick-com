import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderOgCard } from '../src/lib/og/render';
import { ogContent } from '../src/lib/og/content';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/og');

async function main() {
  mkdirSync(outDir, { recursive: true });

  const entries = Object.values(ogContent);
  console.log(`Generating ${entries.length} OG image(s) -> public/og/`);

  for (const content of entries) {
    const png = await renderOgCard(content);
    const outPath = path.join(outDir, content.outputFile);
    writeFileSync(outPath, png);
    console.log(`  ✓ ${content.outputFile}  (${(png.byteLength / 1024).toFixed(1)} KB)  v=${content.version}`);
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error('Failed to generate OG images:');
  console.error(error);
  process.exit(1);
});
