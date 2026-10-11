import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from '../theme';
import {useMasterFrame} from './Timeline';
import {rand} from '../anim';

/** Fine animated film grain + vignette applied over the whole programme. */
export const FilmLook: React.FC = () => {
  const frame = useMasterFrame();
  const seed = Math.floor(rand(frame) * 1000);
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 46%, rgba(0,0,0,0) 55%, rgba(2,4,14,0.55) 100%)',
        }}
      />
      <svg width="100%" height="100%" style={{position: 'absolute', opacity: 0.075, mixBlendMode: 'overlay'}}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Deep navy broadcast backdrop with a perspective grid, slow light orbs and scanning sheen. */
export const Backdrop: React.FC<{tone?: 'navy' | 'ink'; grid?: boolean}> = ({tone = 'navy', grid = true}) => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const base =
    tone === 'navy'
      ? `radial-gradient(ellipse 90% 80% at 30% 20%, #16306f 0%, ${C.navy} 45%, ${C.ink} 100%)`
      : `radial-gradient(ellipse 90% 80% at 50% 30%, #0f1f4d 0%, #060c22 55%, #020410 100%)`;
  return (
    <AbsoluteFill style={{background: base, overflow: 'hidden'}}>
      {grid && (
        <AbsoluteFill style={{perspective: 900, perspectiveOrigin: '50% 30%'}}>
          <div
            style={{
              position: 'absolute',
              left: '-50%',
              width: '200%',
              top: '55%',
              height: '120%',
              transform: 'rotateX(72deg)',
              transformOrigin: '50% 0%',
              backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
              backgroundPosition: `0px ${(t * 24) % 80}px`,
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0) 70%)',
            }}
          />
        </AbsoluteFill>
      )}
      {[0, 1, 2].map((i) => {
        const x = 50 + 38 * Math.sin(t * 0.11 + i * 2.1);
        const y = 40 + 26 * Math.cos(t * 0.09 + i * 1.7);
        const col = i === 1 ? 'rgba(232,16,46,0.20)' : 'rgba(70,120,255,0.22)';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: 900,
              height: 900,
              marginLeft: -450,
              marginTop: -450,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${col} 0%, rgba(0,0,0,0) 65%)`,
              filter: 'blur(20px)',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Frosted glass panel. */
export const glass = (radius = 18, strength: 'soft' | 'strong' = 'soft'): React.CSSProperties => ({
  background:
    strength === 'strong'
      ? 'linear-gradient(160deg, rgba(22,36,86,0.86), rgba(7,13,38,0.9))'
      : 'linear-gradient(160deg, rgba(26,42,96,0.62), rgba(8,14,40,0.72))',
  backdropFilter: 'blur(22px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(22px) saturate(1.4)',
  border: '1px solid rgba(170,190,255,0.20)',
  boxShadow: '0 30px 80px rgba(0,0,10,0.45), inset 0 1px 0 rgba(255,255,255,0.10)',
  borderRadius: radius,
});
