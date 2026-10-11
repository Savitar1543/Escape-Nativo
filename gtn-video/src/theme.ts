import {continueRender, delayRender, staticFile} from 'remotion';

// Fonts are self-hosted (public/fonts, Google Fonts latin subsets, OFL) so renders work offline.
const loadLocalFont = (family: string, file: string, weights: string) => {
  if (typeof document === 'undefined') return;
  const handle = delayRender(`font ${family}`);
  const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, {weight: weights});
  face
    .load()
    .then((loaded) => {
      document.fonts.add(loaded);
      continueRender(handle);
    })
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};

loadLocalFont('GTN Oswald', 'fonts/Oswald-latin.woff2', '200 700');
loadLocalFont('GTN Inter', 'fonts/Inter-latin.woff2', '100 900');

export const FPS = 30;
export const W = 1920;
export const H = 1080;

/** Seconds on the master timeline -> frame. */
export const f = (sec: number) => Math.round(sec * FPS);

export const C = {
  ink: '#04081A',
  navy: '#0A1638',
  navy2: '#112256',
  steel: '#7F8FB8',
  line: 'rgba(160, 182, 255, 0.18)',
  red: '#E8102E',
  redDeep: '#A30A20',
  white: '#F6F8FF',
  mute: 'rgba(230, 236, 255, 0.66)',
  gold: '#F2B544',
  green: '#29C47E',
  sun: '#FFC23D',
  glass: 'rgba(10, 18, 48, 0.58)',
  glassLight: 'rgba(255, 255, 255, 0.08)',
};

export const FONT = {
  display: "'GTN Oswald', 'Oswald', sans-serif",
  sans: "'GTN Inter', 'Inter', sans-serif",
};
