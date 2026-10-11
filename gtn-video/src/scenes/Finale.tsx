import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeIn, easeInOut, prog, rand} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop, glass} from '../components/Look';
import {Rect, Window} from '../components/DataPanel';
import {Logo} from '../components/Broadcast';
import {CITY, Globe} from '../components/Geo';
import {CLIP, ClipRef} from '../data/media';
import {Flash, ZoomThrough} from '../components/Transitions';

/** 302.67 – 306.47 s: case file + stamp slam. */
export const CaseClosed: React.FC = () => {
  const frame = useMasterFrame();
  const slam = f(303.05);
  const stamp = interpolate(frame, [slam - 6, slam], [0, 1], {...clamp, easing: easeIn});
  const shake = frame >= slam && frame < slam + 10 ? (1 - (frame - slam) / 10) * 14 : 0;
  const sx = (rand(frame) - 0.5) * shake;
  const sy = (rand(frame + 7) - 0.5) * shake;
  const l = (s: number) => prog(frame, f(s), 16);
  const push = interpolate(frame, [f(302.67), f(306.47)], [1.0, 1.06], clamp);
  return (
    <AbsoluteFill style={{transform: `translate(${sx}px, ${sy}px) scale(${push})`}}>
      <Backdrop tone="ink" />
      <AbsoluteFill style={{background: 'radial-gradient(circle at 50% 45%, rgba(232,16,46,0.18), rgba(0,0,0,0) 60%)'}} />
      {/* case file */}
      <div style={{position: 'absolute', left: 260, top: 130, width: 1400, height: 520, ...glass(26, 'strong'), transform: `perspective(1800px) rotateX(${(1 - l(302.7)) * 20}deg)`, opacity: l(302.7)}}>
        <div style={{position: 'absolute', left: 56, top: 44, fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: 6, color: C.mute}}>CASE FILE · GLOBAL TAX NEWS</div>
        <div style={{position: 'absolute', left: 56, top: 80, fontFamily: FONT.display, fontWeight: 600, fontSize: 54, letterSpacing: 2, color: 'rgba(240,244,255,0.85)'}}>THE DEVELOPMENT MYSTERY</div>
        <div style={{position: 'absolute', right: 56, top: 48, fontFamily: FONT.sans, fontWeight: 600, fontSize: 18, letterSpacing: 3, color: C.mute}}>6 COUNTRIES · 5 CONTINENTS</div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 300,
            transform: `translate(-50%, -50%) rotate(-6deg) scale(${2.4 - 1.4 * stamp})`,
            whiteSpace: 'nowrap',
            opacity: stamp,
            padding: '18px 56px',
            border: `10px solid ${C.red}`,
            borderRadius: 18,
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: 150,
            letterSpacing: 10,
            lineHeight: 1,
            color: C.red,
            textShadow: '0 0 40px rgba(232,16,46,0.45)',
            boxShadow: `0 0 60px rgba(232,16,46,0.35), inset 0 0 40px rgba(232,16,46,0.25)`,
          }}
        >
          CASE CLOSED
        </div>
        {/* dust burst */}
        {frame >= slam &&
          Array.from({length: 26}).map((_, i) => {
            const p = interpolate(frame, [slam, slam + 22], [0, 1], clamp);
            const ang = rand(i * 3.1) * Math.PI * 2;
            const dist = 200 + rand(i * 5.7) * 520;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 700 + Math.cos(ang) * dist * p,
                  top: 270 + Math.sin(ang) * dist * 0.5 * p,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: i % 3 ? 'rgba(255,255,255,0.7)' : C.red,
                  opacity: 1 - p,
                }}
              />
            );
          })}
      </div>
      <div style={{position: 'absolute', left: 260, top: 700, display: 'flex', alignItems: 'stretch', gap: 30}}>
        <div style={{width: 6, background: C.red, transform: `scaleY(${l(303.5)})`, transformOrigin: 'top'}} />
        <div>
          <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 24, letterSpacing: 6, color: C.mute, opacity: l(303.5)}}>MAIN SUSPECT</div>
          <div style={{overflow: 'hidden'}}>
            <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 120, lineHeight: 1.05, color: C.red, transform: `translateY(${(1 - l(303.75)) * 105}%)`}}>CORRUPTION</div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 1000, top: 760, width: 660, fontFamily: FONT.display, fontWeight: 500, fontSize: 40, lineHeight: 1.3, letterSpacing: 1.5, color: C.white, opacity: l(304.3), transform: `translateY(${(1 - l(304.3)) * 16}px)`}}>
        HIGH TAXES <span style={{color: C.mute}}>+</span> LOW CORRUPTION
        <br />
        <span style={{color: C.green}}>= DEVELOPMENT</span>
      </div>
    </AbsoluteFill>
  );
};

type Member = {name: string; role: string; clip: ClipRef; still: number; position?: string};
const TEAM: Member[] = [
  {name: 'Miguel Reyes', role: 'Anchor · Bogotá', clip: CLIP.miguelGoodnight, still: 0.4, position: '50% 22%'},
  {name: 'Nicolás', role: 'Analyst', clip: CLIP.nicolasConclude, still: 47.2, position: '50% 40%'},
  {name: 'David', role: 'Copenhagen · Kigali', clip: CLIP.davidClosing, still: 0.05},
  {name: 'Alejandro', role: 'Mexico City · Dili', clip: CLIP.alejandroClosing, still: 0.3, position: '50% 28%'},
];
const ACTIVE = [
  {name: 'David', from: 306.47, to: 308.85},
  {name: 'Alejandro', from: 308.85, to: 312.05},
  {name: 'Miguel Reyes', from: 312.05, to: 317.07},
];
const STAGE: Rect = {x: 96, y: 150, w: 1200, h: 740, r: 24};

/** 306.47 – 317.07 s: the team signs off; live speaker on stage, the rest on portrait cards. */
export const SignOff: React.FC = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const active = ACTIVE.find((a) => t >= a.from && t < a.to)?.name ?? 'Miguel Reyes';
  const head = prog(frame, f(306.47), 18);
  const swap = ACTIVE.slice(1).reduce((acc, a) => {
    const d = frame - f(a.from);
    return d >= 0 && d < 10 ? 1 - d / 10 : acc;
  }, 0);
  return (
    <ZoomThrough inAt={306.47} outAt={317.07}>
      <Backdrop />
      <div style={{position: 'absolute', left: 96, top: 70, opacity: head, display: 'flex', alignItems: 'baseline', gap: 20}}>
        <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 18, letterSpacing: 6, color: '#FF5A6E'}}>GLOBAL TAX NEWS</div>
        <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 40, letterSpacing: 3, color: C.white}}>THE TEAM</div>
      </div>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 - 0.03 * swap})`, filter: swap > 0 ? `brightness(${1 + 0.4 * swap})` : undefined, transformOrigin: `${STAGE.x + STAGE.w / 2}px ${STAGE.y + STAGE.h / 2}px`}}>
        <Window rect={{...STAGE, y: STAGE.y + (1 - head) * 40}} label={active.toUpperCase()}>
          <At from={306.47} to={307.02}>
            <Footage clip={CLIP.davidClosing} clipStart={0} still grade="phone" />
          </At>
          <At from={307.02} to={308.85}>
            <Cam from={{s: 1.05, x: 0, y: 0}} to={{s: 1.1, x: 0, y: 1}} t0={306.47} t1={308.85}>
              <Footage clip={CLIP.davidClosing} grade="phone" />
            </Cam>
          </At>
          <At from={308.85} to={312.05}>
            <Cam from={{s: 1.0, x: 0, y: 0}} to={{s: 1.06, x: 0, y: 1}} t0={308.85} t1={312.05}>
              <Footage clip={CLIP.alejandroClosing} grade="phone" position="50% 26%" />
            </Cam>
          </At>
          <At from={312.05} to={317.07}>
            <Cam from={{s: 1.0, x: 0, y: 0}} to={{s: 1.08, x: 0, y: 1}} t0={312.05} t1={317.07}>
              <Footage clip={CLIP.miguelGoodnight} position="50% 22%" />
            </Cam>
          </At>
        </Window>
      </div>
      {TEAM.map((m, i) => {
        const on = m.name === active;
        const a = prog(frame, f(306.6 + i * 0.12), 16);
        const y = 150 + i * 190;
        return (
          <div key={m.name} style={{position: 'absolute', left: 1360, top: y, width: 464, height: 170, opacity: a, transform: `translateX(${(1 - a) * 60}px)`}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 18, overflow: 'hidden', border: on ? `2px solid ${C.red}` : '1px solid rgba(190,205,255,0.22)', boxShadow: on ? `0 0 30px rgba(232,16,46,0.45)` : '0 20px 50px rgba(0,0,12,0.4)'}}>
              <div style={{position: 'absolute', left: 0, top: 0, width: 200, height: '100%', overflow: 'hidden', filter: on ? undefined : 'grayscale(0.55) brightness(0.8)'}}>
                <At from={306.47} to={317.07}>
                  <Footage clip={m.clip} clipStart={m.still} still grade="phone" position={m.position} />
                </At>
              </div>
              <div style={{position: 'absolute', left: 200, right: 0, top: 0, bottom: 0, ...glass(0, 'strong'), border: 'none', boxShadow: 'none', padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 30, letterSpacing: 1.5, color: C.white, whiteSpace: 'nowrap'}}>{m.name.toUpperCase()}</div>
                <div style={{fontFamily: FONT.sans, fontWeight: 600, fontSize: 15, letterSpacing: 2, color: C.mute, marginTop: 4}}>{m.role.toUpperCase()}</div>
                {on && (
                  <div style={{marginTop: 10, display: 'flex', alignItems: 'center', gap: 8}}>
                    <div style={{width: 9, height: 9, borderRadius: 5, background: C.red, opacity: 0.5 + 0.5 * Math.sin(t * 6)}} />
                    <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 13, letterSpacing: 3, color: C.red}}>ON AIR</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <Flash at={308.85} strength={0.4} />
      <Flash at={312.05} strength={0.4} />
    </ZoomThrough>
  );
};

/** 317.07 – 322.08 s: end card with sources and team, fade to black. */
export const Credits: React.FC = () => {
  const frame = useMasterFrame();
  const l = (s: number) => prog(frame, f(s), 18);
  const rot = interpolate(frame, [f(317.07), f(322.08)], [20, -25], clamp);
  const fade = interpolate(frame, [f(321.2), f(322.05)], [0, 1], {...clamp, easing: easeInOut});
  const sources = [
    'United Nations UNDP Human Development Report 2025',
    'Transparency International Corruption Perceptions Index 2025',
    'UN LDC list',
    'Official tax authorities and PwC Worldwide Tax Summaries',
  ];
  return (
    <ZoomThrough inAt={317.07}>
      <Backdrop tone="ink" grid={false} />
      <div style={{position: 'absolute', left: 900, top: 60, opacity: l(317.1)}}>
        <Globe size={1150} rotate={[rot, -12]} routes={[CITY.copenhagen, CITY.mexico, CITY.suva, CITY.dili, CITY.kigali].map((to) => ({to, p: 1}))} pins={[CITY.bogota]} />
      </div>
      <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(3,6,20,0.97) 0%, rgba(3,6,20,0.8) 42%, rgba(3,6,20,0) 70%)'}} />
      <div style={{position: 'absolute', left: 120, top: 120}}>
        <div style={{opacity: l(317.2)}}>
          <Logo size={1.2} />
        </div>
        {[
          {txt: 'THANKS FOR WATCHING', col: C.white, d: 317.35},
          {txt: 'GLOBAL TAX NEWS', col: C.red, d: 317.5},
        ].map((r) => (
          <div key={r.txt} style={{overflow: 'hidden', marginTop: r.d === 317.35 ? 40 : 0}}>
            <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 96, lineHeight: 1.05, letterSpacing: 2, color: r.col, transform: `translateY(${(1 - l(r.d)) * 105}%)`}}>{r.txt}</div>
          </div>
        ))}
        <div style={{marginTop: 46, fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: 5, color: C.red, opacity: l(317.9)}}>SOURCES</div>
        {sources.map((s, i) => (
          <div key={s} style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: 23, lineHeight: 1.65, color: C.mute, opacity: l(318.0 + i * 0.12)}}>
            {s}
          </div>
        ))}
        <div style={{marginTop: 40, fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: 5, color: C.red, opacity: l(318.7)}}>OUR TEAM</div>
        <div style={{display: 'flex', gap: 34, marginTop: 10}}>
          {['Miguel Reyes', 'Nicolás', 'David', 'Alejandro'].map((n, i) => (
            <div key={n} style={{fontFamily: FONT.display, fontWeight: 500, fontSize: 36, letterSpacing: 1.5, color: C.white, opacity: l(318.8 + i * 0.12)}}>
              {n.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <AbsoluteFill style={{background: 'black', opacity: fade}} />
    </ZoomThrough>
  );
};
