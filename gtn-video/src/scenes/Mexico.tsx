import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {f} from '../theme';
import {clamp} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop} from '../components/Look';
import {DataPanel, useRect, Window} from '../components/DataPanel';
import {LowerThird, SourceChip} from '../components/Broadcast';
import {CLIP} from '../data/media';
import {Whip} from '../components/Transitions';
import {Connecting, LEFT_BOX, LinkHeader, RIGHT_BOX} from './LiveLink';
import {FULL} from './Opening';

const HIDE_LEFT = {x: -900, y: 250, w: 830, h: 560, r: 22};
const PORTRAIT = {x: 300, y: 120, w: 560, h: 850, r: 26};
const alejandro = CLIP.alejandroMx;
const anchorTail = 88.37 - CLIP.miguelDenmark.off;

/** 88.37 – 130.27 s: live link to Mexico City and Alejandro's report (vertical feed). */
export const Mexico: React.FC = () => {
  const frame = useMasterFrame();
  const miguel = useRect([
    {t: 88.37, rect: FULL},
    {t: 88.37, rect: LEFT_BOX, dur: 0.8},
    {t: 91.4, rect: HIDE_LEFT, dur: 0.6},
  ]);
  const remote = useRect([
    {t: 88.37, rect: {x: 1405, y: 530, w: 0, h: 0, r: 22}},
    {t: 88.45, rect: RIGHT_BOX, dur: 0.7},
    {t: 91.47, rect: PORTRAIT, dur: 0.9},
  ]);
  const ambient = interpolate(frame, [f(91.47), f(92.4)], [0, 1], clamp);
  return (
    <Whip outAt={130.27}>
      <AbsoluteFill>
        <Backdrop />
        {/* Ambient fill: the same feed, enlarged and defocused behind the portrait card. */}
        <AbsoluteFill style={{opacity: ambient}}>
          <At from={91.47} to={130.27}>
            <AbsoluteFill style={{transform: 'scale(1.25)', filter: 'blur(38px) brightness(0.45) saturate(1.2)'}}>
              <Footage clip={alejandro} grade="phone" position="50% 40%" />
            </AbsoluteFill>
          </At>
          <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(4,8,26,0.25), rgba(4,8,26,0.7) 70%)'}} />
        </AbsoluteFill>
        <LinkHeader city="Mexico City" from={88.37} to={91.47} />
        <Window rect={miguel} label="STUDIO · BOGOTÁ">
          <At from={88.37} to={89.95}>
            <Cam from={{s: 1.0, x: 0, y: 0}} t0={88.37} t1={89.95}>
              <Footage clip={CLIP.miguelDenmark} clipStart={anchorTail} rate={0.6} position="50% 22%" />
            </Cam>
          </At>
          <At from={89.95} to={92.1}>
            <Cam from={{s: 1.0, x: 0, y: 0}} t0={89.95} t1={92.1}>
              <Footage clip={CLIP.miguelDenmark} clipStart={anchorTail + 0.93} still position="50% 22%" />
            </Cam>
          </At>
        </Window>
        <Window rect={remote} label={frame < f(91.47) ? 'LIVE · MEXICO CITY' : undefined}>
          <At from={88.37} to={106.75}>
            <Cam from={{s: 1.0, x: 0, y: 0}} to={{s: 1.06, x: 0, y: 1}} t0={92} t1={106.75}>
              <Footage clip={alejandro} grade="phone" position="50% 32%" />
            </Cam>
          </At>
          <At from={106.75} to={119.15}>
            <Cam from={{s: 1.32, x: 0, y: 12}} to={{s: 1.36, x: 0, y: 12}} t0={106.75} t1={119.15}>
              <Footage clip={alejandro} grade="phone" position="50% 32%" />
            </Cam>
          </At>
          <At from={119.15} to={130.27}>
            <Cam from={{s: 1.08, x: 0, y: 2}} to={{s: 1.14, x: 0, y: 3}} t0={119.15} t1={130.27}>
              <Footage clip={alejandro} grade="phone" position="50% 32%" />
            </Cam>
          </At>
          <At from={88.37} to={89.2}>
            <Connecting city="Mexico City" until={88.85} />
          </At>
        </Window>
        <LowerThird name="Alejandro" role="Live from Mexico City, Mexico" from={92.2} to={98.2} x={250} bottom={170} />
        <DataPanel
          kicker="Live · Americas"
          title="Mexico"
          x={1000}
          y={150}
          width={640}
          from={92.05}
          to={130.0}
          status={{text: 'Developing', from: 92.05, tone: 'gold'}}
          rows={[
            {label: 'Corporate tax', kind: 'pct', value: 30, from: 96.25},
            {label: 'Top personal rate', kind: 'pct', value: 35, from: 99.65},
            {label: 'VAT', kind: 'pct', value: 16, from: 102.75},
            {label: 'Human development', kind: 'rank', value: 81, of: 193, from: 106.75, tone: 'good', note: 'Better than Colombia', noteFrom: 112.05},
            {label: 'Corruption ranking', kind: 'rank', value: 141, of: 182, from: 119.15, tone: 'bad', note: 'The big problem'},
          ]}
          footer={{text: 'Worst corruption rank in our study', from: 126.35, tone: 'bad'}}
        />
        <SourceChip source="Mexican Income Tax and VAT laws" from={104.6} />
        <SourceChip source="Transparency International" from={123.2} />
      </AbsoluteFill>
    </Whip>
  );
};
