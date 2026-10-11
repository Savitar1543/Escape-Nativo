import React from 'react';
import {AbsoluteFill} from 'remotion';
import {f} from '../theme';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop} from '../components/Look';
import {DataPanel, useRect, Window} from '../components/DataPanel';
import {LowerThird, SourceChip} from '../components/Broadcast';
import {CLIP, withOff} from '../data/media';
import {Glitch, Whip} from '../components/Transitions';
import {Connecting, LEFT_BOX, LinkHeader, RIGHT_BOX} from './LiveLink';
import {FULL} from './Opening';

const HIDE_LEFT = {x: -900, y: 250, w: 830, h: 560, r: 22};
const david = CLIP.davidCph;
const GRADE = 'phone' as const;

/** Glitch envelope: hard while locking the feed, then bursts while "the signal is a little slow". */
const useGlitch = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  let g = 0;
  if (t >= 33.6 && t < 34.4) g = 1 - (t - 33.6) / 0.8;
  if (t >= 35.8 && t < 38.6) g = Math.max(0, Math.sin(t * 9) * Math.sin(t * 3.7)) > 0.55 ? 0.8 : 0;
  return {g, seed: frame};
};

/** 32.93 – 76.77 s: live link to Copenhagen and David's report. */
export const Denmark: React.FC = () => {
  const miguel = useRect([
    {t: 32.93, rect: FULL},
    {t: 32.93, rect: LEFT_BOX, dur: 0.8},
    {t: 38.85, rect: HIDE_LEFT, dur: 0.6},
  ]);
  const remote = useRect([
    {t: 32.93, rect: {x: 1405, y: 530, w: 0, h: 0, r: 22}},
    {t: 33.05, rect: RIGHT_BOX, dur: 0.7},
    {t: 38.95, rect: FULL, dur: 0.8},
  ]);
  const {g, seed} = useGlitch();
  return (
    <Whip outAt={76.77}>
      <AbsoluteFill>
        <Backdrop />
        <LinkHeader city="Copenhagen" from={32.93} to={38.95} />
        <Window rect={miguel} label="STUDIO · BOGOTÁ">
          <At from={32.93} to={39.6}>
            <Cam from={{s: 1.08, x: 0, y: 2}} to={{s: 1.12, x: 0, y: 2}} t0={32.93} t1={39.6}>
              <Footage clip={CLIP.miguelOpen} clipStart={32.93 - CLIP.miguelOpen.off} rate={0.4} position="50% 22%" />
            </Cam>
          </At>
        </Window>
        <Window rect={remote} label={remote.w < 1900 ? 'LIVE · COPENHAGEN' : undefined}>
          <Glitch amount={g} seed={seed}>
            <At from={33.02} to={44.4}>
              <Cam from={{s: 1.02, x: 0, y: 0}} to={{s: 1.08, x: 0, y: 1}} t0={33.02} t1={44.4}>
                <Footage clip={david} grade={GRADE} />
              </Cam>
            </At>
            <At from={44.4} to={47.833}>
              <Cam from={{s: 1.36, x: 0, y: 9}} to={{s: 1.4, x: 0, y: 9}} t0={44.4} t1={47.833}>
                <Footage clip={withOff(david, 30.4525)} grade={GRADE} />
              </Cam>
            </At>
            <At from={47.833} to={63.633}>
              <Cam from={{s: 1.22, x: -10, y: 3}} to={{s: 1.27, x: -10, y: 3}} t0={47.833} t1={63.633}>
                <Footage clip={withOff(david, 27.8026)} grade={GRADE} />
              </Cam>
            </At>
            <At from={63.633} to={69.933}>
              <Cam from={{s: 1.42, x: -10, y: 9}} to={{s: 1.46, x: -10, y: 9}} t0={63.633} t1={69.933}>
                <Footage clip={withOff(david, 24.4525)} grade={GRADE} />
              </Cam>
            </At>
            <At from={69.933} to={76.77}>
              <Cam from={{s: 1.22, x: -10, y: 3}} to={{s: 1.12, x: 0, y: 1}} t0={74.6} t1={75.6}>
                <Footage clip={withOff(david, 21.9025)} grade={GRADE} />
              </Cam>
            </At>
          </Glitch>
          <At from={32.93} to={34.3}>
            <Connecting city="Copenhagen" until={33.9} />
          </At>
        </Window>
        <LowerThird name="David" role="Live from Copenhagen, Denmark" from={39.6} to={44.3} />
        <DataPanel
          kicker="Live · Europe"
          title="Denmark"
          from={44.4}
          to={74.85}
          status={{text: 'Developed', from: 44.4, tone: 'good'}}
          rows={[
            {label: 'Human development', kind: 'rank', value: 4, of: 193, from: 44.5, tone: 'good'},
            {label: 'Corporate tax', kind: 'pct', value: 22, from: 51.25},
            {label: 'Top personal rate', kind: 'pct', value: 60.5, from: 53.75},
            {label: 'VAT', kind: 'pct', value: 25, from: 60.15},
            {label: 'Corruption ranking', kind: 'rank', value: 1, of: 182, from: 65.6, tone: 'good', note: 'Number 1 in the world'},
          ]}
          footer={{text: 'People pay a lot · they receive good services', from: 69.95, tone: 'good'}}
        />
        <SourceChip source="UNDP · Human Development Report" from={46.6} />
        <SourceChip source="PwC · European Commission" from={62.3} />
        <SourceChip source="Transparency International" from={68.3} />
      </AbsoluteFill>
    </Whip>
  );
};

export const DENMARK_END = f(76.77);
