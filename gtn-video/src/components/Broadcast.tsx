import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, FONT, f} from '../theme';
import {clamp, easeInOut, easeOut, env, prog} from '../anim';
import {useMasterFrame} from './Timeline';
import {glass} from './Look';
import {CUES} from '../data/subtitles';

export const Logo: React.FC<{size?: number; sub?: boolean}> = ({size = 1, sub = true}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14 * size}}>
    <div
      style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${C.red}, ${C.redDeep})`,
        borderRadius: 8 * size,
        padding: `${4 * size}px ${12 * size}px`,
        boxShadow: `0 ${6 * size}px ${22 * size}px rgba(232,16,46,0.45), inset 0 1px 0 rgba(255,255,255,0.35)`,
      }}
    >
      <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 40 * size, color: 'white', letterSpacing: 1 * size, lineHeight: 1.1}}>
        GTN
      </span>
    </div>
    {sub && (
      <div style={{fontFamily: FONT.sans, color: C.white, lineHeight: 1.05}}>
        <div style={{fontWeight: 800, fontSize: 15 * size, letterSpacing: 3 * size}}>GLOBAL</div>
        <div style={{fontWeight: 500, fontSize: 15 * size, letterSpacing: 3 * size, opacity: 0.8}}>TAX NEWS</div>
      </div>
    )}
  </div>
);

/** Top-left station bug: logo, pulsing LIVE, clock and a segment tag. */
export const Bug: React.FC<{from: number; to: number; tag?: {text: string; from: number; to: number}[]}> = ({from, to, tag = []}) => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const v = env(frame, f(from), f(to), 18, 12);
  if (v <= 0) return null;
  const pulse = 0.55 + 0.45 * Math.sin(t * 5);
  const activeTag = tag.find((g) => t >= g.from && t < g.to);
  const tagV = activeTag ? env(frame, f(activeTag.from), f(activeTag.to), 14, 10) : 0;
  return (
    <div style={{position: 'absolute', left: 64, top: 52, display: 'flex', alignItems: 'center', gap: 18, opacity: v, transform: `translateY(${(1 - v) * -20}px)`}}>
      <Logo size={0.82} />
      <div style={{width: 1, height: 40, background: 'rgba(255,255,255,0.25)'}} />
      <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRadius: 999, ...glass(999)}}>
        <div style={{width: 10, height: 10, borderRadius: 5, background: C.red, boxShadow: `0 0 ${12 * pulse}px ${C.red}`, opacity: 0.5 + 0.5 * pulse}} />
        <span style={{fontFamily: FONT.sans, fontWeight: 800, fontSize: 16, letterSpacing: 2, color: C.white}}>LIVE</span>
        <span style={{fontFamily: FONT.sans, fontWeight: 500, fontSize: 16, color: C.mute, marginLeft: 6}}>8:00 PM</span>
      </div>
      {activeTag && (
        <div
          style={{
            overflow: 'hidden',
            clipPath: `inset(0 ${(1 - tagV) * 100}% 0 0)`,
            padding: '8px 16px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.94)',
            fontFamily: FONT.display,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: 2,
            color: C.navy,
          }}
        >
          {activeTag.text}
        </div>
      )}
    </div>
  );
};

const HEADLINES = [
  'Denmark: number 1 in the world against corruption',
  'Colombia: 35% corporate tax, the highest in our study',
  'Rwanda: less corrupt than Colombia and Mexico',
  'Timor-Leste: no VAT, only 2.5% on imports',
  'Mexico: HDI 81, corruption rank 141',
];

/** Lower headline bar: headlines flip in one at a time instead of a crawl. */
export const Ticker: React.FC<{from: number; to: number}> = ({from, to}) => {
  const frame = useMasterFrame();
  const v = env(frame, f(from), f(to), 20, 14);
  if (v <= 0) return null;
  const PER = f(6.5);
  const local = Math.max(0, frame - f(from));
  const idx = Math.floor(local / PER) % HEADLINES.length;
  const inItem = local % PER;
  const flipIn = interpolate(inItem, [0, 14], [1, 0], {...clamp, easing: easeOut});
  const flipOut = interpolate(inItem, [PER - 10, PER], [0, 1], {...clamp, easing: easeInOut});
  const progress = inItem / PER;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 74,
        transform: `translateY(${(1 - v) * 90}px)`,
        display: 'flex',
        alignItems: 'stretch',
        background: 'linear-gradient(180deg, rgba(6,12,36,0.78), rgba(3,6,20,0.95))',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(170,190,255,0.18)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 28px 0 64px',
          background: `linear-gradient(90deg, ${C.redDeep}, ${C.red})`,
          clipPath: 'polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%)',
          paddingRight: 48,
        }}
      >
        <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 26, letterSpacing: 3, color: 'white'}}>BREAKING</span>
      </div>
      <div style={{position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', paddingLeft: 30}}>
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 500,
            fontSize: 27,
            letterSpacing: 1.2,
            color: C.white,
            textTransform: 'uppercase',
            transform: `translateY(${flipIn * 40 - flipOut * 40}px)`,
            opacity: 1 - Math.max(flipIn, flipOut),
          }}
        >
          {HEADLINES[idx]}
        </div>
        <div style={{position: 'absolute', left: 0, bottom: 0, height: 3, width: `${progress * 100}%`, background: 'linear-gradient(90deg, rgba(232,16,46,0), rgba(232,16,46,0.9))'}} />
      </div>
      <div style={{display: 'flex', alignItems: 'center', padding: '0 64px 0 24px', gap: 14, borderLeft: '1px solid rgba(170,190,255,0.15)'}}>
        <span style={{fontFamily: FONT.sans, fontWeight: 700, fontSize: 16, letterSpacing: 3, color: C.mute}}>GLOBALTAXNEWS</span>
      </div>
    </div>
  );
};

/** Burned-in captions, restyled: clean glass pill, soft rise. */
export const Captions: React.FC<{lift?: (t: number) => number}> = ({lift}) => {
  const frame = useMasterFrame();
  const t = frame / 30;
  const cue = CUES.find((c) => t >= c.start - 0.05 && t < c.end + 0.15);
  if (!cue) return null;
  const v = env(frame, f(cue.start - 0.05), f(cue.end + 0.15), 7, 5);
  const bottom = lift ? lift(t) : 112;
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom, display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            maxWidth: 1300,
            padding: '12px 26px',
            borderRadius: 14,
            background: 'rgba(3,7,22,0.62)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: FONT.sans,
            fontWeight: 600,
            fontSize: 33,
            lineHeight: 1.3,
            color: 'white',
            textAlign: 'center',
            letterSpacing: 0.1,
            opacity: v,
            transform: `translateY(${(1 - v) * 14}px)`,
            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}
        >
          {cue.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Name super: masked reveal, red accent rule, role line. */
export const LowerThird: React.FC<{name: string; role: string; from: number; to: number; x?: number; bottom?: number}> = ({
  name,
  role,
  from,
  to,
  x = 96,
  bottom = 200,
}) => {
  const frame = useMasterFrame();
  const s = f(from);
  const e = f(to);
  if (frame < s || frame > e) return null;
  const bar = prog(frame, s, 14);
  const nameIn = prog(frame, s + 6, 18);
  const roleIn = prog(frame, s + 12, 18);
  const out = prog(frame, e - 12, 12, easeInOut);
  return (
    <div style={{position: 'absolute', left: x, bottom, opacity: 1 - out, transform: `translateX(${-out * 40}px)`}}>
      <div style={{display: 'flex', alignItems: 'stretch', gap: 0}}>
        <div style={{width: 8, borderRadius: 4, background: `linear-gradient(180deg, ${C.red}, ${C.redDeep})`, transform: `scaleY(${bar})`, transformOrigin: 'top', boxShadow: `0 0 18px rgba(232,16,46,0.6)`}} />
        <div style={{paddingLeft: 22}}>
          <div style={{overflow: 'hidden'}}>
            <div
              style={{
                fontFamily: FONT.display,
                fontWeight: 600,
                fontSize: 64,
                letterSpacing: 2,
                color: 'white',
                lineHeight: 1.05,
                transform: `translateY(${(1 - nameIn) * 100}%)`,
                textShadow: '0 6px 30px rgba(0,0,0,0.5)',
              }}
            >
              {name.toUpperCase()}
            </div>
          </div>
          <div style={{overflow: 'hidden', marginTop: 6}}>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: 6,
                ...glass(6, 'strong'),
                fontFamily: FONT.sans,
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: 3,
                color: C.white,
                transform: `translateY(${(1 - roleIn) * 110}%)`,
              }}
            >
              {role.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Source credit (reimagined "VERIFIED" stamp): glass chip with drawn check and sheen. */
export const SourceChip: React.FC<{source: string; from: number; dur?: number; top?: number; right?: number}> = ({
  source,
  from,
  dur = 3.2,
  top = 56,
  right = 64,
}) => {
  const frame = useMasterFrame();
  const s = f(from);
  const e = f(from + dur);
  if (frame < s || frame > e) return null;
  const inP = prog(frame, s, 16);
  const check = prog(frame, s + 8, 14);
  const sheen = interpolate(frame, [s + 10, s + 34], [-30, 130], clamp);
  const out = prog(frame, e - 10, 10, easeInOut);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        opacity: inP * (1 - out),
        transform: `translateX(${(1 - inP) * 60}px) scale(${0.96 + 0.04 * inP})`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 22px 12px 14px',
        overflow: 'hidden',
        ...glass(16, 'strong'),
        border: '1px solid rgba(41,196,126,0.45)',
      }}
    >
      <svg width={40} height={40} viewBox="0 0 40 40">
        <circle cx={20} cy={20} r={18} fill="rgba(41,196,126,0.16)" stroke={C.green} strokeWidth={2} strokeDasharray={113} strokeDashoffset={113 * (1 - inP)} />
        <path d="M12 20.5 L17.5 26 L28.5 14" fill="none" stroke={C.green} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check} />
      </svg>
      <div style={{fontFamily: FONT.sans, lineHeight: 1.2}}>
        <div style={{fontSize: 13, fontWeight: 800, letterSpacing: 3, color: C.green}}>VERIFIED SOURCE</div>
        <div style={{fontSize: 21, fontWeight: 600, color: C.white}}>{source}</div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sheen}%`,
          width: 80,
          background: 'linear-gradient(100deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))',
          transform: 'skewX(-20deg)',
        }}
      />
    </div>
  );
};

/** Headline strap (topic super) sitting above the captions. */
export const Strap: React.FC<{kicker: string; text: string; from: number; to: number; x?: number; bottom?: number}> = ({kicker, text, from, to, x = 96, bottom = 200}) => {
  const frame = useMasterFrame();
  const s = f(from);
  const e = f(to);
  if (frame < s || frame > e) return null;
  const a = prog(frame, s, 18);
  const b = prog(frame, s + 8, 20);
  const out = prog(frame, e - 12, 12, easeInOut);
  return (
    <div style={{position: 'absolute', left: x, bottom, opacity: 1 - out, display: 'flex', alignItems: 'stretch', clipPath: `inset(0 ${(1 - a) * 100}% 0 0)`}}>
      <div style={{background: C.red, padding: '10px 18px', display: 'flex', alignItems: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 24, letterSpacing: 3, color: 'white'}}>
        {kicker.toUpperCase()}
      </div>
      <div style={{background: 'rgba(250,251,255,0.96)', padding: '10px 24px', display: 'flex', alignItems: 'center'}}>
        <span style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 34, letterSpacing: 1, color: C.navy, opacity: b, transform: `translateX(${(1 - b) * 20}px)`}}>
          {text.toUpperCase()}
        </span>
      </div>
    </div>
  );
};
