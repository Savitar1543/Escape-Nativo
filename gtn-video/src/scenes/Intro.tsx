import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, lerp, prog} from '../anim';
import {useMasterFrame} from '../components/Timeline';
import {Backdrop} from '../components/Look';
import {CITY, Globe} from '../components/Geo';
import {Logo} from '../components/Broadcast';
import {ZoomThrough} from '../components/Transitions';

const ROUTES = [CITY.copenhagen, CITY.mexico, CITY.suva, CITY.dili, CITY.kigali];

/** 0 – 4.03 s: cinematic title over a rotating dotted globe with routes out of Bogotá. */
export const Intro: React.FC = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const spin = interpolate(frame, [0, f(4.1)], [0, 1], {...clamp, easing: easeInOut});
  const rot: [number, number] = [lerp(95, 35, spin), lerp(-8, -18, spin)];
  const push = 1 + 0.06 * (frame / f(4.03));
  const line = (start: number) => prog(frame, f(start), 18);
  return (
    <ZoomThrough outAt={4.03} origin="62% 50%">
      <Backdrop tone="ink" grid={false} />
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <div style={{position: 'absolute', left: 760, top: -40, opacity: prog(frame, 0, 24)}}>
          <Globe
            size={1250}
            rotate={rot}
            routes={ROUTES.map((to, i) => ({to, p: prog(frame, f(0.5 + i * 0.22), 34)}))}
            pins={[CITY.bogota]}
          />
        </div>
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(3,6,20,0.96) 0%, rgba(3,6,20,0.75) 38%, rgba(3,6,20,0) 62%)'}} />
        <div style={{position: 'absolute', left: 120, top: 210}}>
          <div style={{opacity: line(0.15), transform: `translateY(${(1 - line(0.15)) * 20}px)`}}>
            <Logo size={1.4} />
          </div>
          <div style={{width: 520 * line(0.35), height: 2, background: `linear-gradient(90deg, ${C.red}, rgba(232,16,46,0))`, margin: '38px 0 30px'}} />
          {['THE DEVELOPMENT', 'MYSTERY'].map((txt, i) => (
            <div key={txt} style={{overflow: 'hidden'}}>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 700,
                  fontSize: 128,
                  lineHeight: 1.02,
                  letterSpacing: 2,
                  color: i === 1 ? C.white : C.white,
                  transform: `translateY(${(1 - line(0.45 + i * 0.12)) * 105}%)`,
                }}
              >
                {txt}
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: 22,
              fontFamily: FONT.sans,
              fontWeight: 400,
              fontSize: 30,
              lineHeight: 1.4,
              color: C.mute,
              opacity: line(1.0),
              transform: `translateY(${(1 - line(1.0)) * 16}px)`,
            }}
          >
            Comparing taxes, human development
            <br />
            and corruption
          </div>
          <div
            style={{
              marginTop: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 24px',
              background: `linear-gradient(90deg, ${C.redDeep}, ${C.red})`,
              clipPath: `inset(0 ${(1 - line(1.35)) * 100}% 0 0)`,
              boxShadow: '0 10px 40px rgba(232,16,46,0.4)',
            }}
          >
            <div style={{width: 10, height: 10, borderRadius: 5, background: 'white', opacity: 0.6 + 0.4 * Math.sin(t * 6)}} />
            <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 34, letterSpacing: 6, color: 'white'}}>BREAKING NEWS</span>
          </div>
        </div>
      </AbsoluteFill>
    </ZoomThrough>
  );
};
