import React from 'react';
import {AbsoluteFill, Freeze, OffthreadVideo, interpolate} from 'remotion';
import {ClipRef, mediaUrl} from '../data/media';
import {f} from '../theme';
import {clamp, easeInOut, lerp} from '../anim';
import {At, useMasterFrame, useSceneStart} from './Timeline';

export type Grade = 'studio' | 'phone' | 'phoneWarm' | 'none';

const GRADES: Record<Grade, string> = {
  studio: 'contrast(1.06) saturate(1.06) brightness(1.01)',
  phone: 'contrast(1.12) saturate(1.1) brightness(0.98)',
  phoneWarm: 'contrast(1.1) saturate(1.04) brightness(0.97) sepia(0.06)',
  none: 'none',
};

/**
 * A raw clip kept in sync with the master mix. Must sit inside an <At> whose `from`
 * is the master time where this footage starts showing.
 * `hold`: freeze on the clip frame at this master time instead of playing.
 * `clipStart`: play from this clip time (sec) instead of the synced position (for B-roll).
 */
export const Footage: React.FC<{
  clip: ClipRef;
  rate?: number;
  grade?: Grade;
  hold?: number;
  clipStart?: number;
  position?: string;
  fit?: 'cover' | 'contain';
  style?: React.CSSProperties;
  /** Freeze on the first shown frame (stills for cards). */
  still?: boolean;
}> = ({clip, rate = 1, grade = 'studio', hold, clipStart, position = '50% 50%', fit = 'cover', style, still}) => {
  const sceneStart = useSceneStart();
  // trimBefore is in source frames; playbackRate then scales time from that point.
  const trim = Math.max(0, Math.round(clipStart !== undefined ? clipStart * 30 : (sceneStart - clip.off) * 30));
  const video = (
    <OffthreadVideo
      src={mediaUrl(clip.src)}
      muted
      trimBefore={trim}
      playbackRate={rate}
      style={{width: '100%', height: '100%', objectFit: fit, objectPosition: position, filter: GRADES[grade], ...style}}
    />
  );
  if (still) {
    return (
      <AbsoluteFill>
        <Freeze frame={0}>{video}</Freeze>
      </AbsoluteFill>
    );
  }
  if (hold !== undefined) {
    const local = Math.max(0, f(hold) - f(sceneStart));
    return (
      <AbsoluteFill>
        <Freeze frame={local}>{video}</Freeze>
      </AbsoluteFill>
    );
  }
  return <AbsoluteFill>{video}</AbsoluteFill>;
};

export type Framing = {s: number; x: number; y: number};
export const WIDE: Framing = {s: 1, x: 0, y: 0};

/**
 * Virtual camera: scales/translates its content between two framings over [from, to]
 * (master seconds). x/y are percentages of the frame.
 */
export const Cam: React.FC<{
  from: Framing;
  to?: Framing;
  t0: number;
  t1: number;
  children: React.ReactNode;
  origin?: string;
}> = ({from, to = from, t0, t1, children, origin = '50% 40%'}) => {
  const frame = useMasterFrame();
  const p = interpolate(frame, [f(t0), f(t1)], [0, 1], {...clamp, easing: easeInOut});
  const s = lerp(from.s, to.s, p);
  const x = lerp(from.x, to.x, p);
  const y = lerp(from.y, to.y, p);
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `translate(${x}%, ${y}%) scale(${s})`, transformOrigin: origin}}>
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** One camera "shot" of a clip: a timed segment with its own framing move. */
export const Shot: React.FC<{
  clip: ClipRef;
  from: number;
  to: number;
  frame: Framing;
  end?: Framing;
  grade?: Grade;
  position?: string;
  origin?: string;
  children?: React.ReactNode;
}> = ({clip, from, to, frame, end, grade, position, origin, children}) => {
  return (
    <At from={from} to={to}>
      <Cam from={frame} to={end} t0={from} t1={to} origin={origin}>
        <Footage clip={clip} grade={grade} position={position} />
      </Cam>
      {children}
    </At>
  );
};
