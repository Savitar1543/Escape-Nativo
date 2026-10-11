// Render preview stills at given master times (seconds): node scripts/stills.mjs out/stills 4.5 40 ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [outDir, ...times] = process.argv.slice(2);
fs.mkdirSync(outDir, {recursive: true});
const browserExecutable = process.env.REMOTION_BROWSER;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const composition = await selectComposition({serveUrl, id: 'GTN', browserExecutable});
for (const t of times) {
  const frame = Math.round(Number(t) * 30);
  await renderStill({composition, serveUrl, frame, output: path.join(outDir, `t${Number(t).toFixed(2).padStart(7, '0')}.jpg`), imageFormat: 'jpeg', jpegQuality: 80, browserExecutable});
  console.log('rendered', t);
}
