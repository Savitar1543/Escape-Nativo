import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT, f} from '../theme';
import {prog} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop, glass} from '../components/Look';
import {useRect, Window} from '../components/DataPanel';
import {LowerThird, Strap} from '../components/Broadcast';
import {CLIP} from '../data/media';
import {ZoomThrough} from '../components/Transitions';

export const FULL = {x: 0, y: 0, w: 1920, h: 1080, r: 0};
const BOX = {x: 80, y: 150, w: 1060, h: 720, r: 24};
const POS = '50% 22%';

const COUNTRIES = [
  {name: 'Denmark', region: 'Europe', tier: 'Developed', tone: C.green},
  {name: 'Mexico', region: 'Americas', tier: 'Developing', tone: C.gold},
  {name: 'Fiji', region: 'Oceania', tier: 'Developing', tone: C.gold},
  {name: 'Timor-Leste', region: 'Asia', tier: 'Least developed', tone: C.red},
  {name: 'Rwanda', region: 'Africa', tier: 'Least developed', tone: C.red},
];

const Investigation: React.FC = () => {
  const frame = useMasterFrame();
  const s = f(17.2);
  const a = prog(frame, s, 22);
  const out = prog(frame, f(28.4), 12);
  const bench = prog(frame, f(25.6), 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: 1190,
        top: 150,
        width: 650,
        padding: '30px 34px',
        ...glass(24),
        opacity: a * (1 - out),
        transform: `translateX(${(1 - a) * 80 + out * 60}px)`,
      }}
    >
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 4, color: C.red}}>THE INVESTIGATION</div>
      <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 50, color: C.white, letterSpacing: 1, marginTop: 4}}>5 COUNTRIES · 5 CONTINENTS</div>
      <div style={{marginTop: 16}}>
        {COUNTRIES.map((c, i) => {
          const r = prog(frame, f(17.6 + i * 0.35), 14);
          const tier = prog(frame, f(21.3 + i * 0.45), 14);
          return (
            <div key={c.name} style={{display: 'flex', alignItems: 'center', padding: '13px 0', borderTop: '1px solid rgba(170,190,255,0.12)', opacity: r, transform: `translateX(${(1 - r) * 30}px)`}}>
              <div style={{width: 10, height: 10, borderRadius: 5, background: c.tone, marginRight: 16, boxShadow: `0 0 12px ${c.tone}`, opacity: tier}} />
              <div style={{flex: 1, fontFamily: FONT.display, fontWeight: 500, fontSize: 32, color: C.white, letterSpacing: 1}}>{c.name.toUpperCase()}</div>
              <div style={{width: 140, fontFamily: FONT.sans, fontWeight: 500, fontSize: 18, color: C.mute, letterSpacing: 1.5}}>{c.region.toUpperCase()}</div>
              <div style={{width: 170, textAlign: 'right', fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: 1.5, color: c.tone, opacity: tier}}>{c.tier.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderRadius: 14,
          border: `1px solid ${C.gold}`,
          background: 'rgba(242,181,68,0.12)',
          opacity: bench,
          transform: `scale(${0.94 + 0.06 * bench})`,
        }}
      >
        <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 3, color: C.gold}}>COMPARED WITH</span>
        <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 38, letterSpacing: 2, color: C.white}}>COLOMBIA</span>
      </div>
    </div>
  );
};

/** 4.03 – 32.93 s: anchor open, multi-camera framing, the investigation board. */
export const Opening: React.FC = () => {
  const rect = useRect([
    {t: 4.03, rect: FULL},
    {t: 17.0, rect: BOX, dur: 0.8},
    {t: 28.6, rect: FULL, dur: 0.8},
  ]);
  return (
    <AbsoluteFill>
      <Backdrop />
      <Investigation />
      <ZoomThrough inAt={4.03}>
        <Window rect={rect}>
          <At from={4.03} to={9.1}>
            <Cam from={{s: 1, x: 0, y: 0}} to={{s: 1.08, x: 0, y: 1}} t0={4.03} t1={9.1}>
              <Footage clip={CLIP.miguelOpen} position={POS} />
            </Cam>
          </At>
          <At from={9.1} to={17.0}>
            <Cam from={{s: 1.34, x: 0, y: 7}} to={{s: 1.4, x: -1, y: 7}} t0={9.1} t1={17.0}>
              <Footage clip={CLIP.miguelOpen} position={POS} />
            </Cam>
          </At>
          <At from={17.0} to={28.8}>
            <Cam from={{s: 1.05, x: 0, y: 1}} to={{s: 1.12, x: 0, y: 2}} t0={17.0} t1={28.8}>
              <Footage clip={CLIP.miguelOpen} position={POS} />
            </Cam>
          </At>
          <At from={28.8} to={32.93}>
            <Cam from={{s: 1.16, x: 0, y: 3}} to={{s: 1.22, x: 0, y: 3}} t0={28.8} t1={32.93}>
              <Footage clip={CLIP.miguelOpen} position={POS} />
            </Cam>
          </At>
        </Window>
      </ZoomThrough>
      <LowerThird name="Miguel Reyes" role="Anchor · Global Tax News" from={4.7} to={10.6} />
      <Strap kicker="Tonight" text="The development mystery" from={11.4} to={16.8} />
      <Strap kicker="Live" text="Copenhagen, Denmark" from={29.0} to={32.9} />
    </AbsoluteFill>
  );
};
