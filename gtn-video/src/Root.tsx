import React from 'react';
import {Composition} from 'remotion';
import {GTN} from './GTN';
import {FPS, H, W} from './theme';
import {DURATION_SEC} from './data/media';

export const RemotionRoot: React.FC = () => (
  <Composition id="GTN" component={GTN} durationInFrames={Math.round(DURATION_SEC * FPS)} fps={FPS} width={W} height={H} />
);
