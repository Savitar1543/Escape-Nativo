import {Easing, interpolate} from 'remotion';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

/** 0 -> 1 between frame `start` and `start + dur` (clamped, eased). */
export const prog = (frame: number, start: number, dur: number, ease = easeOut) =>
  interpolate(frame, [start, start + Math.max(dur, 1)], [0, 1], {...clamp, easing: ease});

/** In/out envelope: rises over `inDur` from `start`, falls over `outDur` before `end`. */
export const env = (frame: number, start: number, end: number, inDur = 12, outDur = 10) =>
  Math.min(prog(frame, start, inDur), 1 - prog(frame, end - outDur, outDur, easeInOut));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo-random in [0, 1). */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
