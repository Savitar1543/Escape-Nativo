import React from 'react';
import {AbsoluteFill} from 'remotion';
import {At} from '../components/Timeline';
import {Cam, Footage, Framing} from '../components/Footage';
import {ClipRef} from '../data/media';
import {Whip} from '../components/Transitions';

export type ShotSpec = {from: number; to: number; a: Framing; b?: Framing};

export const MED: Framing = {s: 1.1, x: 0, y: 2};
export const CLOSE: Framing = {s: 1.38, x: 0, y: 7};
export const WIDE_F: Framing = {s: 1, x: 0, y: 0};

/** A run of camera shots cut from one continuous studio take. */
export const StudioShots: React.FC<{clip: ClipRef; shots: ShotSpec[]; position?: string; grade?: 'studio' | 'phone' | 'phoneWarm'}> = ({
  clip,
  shots,
  position = '50% 22%',
  grade = 'studio',
}) => (
  <AbsoluteFill>
    {shots.map((s) => (
      <At key={s.from} from={s.from} to={s.to}>
        <Cam from={s.a} to={s.b} t0={s.from} t1={s.to}>
          <Footage clip={clip} position={position} grade={grade} />
        </Cam>
      </At>
    ))}
  </AbsoluteFill>
);

export const StudioScene: React.FC<{
  clip: ClipRef;
  shots: ShotSpec[];
  inAt?: number;
  outAt?: number;
  children?: React.ReactNode;
  grade?: 'studio' | 'phone' | 'phoneWarm';
  position?: string;
}> = ({clip, shots, inAt, outAt, children, grade, position}) => (
  <AbsoluteFill>
    <Whip inAt={inAt} outAt={outAt}>
      <StudioShots clip={clip} shots={shots} grade={grade} position={position} />
    </Whip>
    {children}
  </AbsoluteFill>
);
