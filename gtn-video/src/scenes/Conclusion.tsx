import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, env, prog} from '../anim';
import {At, useMasterFrame} from '../components/Timeline';
import {Cam, Footage} from '../components/Footage';
import {Backdrop, glass} from '../components/Look';
import {useRect, Window} from '../components/DataPanel';
import {Strap} from '../components/Broadcast';
import {CLIP, withOff} from '../data/media';
import {Whip} from '../components/Transitions';
import {StudioShots} from './Studio';
import {FULL} from './Opening';

/* ---------- small line icons ---------- */
const Icon: React.FC<{kind: 'school' | 'hospital' | 'services'; size?: number; color?: string}> = ({kind, size = 64, color = C.white}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
    {kind === 'school' && (
      <>
        <path d="M6 26 L32 12 L58 26 L32 40 Z" />
        <path d="M16 31 V44 C22 50 42 50 48 44 V31" />
        <path d="M58 26 V40" />
      </>
    )}
    {kind === 'hospital' && (
      <>
        <rect x={10} y={10} width={44} height={44} rx={10} />
        <path d="M32 20 V44 M20 32 H44" />
      </>
    )}
    {kind === 'services' && (
      <>
        <path d="M8 34 L20 22 L30 28 L40 18 L56 32" />
        <path d="M8 34 L22 48 C26 52 30 52 34 48 L56 32" />
      </>
    )}
  </svg>
);

const Pill: React.FC<{text: string; tone: string; a: number}> = ({text, tone, a}) => (
  <div style={{padding: '14px 22px', whiteSpace: 'nowrap', borderRadius: 14, border: `1px solid ${tone}`, background: `${tone}22`, fontFamily: FONT.display, fontWeight: 600, fontSize: 30, letterSpacing: 2, color: C.white, opacity: a, transform: `translateY(${(1 - a) * 16}px)`}}>
    {text}
  </div>
);

/** Denmark model: taxes + low corruption → schools, hospitals, services. */
const Flow: React.FC = () => {
  const frame = useMasterFrame();
  const v = env(frame, f(269.65), f(279.4), 18, 12);
  if (v <= 0) return null;
  const a1 = prog(frame, f(269.8), 16);
  const a2 = prog(frame, f(271.4), 16);
  const arrow = prog(frame, f(274.85), 18);
  const items = [
    {k: 'school' as const, label: 'Schools', at: 275.2},
    {k: 'hospital' as const, label: 'Hospitals', at: 276.3},
    {k: 'services' as const, label: 'Good services', at: 277.4},
  ];
  return (
    <div style={{position: 'absolute', left: 1180, top: 160, width: 640, padding: '30px 34px', ...glass(24), opacity: v, transform: `translateX(${(1 - v) * 60}px)`}}>
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 4, color: C.green}}>THE DENMARK MODEL</div>
      <div style={{display: 'flex', gap: 14, marginTop: 18}}>
        <Pill text="HIGH TAXES" tone="#7FA2FF" a={a1} />
        <div style={{alignSelf: 'center', fontFamily: FONT.display, fontSize: 40, color: C.mute, opacity: a2}}>+</div>
        <Pill text="LOW CORRUPTION" tone={C.green} a={a2} />
      </div>
      <div style={{height: 90, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <svg width={40} height={80}>
          <path d="M20 4 V66 M8 54 L20 68 L32 54" stroke={C.green} strokeWidth={3} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arrow} />
        </svg>
      </div>
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 3, color: C.mute, textAlign: 'center', opacity: arrow}}>THE MONEY COMES BACK AS</div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 20}}>
        {items.map((it) => {
          const a = prog(frame, f(it.at), 16);
          return (
            <div key={it.k} style={{width: 180, padding: '20px 0', borderRadius: 16, background: 'rgba(41,196,126,0.12)', border: `1px solid rgba(41,196,126,0.5)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: a, transform: `scale(${0.85 + 0.15 * a})`}}>
              <Icon kind={it.k} color={C.green} />
              <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 17, letterSpacing: 1.5, color: C.white}}>{it.label.toUpperCase()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** "The key is corruption" — typographic beat over a defocused frame. */
const KeyBeat: React.FC = () => {
  const frame = useMasterFrame();
  const v = env(frame, f(266.95), f(269.6), 10, 10);
  if (v <= 0) return null;
  const w1 = prog(frame, f(267.0), 14);
  const w2 = prog(frame, f(267.9), 12);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: v}}>
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: FONT.display, fontWeight: 500, fontSize: 70, letterSpacing: 14, color: C.white, opacity: w1, transform: `translateY(${(1 - w1) * 20}px)`}}>THE KEY IS</div>
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 700,
            fontSize: 200,
            letterSpacing: 6,
            color: C.red,
            lineHeight: 1,
            textShadow: '0 0 60px rgba(232,16,46,0.55)',
            transform: `scale(${1.35 - 0.35 * w2})`,
            opacity: w2,
          }}
        >
          CORRUPTION
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Two scales: taxes like a developed country, transparency like a developing one. */
const Gauges: React.FC = () => {
  const frame = useMasterFrame();
  const v = env(frame, f(288.4), f(296.8), 18, 12);
  if (v <= 0) return null;
  const rows = [
    {k: 'TAXES', at: 288.6, pos: 0.92, tone: '#7FA2FF', label: 'Like a developed country'},
    {k: 'TRANSPARENCY', at: 292.35, pos: 0.5, tone: C.red, label: 'Like a developing country'},
  ];
  return (
    <div style={{position: 'absolute', left: 1180, top: 190, width: 640, padding: '30px 36px 36px', ...glass(24), opacity: v, transform: `translateX(${(1 - v) * 60}px)`}}>
      <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 4, color: C.gold}}>IN OTHER WORDS</div>
      <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 56, color: C.white, letterSpacing: 1.5}}>COLOMBIA</div>
      {rows.map((r) => {
        const a = prog(frame, f(r.at), 26);
        return (
          <div key={r.k} style={{marginTop: 34, opacity: Math.min(1, a * 2)}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 32, letterSpacing: 3, color: C.white}}>{r.k}</div>
              <div style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 1.5, color: r.tone}}>{r.label.toUpperCase()}</div>
            </div>
            <div style={{position: 'relative', height: 10, marginTop: 18, borderRadius: 5, background: 'linear-gradient(90deg, rgba(232,16,46,0.35), rgba(242,181,68,0.35), rgba(41,196,126,0.35))'}}>
              <div style={{position: 'absolute', top: -9, left: `calc(${r.pos * a * 100}% - 14px)`, width: 28, height: 28, borderRadius: 14, background: 'white', border: `5px solid ${r.tone}`, boxShadow: `0 0 18px ${r.tone}`}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: FONT.sans, fontWeight: 600, fontSize: 14, letterSpacing: 2, color: C.mute}}>
              <span>LEAST DEVELOPED</span>
              <span>DEVELOPING</span>
              <span>DEVELOPED</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Kinetic sign-off line for "a relationship, not a proof". */
const NotProof: React.FC = () => {
  const frame = useMasterFrame();
  const v = env(frame, f(299.95), f(302.65), 12, 8);
  if (v <= 0) return null;
  const a = prog(frame, f(300.0), 14);
  const b = prog(frame, f(301.0), 14);
  return (
    <div style={{position: 'absolute', left: 110, top: 300, opacity: v}}>
      <div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 96, lineHeight: 1.05, color: C.white, opacity: a, transform: `translateX(${(1 - a) * -30}px)`, textShadow: '0 8px 40px rgba(0,0,0,0.6)'}}>A RELATIONSHIP,</div>
      <div style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 96, lineHeight: 1.05, color: C.red, opacity: b, transform: `translateX(${(1 - b) * -30}px)`, textShadow: '0 8px 40px rgba(0,0,0,0.6)'}}>NOT A PROOF.</div>
    </div>
  );
};

const NIC_BOX = {x: 96, y: 260, w: 700, h: 470, r: 22};
const MIG_BOX = {x: 850, y: 170, w: 974, h: 650, r: 22};

/** 254.97 – 302.67 s: the verdict. */
export const Conclusion: React.FC = () => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const keyDim = env(frame, f(266.95), f(269.6), 10, 10);
  const nic = useRect([
    {t: 279.47, rect: {x: -760, y: 260, w: 700, h: 470, r: 22}},
    {t: 279.47, rect: NIC_BOX, dur: 0.7},
    {t: 288.0, rect: {x: -760, y: 260, w: 700, h: 470, r: 22}, dur: 0.6},
  ]);
  const mig = useRect([
    {t: 279.47, rect: {x: 1960, y: 170, w: 974, h: 650, r: 22}},
    {t: 279.47, rect: MIG_BOX, dur: 0.7},
    {t: 288.0, rect: FULL, dur: 0.8},
  ]);
  const notProofShift = interpolate(frame, [f(299.6), f(300.3)], [0, 1], {...clamp, easing: easeInOut});
  return (
    <AbsoluteFill>
      {/* Miguel: the question */}
      <At from={254.97} to={263.47}>
        <Whip outAt={263.47}>
          <StudioShots
            clip={CLIP.miguelConclude}
            shots={[
              {from: 254.97, to: 258.95, a: {s: 1.04, x: 0, y: 1}, b: {s: 1.12, x: 0, y: 2}},
              {from: 258.95, to: 263.47, a: {s: 1.36, x: 0, y: 7}, b: {s: 1.4, x: 0, y: 7}},
            ]}
          />
        </Whip>
        <Strap kicker="The verdict" text="Corruption · Taxes · Development" from={259.2} to={263.3} />
      </At>
      {/* Nicolás: the answer */}
      <At from={263.47} to={279.47}>
        <Whip inAt={263.47}>
          <AbsoluteFill style={{filter: keyDim > 0 ? `blur(${14 * keyDim}px) brightness(${1 - 0.55 * keyDim})` : undefined}}>
            <StudioShots
              clip={CLIP.nicolasConclude}
              grade="phone"
              position="50% 40%"
              shots={[
                {from: 263.47, to: 266.95, a: {s: 1.06, x: 0, y: 1}, b: {s: 1.1, x: 0, y: 2}},
                {from: 266.95, to: 269.65, a: {s: 1.4, x: 0, y: 8}, b: {s: 1.46, x: 0, y: 8}},
                {from: 269.65, to: 279.47, a: {s: 1.24, x: -11, y: 3}, b: {s: 1.3, x: -11, y: 4}},
              ]}
            />
          </AbsoluteFill>
        </Whip>
        <KeyBeat />
        <Flow />
      </At>
      {/* Two-way: Miguel draws the lesson, Nicolás listens */}
      <At from={279.47} to={296.87}>
        <Backdrop />
        <Window rect={nic} label="NICOLÁS · ANALYST">
          <At from={279.47} to={288.7}>
            <Cam from={{s: 1.15, x: 0, y: 3}} t0={279.47} t1={288.7}>
              <Footage clip={CLIP.nicolasConclude} clipStart={0.2} rate={0.9} grade="phone" />
            </Cam>
          </At>
        </Window>
        <Window rect={mig} label={t < 288 ? 'STUDIO · BOGOTÁ' : undefined}>
          <At from={279.47} to={288.15}>
            <Cam from={{s: 1.0, x: 0, y: 0}} to={{s: 1.05, x: 0, y: 1}} t0={279.47} t1={288.15}>
              <Footage clip={CLIP.miguelWrap} position="50% 22%" />
            </Cam>
          </At>
          <At from={288.15} to={296.87}>
            <Cam from={{s: 1.24, x: -11, y: 3}} to={{s: 1.3, x: -11, y: 4}} t0={288.15} t1={296.87}>
              <Footage clip={CLIP.miguelWrap} position="50% 22%" />
            </Cam>
          </At>
        </Window>
        <Strap kicker="High corruption" text="High taxes are not enough" from={283.4} to={287.9} x={96} bottom={250} />
        <Gauges />
      </At>
      {/* Nicolás: the caveat */}
      <At from={296.87} to={302.67}>
        <Whip inAt={296.87}>
          <Cam from={{s: 1.18, x: 0, y: 3}} to={{s: 1.26, x: 10, y: 4}} t0={299.6} t1={300.6}>
            <At from={296.87} to={302.67}>
              <Footage clip={withOff(CLIP.nicolasConclude, 256.7526)} grade="phone" position="50% 40%" />
            </At>
          </Cam>
          <AbsoluteFill style={{background: `linear-gradient(90deg, rgba(3,6,20,${0.8 * notProofShift}) 0%, rgba(3,6,20,0) 60%)`}} />
        </Whip>
        <NotProof />
      </At>
    </AbsoluteFill>
  );
};
