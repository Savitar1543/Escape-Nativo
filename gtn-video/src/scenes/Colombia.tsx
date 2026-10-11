import React from 'react';
import {AbsoluteFill} from 'remotion';
import {DataPanel} from '../components/DataPanel';
import {LowerThird, SourceChip} from '../components/Broadcast';
import {CLIP} from '../data/media';
import {Whip, ZoomThrough} from '../components/Transitions';
import {StudioShots} from './Studio';

// Study averages across the six countries (from the comparison table).
const AVG = {corporate: 25, personal: 35.6, vat: 15.5};

/** 218.37 – 242.07 s: Nicolás' Colombia analysis. */
export const Colombia: React.FC = () => (
  <Whip outAt={242.07}>
    <ZoomThrough inAt={218.37}>
      <StudioShots
        clip={CLIP.nicolasColombia}
        grade="phoneWarm"
        position="50% 40%"
        shots={[
          {from: 218.37, to: 225.75, a: {s: 1.04, x: 0, y: 1}, b: {s: 1.1, x: 0, y: 2}},
          {from: 225.75, to: 242.07, a: {s: 1.24, x: -11, y: 3}, b: {s: 1.3, x: -11, y: 4}},
        ]}
      />
    </ZoomThrough>
    <AbsoluteFill>
      <LowerThird name="Nicolás" role="Analyst · Global Tax News" from={219.1} to={225.4} />
      <DataPanel
        kicker="Analysis · Home"
        title="Colombia"
        from={225.6}
        to={241.95}
        status={{text: 'Developing', from: 225.6, tone: 'gold'}}
        rows={[
          {label: 'Corporate tax', kind: 'pct', value: 35, from: 225.75, tone: 'bad', note: 'Highest rate in our study', avg: AVG.corporate, avgFrom: 237.45},
          {label: 'Top personal rate', kind: 'pct', value: 39, from: 230.95, tone: 'gold', avg: AVG.personal, avgFrom: 237.75},
          {label: 'VAT', kind: 'pct', value: 19, from: 233.45, tone: 'gold', avg: AVG.vat, avgFrom: 238.05},
        ]}
        footer={{text: 'Above the study average in all three taxes', from: 238.4, tone: 'gold'}}
      />
      <SourceChip source="Colombian Tax Statute" from={235.2} />
    </AbsoluteFill>
  </Whip>
);
