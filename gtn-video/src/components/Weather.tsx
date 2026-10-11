import React from 'react';
import {C} from '../theme';

/** Animated weather glyphs (t = seconds, for continuous motion). */
export const Sun: React.FC<{size: number; t: number; a?: number; intensity?: number}> = ({size, t, a = 1, intensity = 1}) => {
  const rays = 12;
  return (
    <svg width={size} height={size} viewBox="-100 -100 200 200" style={{overflow: 'visible', opacity: a, transform: `scale(${0.6 + 0.4 * a})`}}>
      <defs>
        <radialGradient id="sun-core" cx="40%" cy="38%" r="70%">
          <stop offset="0%" stopColor="#FFF4C2" />
          <stop offset="45%" stopColor={C.sun} />
          <stop offset="100%" stopColor="#FF8A1F" />
        </radialGradient>
        <radialGradient id="sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,194,61,0.55)" />
          <stop offset="100%" stopColor="rgba(255,194,61,0)" />
        </radialGradient>
      </defs>
      <circle r={95 * (0.9 + 0.1 * Math.sin(t * 2)) * intensity} fill="url(#sun-halo)" />
      <g transform={`rotate(${t * 18})`}>
        {Array.from({length: rays}).map((_, i) => {
          const len = i % 2 === 0 ? 26 : 18;
          return <rect key={i} x={-4} y={-58 - len} width={8} height={len} rx={4} fill={C.sun} transform={`rotate(${(360 / rays) * i})`} opacity={0.95} />;
        })}
      </g>
      <circle r={42} fill="url(#sun-core)" />
    </svg>
  );
};

export const Cloud: React.FC<{size: number; t: number; a?: number; dark?: boolean; drift?: number}> = ({size, t, a = 1, dark, drift = 0}) => {
  const top = dark ? '#B8C3DA' : '#FFFFFF';
  const bot = dark ? '#6E7C9C' : '#C9D4EC';
  return (
    <svg width={size} height={size * 0.66} viewBox="0 0 200 132" style={{overflow: 'visible', opacity: a, transform: `translateX(${drift + Math.sin(t * 0.8) * 4}px)`}}>
      <defs>
        <linearGradient id={`cl-${dark ? 'd' : 'l'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bot} />
        </linearGradient>
      </defs>
      <g fill={`url(#cl-${dark ? 'd' : 'l'})`} style={{filter: 'drop-shadow(0 10px 18px rgba(0,0,20,0.35))'}}>
        <circle cx={70} cy={70} r={38} />
        <circle cx={112} cy={56} r={46} />
        <circle cx={150} cy={82} r={30} />
        <rect x={36} y={78} width={140} height={44} rx={22} />
      </g>
    </svg>
  );
};

export const Rain: React.FC<{size: number; t: number; a?: number}> = ({size, t, a = 1}) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 200 120" style={{overflow: 'visible', opacity: a}}>
    {Array.from({length: 7}).map((_, i) => {
      const phase = (t * 1.6 + i * 0.37) % 1;
      const x = 40 + i * 20;
      const y = phase * 90;
      return <line key={i} x1={x} y1={y} x2={x - 8} y2={y + 22} stroke="#8FB4FF" strokeWidth={6} strokeLinecap="round" opacity={1 - phase} />;
    })}
  </svg>
);
