import {staticFile} from 'remotion';

/**
 * Raw camera clips and their sync offsets against the master mix.
 * offset = master time - clip time (seconds), measured by audio cross-correlation.
 * The iPhone .mov sources start their audio ~50-75 ms after the video; that lead is subtracted
 * so picture (not just sound) lines up with the master mix.
 */
export const CLIP = {
  miguelOpen: {src: 'media/miguel_open.mp4', off: 3.5535 - 0.0704},
  davidCph: {src: 'media/david_copenhagen.mp4', off: 33.0112},
  miguelDenmark: {src: 'media/miguel_denmark.mp4', off: 76.2355 - 0.0631},
  alejandroMx: {src: 'media/alejandro_mexico.mp4', off: 86.9992},
  miguelMexico: {src: 'media/miguel_mexico.mp4', off: 129.7097 - 0.0693},
  nicolasWeather: {src: 'media/nicolas_weather.mp4', off: 135.0206},
  alejandroTimor: {src: 'media/alejandro_timor.mp4', off: 168.6446},
  davidRwanda: {src: 'media/david_rwanda.mp4', off: 188.2792},
  nicolasColombia: {src: 'media/nicolas_colombia.mp4', off: 216.4376},
  miguelConclude: {src: 'media/miguel_conclude.mp4', off: 254.2439 - 0.0753},
  nicolasConclude: {src: 'media/nicolas_conclude.mp4', off: 255.602},
  miguelWrap: {src: 'media/miguel_wrap.mp4', off: 278.974 - 0.0508},
  davidClosing: {src: 'media/david_closing.mp4', off: 307.0166},
  alejandroClosing: {src: 'media/alejandro_closing.mp4', off: 308.4166},
  miguelGoodnight: {src: 'media/miguel_goodnight.mp4', off: 311.5649 - 0.0483},
} as const;

export type ClipRef = {src: string; off: number};

/** Same clip, different sync offset (jump cuts in the approved edit). */
export const withOff = (c: ClipRef, off: number): ClipRef => ({src: c.src, off});

export const mediaUrl = (src: string) => staticFile(src);

export const MASTER_AUDIO = 'media/master.m4a';
export const DURATION_SEC = 322.08;
