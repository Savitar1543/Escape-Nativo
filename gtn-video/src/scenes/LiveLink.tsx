import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, prog} from '../anim';
import {useMasterFrame} from '../components/Timeline';
import {Rect} from '../components/DataPanel';

export const LEFT_BOX: Rect = {x: 100, y: 250, w: 830, h: 560, r: 22};
export const RIGHT_BOX: Rect = {x: 990, y: 250, w: 830, h: 560, r: 22};

/** "LIVE LINK · BOGOTÁ ⇄ CITY" header with a travelling data pulse between the two boxes. */
export const LinkHeader: React.FC<{city: string; from: number; to: number}> = ({city, from, to}) => {
  const frame = useMasterFrame();
  const a = prog(frame, f(from + 0.3), 18);
  const out = prog(frame, f(to - 0.4), 10);
  const t = frame / 30;
  const v = a * (1 - out);
  if (v <= 0) return null;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <div style={{position: 'absolute', top: 150, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: 6, color: C.red}}>LIVE LINK</div>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 46, letterSpacing: 4, color: C.white, marginTop: 4}}>
          BOGOTÁ <span style={{color: C.steel, margin: '0 18px'}}>⇄</span> {city.toUpperCase()}
        </div>
      </div>
      <div style={{position: 'absolute', top: 528, left: 930, width: 60, height: 2, background: 'rgba(255,255,255,0.15)'}}>
        {[0, 1, 2].map((i) => {
          const p = (t * 1.4 + i / 3) % 1;
          return <div key={i} style={{position: 'absolute', top: -3, left: `${p * 100}%`, width: 8, height: 8, borderRadius: 4, background: C.red, boxShadow: `0 0 10px ${C.red}`, opacity: 1 - Math.abs(p - 0.5) * 1.6}} />;
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Placeholder shown in the remote box until the feed locks. */
export const Connecting: React.FC<{city: string; until: number}> = ({city, until}) => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const fade = interpolate(frame, [f(until) - 6, f(until) + 4], [1, 0], clamp);
  if (fade <= 0) return null;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, #13245a, #050a1e)', alignItems: 'center', justifyContent: 'center', opacity: fade}}>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 8, height: 60}}>
        {[0, 1, 2, 3, 4].map((i) => {
          const on = (Math.floor(t * 6) % 6) > i;
          return <div key={i} style={{width: 14, height: 14 + i * 11, borderRadius: 3, background: on ? C.white : 'rgba(255,255,255,0.18)'}} />;
        })}
      </div>
      <div style={{marginTop: 24, fontFamily: FONT.display, fontWeight: 500, fontSize: 30, letterSpacing: 5, color: C.white}}>
        CONNECTING TO {city.toUpperCase()}
        {'.'.repeat(1 + (Math.floor(t * 3) % 3))}
      </div>
    </AbsoluteFill>
  );
};
