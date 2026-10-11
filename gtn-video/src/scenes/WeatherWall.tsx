import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, env, prog} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop} from '../components/Look';
import {CITY, MAP_H, MAP_W, mapProjection, WorldMapDots} from '../components/Geo';
import {DataPanel, Row, Window} from '../components/DataPanel';
import {LowerThird, SourceChip} from '../components/Broadcast';
import {Cloud, Rain, Sun} from '../components/Weather';
import {CLIP, withOff} from '../data/media';
import {ZoomThrough} from '../components/Transitions';

const FOCUS = {x: 700, y: 540};

type Cam2D = {lon: number; lat: number; z: number};
const KEYS: {t: number; cam: Cam2D; dur: number}[] = [
  {t: 141.07, cam: {lon: 70, lat: 8, z: 0.56}, dur: 0},
  {t: 146.9, cam: {lon: 172, lat: -16, z: 1.9}, dur: 1.4},
  {t: 166.3, cam: {lon: 126, lat: -6, z: 1.9}, dur: 1.6},
  {t: 190.6, cam: {lon: 32, lat: -2, z: 1.9}, dur: 1.6},
  {t: 210.95, cam: {lon: -72, lat: 4, z: 1.8}, dur: 1.6},
  {t: 216.45, cam: {lon: -74, lat: 4.7, z: 3.4}, dur: 2.0},
];

const useMapCam = () => {
  const frame = useMasterFrame();
  const proj = useMemo(() => mapProjection(), []);
  const toPx = (c: Cam2D) => {
    const p = proj([c.lon, c.lat]) as [number, number];
    return {x: p[0], y: p[1], z: c.z};
  };
  let cur = toPx(KEYS[0].cam);
  for (let i = 1; i < KEYS.length; i++) {
    const k = KEYS[i];
    const p = interpolate(frame, [f(k.t), f(k.t + k.dur)], [0, 1], {...clamp, easing: easeInOut});
    if (p <= 0) continue;
    const n = toPx(k.cam);
    // Zoom out a little mid-flight for a "fly over" arc.
    const hop = Math.sin(p * Math.PI) * 0.35 * Math.min(cur.z, n.z);
    cur = {x: cur.x + (n.x - cur.x) * p, y: cur.y + (n.y - cur.y) * p, z: cur.z + (n.z - cur.z) * p - hop};
  }
  const screen = (lon: number, lat: number) => {
    const p = proj([lon, lat]) as [number, number];
    return {x: FOCUS.x + (p[0] - cur.x) * cur.z, y: FOCUS.y + (p[1] - cur.y) * cur.z};
  };
  return {cam: cur, screen};
};

const PLACES = [
  {key: 'fiji', name: 'Fiji', region: 'Oceania', at: CITY.suva, country: 'Fiji', on: 146.9, off: 166.3},
  {key: 'timor', name: 'Timor-Leste', region: 'Asia', at: CITY.dili, country: 'Timor-Leste', on: 166.3, off: 190.6},
  {key: 'rwanda', name: 'Rwanda', region: 'Africa', at: CITY.kigali, country: 'Rwanda', on: 190.6, off: 210.95},
  {key: 'colombia', name: 'Colombia', region: 'Americas', at: CITY.bogota, country: 'Colombia', on: 210.95, off: 999},
];

const Pin: React.FC<{x: number; y: number; t: number; active: boolean; name: string; region: string; a: number}> = ({x, y, t, active, name, region, a}) => {
  const ring = (t * 0.8) % 1;
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: a}}>
      {active && (
        <div style={{position: 'absolute', left: -60 * ring - 10, top: -60 * ring - 10, width: 120 * ring + 20, height: 120 * ring + 20, borderRadius: '50%', border: `2px solid ${C.red}`, opacity: 1 - ring}} />
      )}
      <div style={{position: 'absolute', left: -9, top: -9, width: 18, height: 18, borderRadius: 9, background: C.red, border: '3px solid white', boxShadow: `0 0 20px ${C.red}`}} />
      <div style={{position: 'absolute', left: 22, top: -30, whiteSpace: 'nowrap'}}>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: active ? 34 : 24, letterSpacing: 2, color: C.white, textShadow: '0 2px 12px rgba(0,0,0,0.6)'}}>{name.toUpperCase()}</div>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: active ? 15 : 12, letterSpacing: 3, color: C.red}}>{region.toUpperCase()}</div>
      </div>
    </div>
  );
};

/** Weather glyph stack for each place, keyed to the forecast lines. */
const Glyph: React.FC<{k: string; t: number; scale: number}> = ({k, t, scale}) => {
  const frame = Math.round(t * 30);
  const pa = (s: number) => prog(frame, f(s), 16);
  const box = (children: React.ReactNode) => (
    <div style={{position: 'absolute', left: -110 * scale, top: -230 * scale, width: 220 * scale, height: 200 * scale, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{transform: `scale(${scale})`, position: 'relative', width: 220, height: 200}}>{children}</div>
    </div>
  );
  if (k === 'fiji') {
    const clear = interpolate(t, [163.65, 164.3], [1, 1.25], clamp);
    return box(<div style={{position: 'absolute', left: 30, top: 10}}><Sun size={160} t={t} a={pa(147.6)} intensity={clear} /></div>);
  }
  if (k === 'timor') {
    const cloud = pa(184.55);
    return box(
      <>
        <div style={{position: 'absolute', left: 30, top: 10}}><Sun size={160} t={t} a={pa(169.55)} /></div>
        <div style={{position: 'absolute', left: 60, top: 70, opacity: cloud}}><Cloud size={170} t={t} drift={(1 - cloud) * -80} /></div>
      </>,
    );
  }
  if (k === 'rwanda') {
    return box(<div style={{position: 'absolute', left: 30, top: 10}}><Sun size={160} t={t} a={pa(205.95)} intensity={1.2} /></div>);
  }
  const rain = pa(213.05);
  return box(
    <>
      <div style={{position: 'absolute', left: 20, top: 30, opacity: pa(211.05)}}><Cloud size={190} t={t} dark /></div>
      <div style={{position: 'absolute', left: 30, top: 150, opacity: rain}}><Rain size={160} t={t} /></div>
    </>,
  );
};

const CARDS: {key: string; kicker: string; title: string; from: number; to: number; status: {text: string; from: number; tone: Row['tone']}; rows: Row[]; footer?: {text: string; from: number; tone: Row['tone']}}[] = [
  {
    key: 'fiji',
    kicker: 'Oceania · Pacific',
    title: 'Fiji',
    from: 147.05,
    to: 166.35,
    status: {text: 'Warm & sunny', from: 147.6, tone: 'gold'},
    rows: [
      {label: 'Corporate tax', kind: 'pct', value: 25, from: 152.35},
      {label: 'VAT', kind: 'pct', value: 12.5, from: 155.2},
      {label: 'Human development', kind: 'rank', value: 111, of: 193, from: 158.05},
      {label: 'Corruption ranking', kind: 'rank', value: 49, of: 182, from: 160.7, tone: 'good'},
    ],
    footer: {text: 'Clear skies', from: 163.65, tone: 'good'},
  },
  {
    key: 'timor',
    kicker: 'Asia',
    title: 'Timor-Leste',
    from: 169.55,
    to: 190.6,
    status: {text: 'Very light taxes', from: 169.55, tone: 'good'},
    rows: [
      {label: 'Corporate tax', kind: 'pct', value: 10, from: 173.95},
      {label: 'Personal tax', kind: 'pct', value: 10, from: 175.0},
      {label: 'VAT', kind: 'text', text: 'NONE', from: 177.75, tone: 'good', note: 'Only 2.5% on imports', noteFrom: 180.45},
    ],
    footer: {text: 'A little cloudy · least developed country', from: 186.65, tone: 'bad'},
  },
  {
    key: 'rwanda',
    kicker: 'Africa',
    title: 'Rwanda',
    from: 190.65,
    to: 210.95,
    status: {text: 'Surprise forecast', from: 190.65, tone: 'gold'},
    rows: [
      {label: 'Development', kind: 'text', text: 'LEAST DEVELOPED', from: 194.85, tone: 'bad', note: 'Lowest in our study'},
      {label: 'Human development', kind: 'rank', value: 159, of: 193, from: 198.75, tone: 'bad'},
      {label: 'Corruption ranking', kind: 'rank', value: 41, of: 182, from: 202.25, tone: 'good'},
    ],
    footer: {text: 'Less corrupt than Colombia and Mexico', from: 206.85, tone: 'good'},
  },
  {
    key: 'colombia',
    kicker: 'Americas · Home',
    title: 'Colombia',
    from: 211.05,
    to: 218.2,
    status: {text: 'Cloudy', from: 211.05, tone: 'bad'},
    rows: [{label: 'Corruption ranking', kind: 'rank', value: 99, of: 182, from: 213.05, tone: 'bad', note: 'High chance of corruption'}],
  },
];

const PRESENTER = {x: 1250, y: 150, w: 600, h: 740, r: 24};
const SWITCHES = [169.27, 190.27, 210.77];

/** 141.07 – 218.37 s: the Tax Weather wall — flying map, live forecasts, presenter window. */
export const WeatherWall: React.FC = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const {cam, screen} = useMapCam();
  const flip = SWITCHES.reduce((acc, s) => {
    const d = Math.abs(frame - f(s));
    return d < 7 ? 90 * (1 - d / 7) : acc;
  }, 0);
  const winIn = prog(frame, f(141.07), 20);
  const colombiaPx = screen(CITY.bogota[0], CITY.bogota[1]);
  return (
    <ZoomThrough inAt={141.07} outAt={218.37} origin={`${(colombiaPx.x / 1920) * 100}% ${(colombiaPx.y / 1080) * 100}%`}>
      <Backdrop tone="ink" grid={false} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: MAP_W,
          height: MAP_H,
          transformOrigin: '0 0',
          transform: `translate(${FOCUS.x - cam.x * cam.z}px, ${FOCUS.y - cam.y * cam.z}px) scale(${cam.z})`,
        }}
      >
        <WorldMapDots
          highlight={PLACES.map((p) => ({name: p.country, a: env(frame, f(p.on), f(p.off), 20, 20), color: p.key === 'colombia' ? C.gold : C.red}))}
        />
      </div>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 70% at 36% 50%, rgba(0,0,0,0) 40%, rgba(2,4,16,0.75) 100%)'}} />
      {PLACES.map((p) => {
        const s = screen(p.at[0], p.at[1]);
        const active = t >= p.on && t < p.off;
        const visited = t >= p.on;
        const a = t < 146.9 ? prog(frame, f(141.5), 20) : 1;
        return (
          <React.Fragment key={p.key}>
            {visited && <div style={{position: 'absolute', left: s.x, top: s.y}}><Glyph k={p.key} t={t} scale={active ? 1 : 0.45} /></div>}
            <Pin x={s.x} y={s.y} t={t} active={active} name={p.name} region={p.region} a={a} />
          </React.Fragment>
        );
      })}
      {CARDS.map((c) => (
        <DataPanel key={c.key} kicker={c.kicker} title={c.title} from={c.from} to={c.to} x={70} y={150} width={540} status={c.status} rows={c.rows} footer={c.footer} />
      ))}
      <div style={{position: 'absolute', inset: 0, transform: `perspective(1600px) rotateY(${flip}deg)`, transformOrigin: `${PRESENTER.x + PRESENTER.w / 2}px 50%`, opacity: winIn}}>
        <Window rect={{...PRESENTER, x: PRESENTER.x + (1 - winIn) * 120}}>
          <At from={141.07} to={169.27}>
            <Cam from={{s: 1.15, x: 0, y: 4}} to={{s: 1.2, x: 0, y: 4}} t0={141.07} t1={169.27}>
              <Footage clip={CLIP.nicolasWeather} grade="phone" />
            </Cam>
          </At>
          <At from={169.27} to={190.27}>
            <Cam from={{s: 1.05, x: 0, y: 3}} to={{s: 1.1, x: 0, y: 3}} t0={169.27} t1={190.27}>
              <Footage clip={CLIP.alejandroTimor} grade="phone" position="50% 30%" />
            </Cam>
          </At>
          <At from={190.27} to={210.77}>
            <Cam from={{s: 1.05, x: 0, y: 0}} to={{s: 1.1, x: 0, y: 0}} t0={190.27} t1={210.77}>
              <Footage clip={CLIP.davidRwanda} grade="phone" />
            </Cam>
          </At>
          <At from={210.77} to={218.37}>
            <Cam from={{s: 1.15, x: 0, y: 4}} to={{s: 1.2, x: 0, y: 4}} t0={210.77} t1={218.37}>
              <Footage clip={withOff(CLIP.nicolasWeather, 172.102)} grade="phone" />
            </Cam>
          </At>
        </Window>
      </div>
      <LowerThird name="Nicolás" role="Tax weather · Analyst" from={141.6} to={146.8} x={1270} bottom={230} />
      <LowerThird name="Alejandro" role="Tax weather · Dili, Timor-Leste" from={169.7} to={175.6} x={1270} bottom={230} />
      <LowerThird name="David" role="Tax weather · Kigali, Rwanda" from={190.8} to={196.6} x={1270} bottom={230} />
      <SourceChip source="Fiji Revenue and Customs Service" from={157.6} />
      <SourceChip source="PwC · Timor-Leste Tax Law" from={183.3} />
      <SourceChip source="UNDP · Transparency International" from={205.1} />
    </ZoomThrough>
  );
};
