import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeIn, easeInOut, easeOut} from '../anim';
import {useMasterFrame} from './Timeline';
import {Logo} from './Broadcast';

/**
 * Whip-pan treatment on a scene's edges: content slides & motion-blurs out before `outAt`
 * and in after `inAt` (master seconds). dir: 1 = moves left.
 */
export const Whip: React.FC<{inAt?: number; outAt?: number; dir?: 1 | -1; children: React.ReactNode; zoom?: boolean}> = ({
  inAt,
  outAt,
  dir = 1,
  children,
  zoom,
}) => {
  const frame = useMasterFrame();
  let x = 0;
  let blur = 0;
  let s = 1;
  if (inAt !== undefined) {
    const p = interpolate(frame, [f(inAt), f(inAt) + 9], [1, 0], {...clamp, easing: easeOut});
    x += p * 22 * dir;
    blur += p * 26;
    s += zoom ? p * 0.18 : 0;
  }
  if (outAt !== undefined) {
    const p = interpolate(frame, [f(outAt) - 7, f(outAt)], [0, 1], {...clamp, easing: easeIn});
    x -= p * 22 * dir;
    blur += p * 26;
    s += zoom ? p * 0.25 : 0;
  }
  if (x === 0 && blur === 0) return <AbsoluteFill>{children}</AbsoluteFill>;
  return (
    <AbsoluteFill style={{transform: `translateX(${x}%) scale(${s})`, filter: `blur(${blur}px)`}}>
      {children}
    </AbsoluteFill>
  );
};

/** Light streak + bloom flash that sells a cut. */
export const Flash: React.FC<{at: number; strength?: number}> = ({at, strength = 1}) => {
  const frame = useMasterFrame();
  const a = interpolate(frame, [f(at) - 6, f(at), f(at) + 10], [0, 1, 0], clamp) * strength;
  if (a <= 0) return null;
  const sweep = interpolate(frame, [f(at) - 6, f(at) + 10], [-40, 140], clamp);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', mixBlendMode: 'screen'}}>
      <AbsoluteFill style={{background: `rgba(160,190,255,${0.35 * a})`}} />
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          height: '140%',
          left: `${sweep}%`,
          width: '22%',
          transform: 'skewX(-18deg)',
          background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.85), rgba(255,255,255,0))',
          opacity: a,
          filter: 'blur(14px)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Branded stinger: layered diagonal panels sweep across with the GTN mark, covering the cut at `at`. */
export const GtnWipe: React.FC<{at: number; label?: string}> = ({at, label}) => {
  const frame = useMasterFrame();
  const c = f(at);
  const start = c - 14;
  const end = c + 16;
  if (frame < start || frame > end) return null;
  const layers = [
    {col: C.red, delay: 0},
    {col: '#0B1A48', delay: 3},
    {col: '#F6F8FF', delay: 5},
    {col: C.navy, delay: 6},
  ];
  const logoA = interpolate(frame, [c - 6, c - 2, c + 6, c + 12], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{pointerEvents: 'none', overflow: 'hidden'}}>
      {layers.map((l, i) => {
        const pin = interpolate(frame, [start + l.delay, c], [0, 1], {...clamp, easing: easeInOut});
        const pout = interpolate(frame, [c + l.delay * 0.6, end], [0, 1], {...clamp, easing: easeInOut});
        const x = -130 + pin * 130 + pout * 140;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '-25%',
              height: '150%',
              left: `${x}%`,
              width: i === 2 ? '6%' : '125%',
              marginLeft: i === 2 ? '-3%' : i === 0 ? '-6%' : 0,
              transform: 'skewX(-16deg)',
              background: l.col,
              boxShadow: '0 0 60px rgba(0,0,0,0.45)',
            }}
          />
        );
      })}
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: logoA}}>
        <div style={{transform: `scale(${1.3 + 0.12 * logoA})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
          <Logo size={1.6} />
          {label && <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 30, letterSpacing: 8, color: C.white}}>{label}</div>}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Signal disruption: RGB split, slice offsets and noise bars while the link is unstable. */
export const Glitch: React.FC<{amount: number; seed: number; children: React.ReactNode}> = ({amount, seed, children}) => {
  if (amount <= 0.01) return <AbsoluteFill>{children}</AbsoluteFill>;
  const r = (k: number) => {
    const x = Math.sin((seed + k) * 91.7) * 43758.5;
    return x - Math.floor(x);
  };
  const shift = (r(1) - 0.5) * 40 * amount;
  const slices = [0, 1, 2].map((k) => ({top: r(k + 3) * 90, h: 2 + r(k + 7) * 10, dx: (r(k + 11) - 0.5) * 120 * amount}));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `translateX(${shift}px)`}}>{children}</AbsoluteFill>
      <AbsoluteFill style={{mixBlendMode: 'screen', opacity: 0.55 * amount, transform: `translateX(${8 + shift * 1.5}px)`, filter: 'sepia(1) hue-rotate(-50deg) saturate(6)'}}>
        {children}
      </AbsoluteFill>
      {slices.map((s, i) => (
        <AbsoluteFill key={i} style={{clipPath: `inset(${s.top}% 0 ${Math.max(0, 100 - s.top - s.h)}% 0)`, transform: `translateX(${s.dx}px)`}}>
          {children}
        </AbsoluteFill>
      ))}
      <AbsoluteFill
        style={{
          opacity: 0.18 * amount,
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 1px, transparent 2px, transparent 4px)',
        }}
      />
    </AbsoluteFill>
  );
};

/** Zoom-through transition: scale content into the camera with blur (exit) / settle from it (entry). */
export const ZoomThrough: React.FC<{inAt?: number; outAt?: number; children: React.ReactNode; origin?: string}> = ({inAt, outAt, children, origin = '50% 50%'}) => {
  const frame = useMasterFrame();
  let s = 1;
  let blur = 0;
  let o = 1;
  if (inAt !== undefined) {
    const p = interpolate(frame, [f(inAt), f(inAt) + 14], [1, 0], {...clamp, easing: easeOut});
    s *= 1 - 0.12 * p;
    blur += 18 * p;
    o *= 1 - p * 0.8;
  }
  if (outAt !== undefined) {
    const p = interpolate(frame, [f(outAt) - 12, f(outAt)], [0, 1], {...clamp, easing: easeIn});
    s *= 1 + 1.6 * p;
    blur += 22 * p;
    o *= 1 - p * 0.6;
  }
  return (
    <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: origin, filter: blur > 0.1 ? `blur(${blur}px)` : undefined, opacity: o}}>
      {children}
    </AbsoluteFill>
  );
};
