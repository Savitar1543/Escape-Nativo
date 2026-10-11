import React, {createContext, useContext} from 'react';
import {Sequence, useCurrentFrame} from 'remotion';
import {f} from '../theme';

/** Master-time (seconds) at which the enclosing <At> starts. */
const StartCtx = createContext(0);

/**
 * Places children on the master timeline using absolute seconds, regardless of nesting.
 * Children can read the absolute time with useT().
 */
export const At: React.FC<{
  from: number;
  to: number;
  children: React.ReactNode;
  name?: string;
  layout?: 'absolute-fill' | 'none';
}> = ({from, to, children, name, layout}) => {
  const parent = useContext(StartCtx);
  const start = f(from) - f(parent);
  const dur = Math.max(1, f(to) - f(from));
  return (
    <Sequence from={start} durationInFrames={dur} name={name} layout={layout}>
      <StartCtx.Provider value={from}>{children}</StartCtx.Provider>
    </Sequence>
  );
};

/** Absolute master frame. */
export const useMasterFrame = () => {
  const start = useContext(StartCtx);
  return useCurrentFrame() + f(start);
};

/** Absolute master time in seconds. */
export const useT = () => useMasterFrame() / 30;

export const useSceneStart = () => useContext(StartCtx);
