import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeOut, prog} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop, glass} from '../components/Look';
import {Window} from '../components/DataPanel';
import {SourceChip} from '../components/Broadcast';
import {CLIP, withOff} from '../data/media';
import {Whip} from '../components/Transitions';

const ROWS = [
  {c: 'Denmark', corp: 22, pers: 60.5, vat: 25, hdi: 4, cpi: 1},
  {c: 'Mexico', corp: 30, pers: 35, vat: 16, hdi: 81, cpi: 141},
  {c: 'Fiji', corp: 25, pers: 39, vat: 12.5, hdi: 111, cpi: 49},
  {c: 'Timor-Leste', corp: 10, pers: 10, vat: 2.5, hdi: 142, cpi: 73},
  {c: 'Rwanda', corp: 28, pers: 30, vat: 18, hdi: 159, cpi: 41},
  {c: 'Colombia', corp: 35, pers: 39, vat: 19, hdi: 83, cpi: 99},
];
const COLS = [
  {k: 'corp', label: 'Corporate', w: 190, max: 65},
  {k: 'pers', label: 'Personal (top)', w: 210, max: 65},
  {k: 'vat', label: 'VAT', w: 170, max: 65},
  {k: 'hdi', label: 'HDI rank', w: 170, of: 193},
  {k: 'cpi', label: 'Corruption rank', w: 210, of: 182},
] as const;
const X0 = 96;
const Y0 = 270;
const RH = 80;
const NAME_W = 280;

const Insight: React.FC<{from: number; y: number; k: string; v: string; sub: string}> = ({from, y, k, v, sub}) => {
  const frame = useMasterFrame();
  const a = prog(frame, f(from), 18);
  if (a <= 0) return null;
  return (
    <div style={{position: 'absolute', left: 1440, top: y, width: 400, padding: '18px 24px', ...glass(18), border: `1px solid ${C.gold}88`, opacity: a, transform: `translateX(${(1 - a) * 40}px)`}}>
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 15, letterSpacing: 3, color: C.gold}}>{k}</div>
      <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 64, color: C.white, lineHeight: 1.05}}>{v}</div>
      <div style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: 18, color: C.mute}}>{sub}</div>
    </div>
  );
};

/** 242.07 – 254.97 s: the evidence table, rebuilt as an animated data grid. */
export const Table: React.FC = () => {
  const frame = useMasterFrame();
  const t0 = f(242.07);
  const head = prog(frame, t0, 18);
  const hdiFocus = interpolate(frame, [f(247.45), f(247.9), f(252.2), f(252.5)], [0, 1, 1, 0], clamp);
  const cpiFocus = prog(frame, f(252.45), 14);
  const colX = (i: number) => X0 + NAME_W + COLS.slice(0, i).reduce((a, c) => a + c.w, 0);
  const tableW = NAME_W + COLS.reduce((a, c) => a + c.w, 0);
  return (
    <Whip inAt={242.07} outAt={254.97}>
      <Backdrop />
      <div style={{position: 'absolute', left: X0, top: 120, opacity: head, transform: `translateY(${(1 - head) * 20}px)`}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: 5, color: C.red}}>THE EVIDENCE · SIX COUNTRIES</div>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 64, color: C.white, letterSpacing: 1.5}}>TAXES, DEVELOPMENT AND CORRUPTION</div>
      </div>
      {/* column focus */}
      {[{i: 3, a: hdiFocus}, {i: 4, a: cpiFocus}].map(({i, a}) =>
        a > 0 ? (
          <div key={i} style={{position: 'absolute', left: colX(i) - 6, top: Y0 - 8, width: COLS[i].w, height: RH * 7 + 16, borderRadius: 14, background: `rgba(242,181,68,${0.1 * a})`, border: `1px solid rgba(242,181,68,${0.6 * a})`}} />
        ) : null,
      )}
      {/* header */}
      <div style={{position: 'absolute', left: X0, top: Y0, width: tableW, height: RH - 20, display: 'flex', alignItems: 'center', borderBottom: `2px solid ${C.red}`, opacity: head}}>
        <div style={{width: NAME_W, fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 3, color: C.mute}}>COUNTRY</div>
        {COLS.map((c) => (
          <div key={c.k} style={{width: c.w, fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 2.5, color: C.mute}}>{c.label.toUpperCase()}</div>
        ))}
      </div>
      {ROWS.map((r, ri) => {
        const rs = t0 + f(0.35 + ri * 0.14);
        const a = prog(frame, rs, 16);
        const count = interpolate(frame, [rs + 3, rs + 28], [0, 1], {...clamp, easing: easeOut});
        const isCol = r.c === 'Colombia';
        const glow = isCol ? prog(frame, f(243.6), 20) : 0;
        const y = Y0 + RH - 12 + ri * RH;
        return (
          <div key={r.c} style={{position: 'absolute', left: X0, top: y, width: tableW, height: RH - 10, display: 'flex', alignItems: 'center', opacity: a, transform: `translateX(${(1 - a) * -40}px)`}}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 12,
                background: isCol ? `rgba(242,181,68,${0.16 * glow})` : ri % 2 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
                border: isCol ? `1px solid rgba(242,181,68,${0.7 * glow})` : '1px solid transparent',
                boxShadow: isCol ? `0 0 ${40 * glow}px rgba(242,181,68,0.25)` : undefined,
              }}
            />
            <div style={{position: 'relative', width: NAME_W, paddingLeft: 22, fontFamily: FONT.display, fontWeight: 600, fontSize: 36, letterSpacing: 1, color: isCol ? C.gold : C.white}}>{r.c.toUpperCase()}</div>
            {COLS.map((c, ci) => {
              const v = r[c.k];
              const isRank = 'of' in c;
              const focused = isCol && ((ci === 3 && hdiFocus > 0) || (ci === 4 && cpiFocus > 0));
              const pulse = focused ? 1 + 0.12 * (ci === 3 ? hdiFocus : cpiFocus) : 1;
              const shown = isRank ? Math.max(1, Math.round(v * count)) : (v * count).toFixed(v % 1 ? 1 : 0);
              return (
                <div key={c.k} style={{position: 'relative', width: c.w, paddingRight: 24}}>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontWeight: 500,
                      fontSize: 38,
                      color: focused ? C.gold : isCol ? C.white : 'rgba(240,244,255,0.92)',
                      transform: `scale(${pulse})`,
                      transformOrigin: 'left center',
                    }}
                  >
                    {isRank ? `#${shown}` : `${shown}%`}
                  </div>
                  {!isRank && (
                    <div style={{height: 4, borderRadius: 2, marginTop: 4, background: 'rgba(255,255,255,0.08)'}}>
                      <div style={{height: '100%', borderRadius: 2, width: `${(v / (c as {max: number}).max) * 100 * count}%`, background: isCol ? C.gold : '#6F93FF'}} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      <div style={{position: 'absolute', left: X0, top: Y0 + RH * 7 + 4, width: tableW, fontFamily: FONT.sans, fontSize: 17, lineHeight: 1.5, color: 'rgba(220,228,255,0.55)', opacity: prog(frame, t0 + 30, 20)}}>
        HDI: rank of 193 countries (UNDP 2025). Corruption: rank of 182 (Transparency International 2025), 1 = least corrupt. Top statutory rates, 2026.
      </div>
      <Window rect={{x: 1440, y: 270, w: 400, h: 240, r: 18}} label="NICOLÁS · ANALYST" labelTone="navy">
        <At from={242.07} to={254.97}>
          <Cam from={{s: 1.1, x: 0, y: 2}} t0={242.07} t1={254.97}>
            <Footage clip={withOff(CLIP.nicolasColombia, 209.845)} grade="phoneWarm" />
          </Cam>
        </At>
      </Window>
      <Insight from={247.45} y={540} k="COLOMBIA · HUMAN DEVELOPMENT" v="#83" sub="of 193 countries" />
      <Insight from={252.45} y={720} k="COLOMBIA · CORRUPTION" v="#99" sub="of 182 countries" />
      <SourceChip source="UNDP · Transparency International" from={252.5} />
    </Whip>
  );
};
