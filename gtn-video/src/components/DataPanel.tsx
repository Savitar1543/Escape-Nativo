import React from 'react';
import {interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, easeOut, prog} from '../anim';
import {useMasterFrame} from './Timeline';
import {glass} from './Look';

export type Row = {
  label: string;
  from: number;
  value?: number;
  kind?: 'pct' | 'rank' | 'text';
  text?: string;
  of?: number;
  max?: number;
  tone?: 'good' | 'bad' | 'gold';
  note?: string;
  noteFrom?: number;
  avg?: number;
  avgFrom?: number;
};

const toneColor = (tone?: Row['tone']) => (tone === 'good' ? C.green : tone === 'bad' ? C.red : tone === 'gold' ? C.gold : '#7FA2FF');

const fmt = (v: number, decimals: number) => v.toFixed(decimals);

const RowView: React.FC<{row: Row; frame: number; compact?: boolean}> = ({row, frame, compact}) => {
  const s = f(row.from);
  if (frame < s) return null;
  const a = prog(frame, s, 16);
  const count = interpolate(frame, [s + 2, s + 26], [0, 1], {...clamp, easing: easeOut});
  const color = toneColor(row.tone);
  const decimals = row.value !== undefined && row.value % 1 !== 0 ? 1 : 0;
  const glow = row.tone ? interpolate(frame, [s, s + 10, s + 40], [0, 1, 0.35], clamp) : 0;
  const avgP = row.avgFrom !== undefined ? prog(frame, f(row.avgFrom), 22) : 0;
  return (
    <div style={{opacity: a, transform: `translateY(${(1 - a) * 18}px)`, padding: compact ? '9px 0' : '11px 0', borderTop: '1px solid rgba(170,190,255,0.12)'}}>
      <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 600, fontSize: 19, letterSpacing: 2.2, color: C.mute, textTransform: 'uppercase'}}>{row.label}</div>
        <div style={{display: 'flex', alignItems: 'baseline', gap: 8}}>
          {row.kind === 'text' ? (
            <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 30, letterSpacing: 1, color: row.tone ? color : C.white, textShadow: `0 0 ${24 * glow}px ${color}`}}>{row.text}</span>
          ) : row.kind === 'rank' ? (
            <>
              <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 44, color: row.tone ? color : C.white, textShadow: `0 0 ${26 * glow}px ${color}`}}>
                #{Math.max(1, Math.round((row.value ?? 0) * count))}
              </span>
              {row.of && <span style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: 19, color: C.mute}}>of {row.of}</span>}
            </>
          ) : (
            <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 44, color: row.tone ? color : C.white, textShadow: `0 0 ${26 * glow}px ${color}`}}>
              {fmt((row.value ?? 0) * count, decimals)}
              <span style={{fontSize: 30, marginLeft: 2}}>%</span>
            </span>
          )}
        </div>
      </div>
      {row.kind !== 'text' && row.value !== undefined && (
        <div style={{position: 'relative', height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', marginTop: 8}}>
          {row.kind === 'rank' ? (
            <div
              style={{
                position: 'absolute',
                top: -5,
                left: `calc(${((row.value - 1) / ((row.of ?? 100) - 1)) * 100 * count}% - 8px)`,
                width: 16,
                height: 16,
                borderRadius: 8,
                background: color,
                boxShadow: `0 0 16px ${color}`,
              }}
            />
          ) : (
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 3, width: `${((row.value ?? 0) / (row.max ?? 70)) * 100 * count}%`, background: `linear-gradient(90deg, ${color}66, ${color})`, boxShadow: `0 0 14px ${color}88`}} />
          )}
          {row.avg !== undefined && avgP > 0 && (
            <div style={{position: 'absolute', top: -8, left: `${(row.avg / (row.max ?? 70)) * 100}%`, opacity: avgP}}>
              <div style={{width: 2, height: 22, background: 'white', transform: `scaleY(${avgP})`}} />
              <div style={{position: 'absolute', top: 22, left: 8, width: 120, textAlign: 'left', fontFamily: FONT.sans, fontWeight: 600, fontSize: 14, letterSpacing: 1.5, color: C.white}}>
                AVG {fmt(row.avg, 1)}%
              </div>
            </div>
          )}
        </div>
      )}
      {row.avg !== undefined && !row.note && <div style={{height: 20}} />}
      {row.note && (row.noteFrom === undefined || frame >= f(row.noteFrom)) && (
        <div style={{opacity: row.noteFrom === undefined ? 1 : prog(frame, f(row.noteFrom), 12), marginTop: row.avg !== undefined ? 36 : 10, fontFamily: FONT.sans, fontWeight: 700, fontSize: 15, letterSpacing: 2, color, textTransform: 'uppercase'}}>{row.note}</div>
      )}
    </div>
  );
};

/** Country fact sheet that fills in as the correspondent speaks. */
export const DataPanel: React.FC<{
  kicker: string;
  title: string;
  status?: {text: string; from: number; tone?: Row['tone']};
  rows: Row[];
  from: number;
  to: number;
  x?: number;
  y?: number;
  width?: number;
  footer?: {text: string; from: number; tone?: Row['tone']};
}> = ({kicker, title, status, rows, from, to, x = 1210, y = 150, width = 620, footer}) => {
  const frame = useMasterFrame();
  const s = f(from);
  const e = f(to);
  if (frame < s || frame > e) return null;
  const a = prog(frame, s, 22);
  const out = prog(frame, e - 14, 14, easeInOut);
  const statusA = status ? prog(frame, f(status.from), 14) : 0;
  const footA = footer ? prog(frame, f(footer.from), 16) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        padding: '26px 34px 22px',
        ...glass(22, 'strong'),
        opacity: a * (1 - out),
        transform: `perspective(1400px) rotateY(${(1 - a) * -18 + out * 10}deg) translateX(${(1 - a) * 80 + out * 60}px)`,
        transformOrigin: 'right center',
      }}
    >
      <div style={{position: 'absolute', left: 0, top: 26, width: 5, height: 70, background: C.red, borderRadius: '0 4px 4px 0', boxShadow: `0 0 18px ${C.red}`}} />
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 4, color: '#FF5A6E'}}>{kicker.toUpperCase()}</div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, marginBottom: 14}}>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 52, color: C.white, letterSpacing: 1.5, lineHeight: 1.05, whiteSpace: 'nowrap'}}>{title.toUpperCase()}</div>
        {status && statusA > 0 && (
          <div
            style={{
              padding: '6px 14px',
              marginLeft: 16,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              borderRadius: 999,
              border: `1px solid ${toneColor(status.tone)}`,
              color: toneColor(status.tone),
              fontFamily: FONT.sans,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: 2.5,
              opacity: statusA,
              transform: `scale(${0.8 + 0.2 * statusA})`,
            }}
          >
            {status.text.toUpperCase()}
          </div>
        )}
      </div>
      {rows.map((r) => (
        <RowView key={r.label} row={r} frame={frame} />
      ))}
      {footer && footA > 0 && (
        <div
          style={{
            marginTop: 14,
            padding: '12px 16px',
            borderRadius: 12,
            background: `${toneColor(footer.tone)}22`,
            border: `1px solid ${toneColor(footer.tone)}66`,
            fontFamily: FONT.sans,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: 1.5,
            color: C.white,
            opacity: footA,
            transform: `translateY(${(1 - footA) * 12}px)`,
            textTransform: 'uppercase',
          }}
        >
          {footer.text}
        </div>
      )}
    </div>
  );
};

/** Animated rectangle helper for windows that travel between layouts. */
export type Rect = {x: number; y: number; w: number; h: number; r?: number};
export const mixRect = (a: Rect, b: Rect, t: number): Rect => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  w: a.w + (b.w - a.w) * t,
  h: a.h + (b.h - a.h) * t,
  r: (a.r ?? 0) + ((b.r ?? 0) - (a.r ?? 0)) * t,
});

/** Rect keyframes over master time. */
export const useRect = (keys: {t: number; rect: Rect; dur?: number}[]): Rect => {
  const frame = useMasterFrame();
  let cur = keys[0].rect;
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const d = f(k.dur ?? 0.7);
    const p = interpolate(frame, [f(k.t), f(k.t) + d], [0, 1], {...clamp, easing: easeInOut});
    if (p > 0) cur = mixRect(cur, k.rect, p);
  }
  return cur;
};

/** A framed video window (rounded, bordered, labelled) at an animated rect. */
export const Window: React.FC<{
  rect: Rect;
  label?: string;
  labelTone?: 'red' | 'navy';
  children: React.ReactNode;
  border?: boolean;
  shadow?: boolean;
}> = ({rect, label, labelTone = 'red', children, border = true, shadow = true}) => (
  <div
    style={{
      position: 'absolute',
      left: rect.x,
      top: rect.y,
      width: rect.w,
      height: rect.h,
      borderRadius: rect.r ?? 0,
      overflow: 'hidden',
      boxShadow: shadow ? '0 40px 90px rgba(0,0,12,0.55)' : undefined,
      border: border && (rect.r ?? 0) > 1 ? '1px solid rgba(190,205,255,0.28)' : undefined,
    }}
  >
    {children}
    {label && (
      <div
        style={{
          position: 'absolute',
          left: 18,
          bottom: 18,
          padding: '8px 14px',
          borderRadius: 8,
          background: labelTone === 'red' ? C.red : 'rgba(6,12,36,0.85)',
          fontFamily: FONT.display,
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: 2,
          color: 'white',
        }}
      >
        {label}
      </div>
    )}
  </div>
);
