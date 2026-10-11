import React, {useMemo} from 'react';
import {geoContains, geoDistance, geoGraticule10, geoInterpolate, geoNaturalEarth1, geoOrthographic, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import land110 from 'world-atlas/land-110m.json';
import countries110 from 'world-atlas/countries-110m.json';
import {C} from '../theme';
import {rand} from '../anim';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LAND = feature(land110 as any, (land110 as any).objects.land) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COUNTRIES = (feature(countries110 as any, (countries110 as any).objects.countries) as any).features as any[];

export const CITY = {
  bogota: [-74.08, 4.71] as [number, number],
  copenhagen: [12.57, 55.68] as [number, number],
  mexico: [-99.13, 19.43] as [number, number],
  suva: [178.44, -18.14] as [number, number],
  dili: [125.57, -8.56] as [number, number],
  kigali: [30.06, -1.94] as [number, number],
};

let DOTS: [number, number, number][] | null = null;
/** Land sample points on a lat/lon lattice (with a brightness seed), computed once. */
export const landDots = () => {
  if (DOTS) return DOTS;
  const out: [number, number, number][] = [];
  const step = 1.5;
  for (let lat = -58; lat <= 80; lat += step) {
    const lonStep = step / Math.max(0.35, Math.cos((lat * Math.PI) / 180));
    for (let lon = -180; lon < 180; lon += lonStep) {
      if (geoContains(LAND, [lon, lat])) out.push([lon, lat, rand(lon * 7.1 + lat * 13.3)]);
    }
  }
  DOTS = out;
  return out;
};

export const countryFeature = (name: string) => COUNTRIES.find((c) => c.properties?.name === name);

/** Rotating dotted globe with glowing great-circle routes out of Bogotá. */
export const Globe: React.FC<{
  size: number;
  rotate: [number, number];
  routes?: {to: [number, number]; p: number}[];
  pins?: [number, number][];
  glow?: number;
}> = ({size, rotate, routes = [], pins = [], glow = 1}) => {
  const dots = landDots();
  const r = size / 2;
  const proj = geoOrthographic().scale(r).translate([r, r]).rotate([rotate[0], rotate[1]]).clipAngle(90);
  const path = geoPath(proj);
  const center: [number, number] = [-rotate[0], -rotate[1]];
  let d = '';
  let dBright = '';
  for (const [lon, lat, b] of dots) {
    const dist = geoDistance([lon, lat], center);
    if (dist > 1.5) continue;
    const p = proj([lon, lat]);
    if (!p) continue;
    const rr = (1.3 + 0.5 * Math.cos(dist)) * (size / 900);
    const seg = `M${p[0].toFixed(1)},${p[1].toFixed(1)}m-${rr},0a${rr},${rr} 0 1,0 ${2 * rr},0a${rr},${rr} 0 1,0 -${2 * rr},0`;
    if (b > 0.86) dBright += seg;
    else d += seg;
  }
  const grat = path(geoGraticule10()) ?? '';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow: 'visible'}}>
      <defs>
        <radialGradient id="g-ocean" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#1b3a8a" />
          <stop offset="60%" stopColor="#0a1a4a" />
          <stop offset="100%" stopColor="#030817" />
        </radialGradient>
        <radialGradient id="g-atmo" cx="50%" cy="50%" r="50%">
          <stop offset="84%" stopColor="rgba(90,140,255,0)" />
          <stop offset="92%" stopColor={`rgba(90,140,255,${0.35 * glow})`} />
          <stop offset="100%" stopColor="rgba(90,140,255,0)" />
        </radialGradient>
        <filter id="g-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={size / 160} />
        </filter>
      </defs>
      <circle cx={r} cy={r} r={r * 1.12} fill="url(#g-atmo)" />
      <circle cx={r} cy={r} r={r} fill="url(#g-ocean)" />
      <path d={grat} fill="none" stroke="rgba(140,170,255,0.08)" strokeWidth={1} />
      <path d={d} fill="rgba(150,180,255,0.55)" />
      <path d={dBright} fill="#ffd27a" />
      <path d={dBright} fill="#ffb84a" filter="url(#g-blur)" opacity={0.8} />
      {routes.map((rt, i) => {
        const interp = geoInterpolate(CITY.bogota, rt.to);
        const n = 60;
        const pts: [number, number][] = [];
        for (let k = 0; k <= Math.round(n * rt.p); k++) pts.push(interp(k / n));
        if (pts.length < 2) return null;
        const line = path({type: 'LineString', coordinates: pts}) ?? '';
        const head = pts[pts.length - 1];
        const hp = geoDistance(head, center) < 1.55 ? proj(head) : null;
        return (
          <g key={i}>
            <path d={line} fill="none" stroke={C.red} strokeWidth={size / 260} strokeLinecap="round" filter="url(#g-blur)" opacity={0.9} />
            <path d={line} fill="none" stroke="#ff6b7d" strokeWidth={size / 600} strokeLinecap="round" />
            {hp && <circle cx={hp[0]} cy={hp[1]} r={size / 180} fill="white" />}
          </g>
        );
      })}
      {pins.map((pt, i) => {
        if (geoDistance(pt, center) > 1.5) return null;
        const p = proj(pt);
        if (!p) return null;
        return (
          <g key={`p${i}`}>
            <circle cx={p[0]} cy={p[1]} r={size / 70} fill="rgba(232,16,46,0.25)" />
            <circle cx={p[0]} cy={p[1]} r={size / 220} fill={C.red} stroke="white" strokeWidth={size / 700} />
          </g>
        );
      })}
      <circle cx={r} cy={r} r={r} fill="none" stroke="rgba(160,190,255,0.35)" strokeWidth={1.2} />
    </svg>
  );
};

/** Flat world map (Natural Earth) used as the Tax Weather wall. Returns projector too. */
export const MAP_W = 2400;
export const MAP_H = 1250;
export const mapProjection = () =>
  geoNaturalEarth1()
    .rotate([-48, 0])
    .scale(470)
    .translate([MAP_W / 2, MAP_H / 2 + 60]);

let MAP_D: {dim: string; bright: string} | null = null;
const mapDots = () => {
  if (MAP_D) return MAP_D;
  const proj = mapProjection();
  let dim = '';
  let bright = '';
  for (const [lon, lat, b] of landDots()) {
    const p = proj([lon, lat]);
    if (!p) continue;
    const rr = 2.6;
    const seg = `M${p[0].toFixed(1)},${p[1].toFixed(1)}m-${rr},0a${rr},${rr} 0 1,0 ${2 * rr},0a${rr},${rr} 0 1,0 -${2 * rr},0`;
    if (b > 0.9) bright += seg;
    else dim += seg;
  }
  MAP_D = {dim, bright};
  return MAP_D;
};

export const WorldMapDots: React.FC<{highlight?: {name: string; a: number; color?: string}[]}> = ({highlight = []}) => {
  const {dim, bright} = mapDots();
  const proj = useMemo(() => mapProjection(), []);
  const path = geoPath(proj);
  return (
    <svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`} style={{overflow: 'visible'}}>
      <defs>
        <filter id="m-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={6} />
        </filter>
      </defs>
      <path d={path(geoGraticule10()) ?? ''} fill="none" stroke="rgba(140,170,255,0.06)" strokeWidth={1} />
      <path d={dim} fill="rgba(110,145,240,0.55)" />
      <path d={bright} fill="rgba(170,200,255,0.75)" />
      {highlight.map((h) => {
        const feat = countryFeature(h.name);
        if (!feat || h.a <= 0) return null;
        const d = path(feat) ?? '';
        const col = h.color ?? C.red;
        return (
          <g key={h.name} opacity={h.a}>
            <path d={d} fill={col} opacity={0.35} filter="url(#m-glow)" />
            <path d={d} fill={`${col}55`} stroke={col} strokeWidth={2} />
          </g>
        );
      })}
    </svg>
  );
};
