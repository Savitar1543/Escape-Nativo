import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {At} from './components/Timeline';
import {FilmLook} from './components/Look';
import {Bug, Captions, Ticker} from './components/Broadcast';
import {Flash, GtnWipe} from './components/Transitions';
import {MASTER_AUDIO} from './data/media';
import {CLIP} from './data/media';
import {Intro} from './scenes/Intro';
import {Opening} from './scenes/Opening';
import {Denmark} from './scenes/Denmark';
import {CLOSE, MED, StudioScene, WIDE_F} from './scenes/Studio';
import {Strap} from './components/Broadcast';
import {Mexico} from './scenes/Mexico';
import {WeatherStinger} from './scenes/WeatherStinger';
import {WeatherWall} from './scenes/WeatherWall';
import {Colombia} from './scenes/Colombia';
import {Table} from './scenes/Table';
import {Conclusion} from './scenes/Conclusion';
import {CaseClosed, Credits, SignOff} from './scenes/Finale';

const TAGS = [
  {text: 'LIVE · COPENHAGEN', from: 39.0, to: 76.6},
  {text: 'LIVE · MEXICO CITY', from: 91.6, to: 130.1},
  {text: 'TAX WEATHER', from: 141.3, to: 218.2},
  {text: 'ANALYSIS · COLOMBIA', from: 218.6, to: 254.8},
  {text: 'THE VERDICT', from: 255.2, to: 302.5},
];

export const GTN: React.FC = () => (
  <AbsoluteFill style={{background: '#020410'}}>
    <Audio src={staticFile(MASTER_AUDIO)} />

    <At from={0} to={4.03} name="Intro">
      <Intro />
    </At>
    <At from={4.03} to={32.93} name="Opening">
      <Opening />
    </At>
    <At from={32.93} to={76.77} name="Denmark">
      <Denmark />
    </At>
    <At from={76.77} to={88.37} name="Studio · Denmark recap">
      <StudioScene
        clip={CLIP.miguelDenmark}
        inAt={76.77}
        shots={[
          {from: 76.77, to: 80.15, a: MED, b: {s: 1.14, x: 0, y: 2}},
          {from: 80.15, to: 83.55, a: CLOSE, b: {s: 1.42, x: 0, y: 7}},
          {from: 83.55, to: 88.37, a: WIDE_F, b: {s: 1.08, x: 0, y: 1}},
        ]}
      >
        <Strap kicker="Denmark" text="High taxes · clean institutions" from={80.3} to={83.4} />
        <Strap kicker="Next" text="Live from Mexico City" from={86.1} to={88.3} />
      </StudioScene>
    </At>
    <At from={88.37} to={130.27} name="Mexico">
      <Mexico />
    </At>
    <At from={130.27} to={138.57} name="Studio · to Tax Weather">
      <StudioScene
        clip={CLIP.miguelMexico}
        inAt={130.27}
        shots={[
          {from: 130.27, to: 132.35, a: MED, b: {s: 1.13, x: 0, y: 2}},
          {from: 132.35, to: 136.75, a: CLOSE, b: {s: 1.42, x: 0, y: 7}},
          {from: 136.75, to: 138.57, a: WIDE_F, b: {s: 1.12, x: 0, y: 2}},
        ]}
      >
        <Strap kicker="Coming up" text="Tax weather around the world" from={133.0} to={136.6} />
      </StudioScene>
    </At>
    <At from={138.57} to={141.07} name="Weather stinger">
      <WeatherStinger />
    </At>
    <At from={141.07} to={218.37} name="Tax Weather">
      <WeatherWall />
    </At>
    <At from={218.37} to={242.07} name="Colombia">
      <Colombia />
    </At>
    <At from={242.07} to={254.97} name="Table">
      <Table />
    </At>
    <At from={254.97} to={302.67} name="Conclusion">
      <Conclusion />
    </At>
    <At from={302.67} to={306.47} name="Case closed">
      <CaseClosed />
    </At>
    <At from={306.47} to={317.07} name="Sign-off">
      <SignOff />
    </At>
    <At from={317.07} to={322.08} name="Credits">
      <Credits />
    </At>

    {/* Broadcast chrome */}
    <Bug from={4.4} to={138.4} tag={TAGS} />
    <Bug from={141.2} to={302.5} tag={TAGS} />
    <Ticker from={4.6} to={138.4} />
    <Ticker from={141.3} to={302.5} />
    <Captions />

    {/* Transitions over everything */}
    <Flash at={4.03} />
    <Flash at={76.77} strength={0.7} />
    <Flash at={130.27} strength={0.7} />
    <GtnWipe at={138.57} label="TAX WEATHER" />
    <Flash at={141.07} />
    <Flash at={218.37} />
    <Flash at={242.07} strength={0.6} />
    <GtnWipe at={254.97} label="THE VERDICT" />
    <Flash at={263.47} strength={0.6} />
    <Flash at={296.87} strength={0.6} />
    <GtnWipe at={302.67} />
    <Flash at={306.47} />
    <Flash at={317.07} />

    <FilmLook />
  </AbsoluteFill>
);
