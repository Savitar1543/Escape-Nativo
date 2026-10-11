import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, prog} from '../anim';
import {useMasterFrame} from '../components/Timeline';
import {Backdrop} from '../components/Look';
import {CITY, Globe} from '../components/Geo';
import {Sun} from '../components/Weather';
import {ZoomThrough} from '../components/Transitions';

/** 138.57 – 141.07 s: "Around the world in 30 seconds" stinger. */
export const WeatherStinger: React.FC = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const s = f(138.57);
  const spin = interpolate(frame, [s, f(141.1)], [-40, -150], {...clamp, easing: easeInOut});
  const l = (d: number) => prog(frame, s + f(d), 16);
  return (
    <ZoomThrough outAt={141.07} origin="35% 50%">
      <Backdrop tone="ink" />
      <div style={{position: 'absolute', left: -120, top: 40, opacity: l(0)}}>
        <Globe size={1000} rotate={[spin, 8]} pins={[CITY.suva, CITY.dili, CITY.kigali]} />
      </div>
      <div style={{position: 'absolute', left: 1000, top: 250}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, opacity: l(0.1)}}>
          <Sun size={90} t={t} a={l(0.1)} />
          <div style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 22, letterSpacing: 8, color: C.sun}}>TAX WEATHER</div>
        </div>
        {[
          {txt: 'AROUND THE WORLD', col: C.white, d: 0.2},
          {txt: 'IN 30 SECONDS', col: C.red, d: 0.35},
        ].map((r) => (
          <div key={r.txt} style={{overflow: 'hidden'}}>
            <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 112, lineHeight: 1.05, color: r.col, transform: `translateY(${(1 - l(r.d)) * 105}%)`}}>{r.txt}</div>
          </div>
        ))}
        <div style={{marginTop: 24, fontFamily: FONT.sans, fontSize: 30, lineHeight: 1.45, color: C.mute, opacity: l(0.6)}}>
          Three countries. Three perspectives.
          <br />
          One global story.
        </div>
      </div>
    </ZoomThrough>
  );
};
