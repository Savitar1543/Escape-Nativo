# GTN · Global Tax News — remaster (Remotion)

Re-edit of *GTN_Global_Tax_News_final.mp4*: same script, takes, data and audio mix, rebuilt with a
broadcast-grade UI, virtual multi-camera framing and motion design.

## What changed vs. the original edit
- **Cinematography:** each continuous take is cut into wide / medium / close framings with slow
  camera drift; jump cuts land on framing changes so they read as camera switches.
- **Live links:** studio and remote windows animate between layouts (split → full screen,
  vertical feed → portrait card over a defocused ambient fill); signal glitch on the
  "the signal is a little slow" line.
- **Data:** country fact sheets fill in as each correspondent speaks (count-up values, bars,
  rank markers); "VERIFIED" stamps redesigned as source chips; table rebuilt as an animated grid.
- **Tax Weather:** dotted world map with a flying camera (Fiji → Timor-Leste → Rwanda → Colombia),
  animated sun / cloud / rain glyphs and forecast cards.
- **Packaging:** dotted-globe title and end card, GTN stingers, whip / zoom-through transitions,
  restyled captions, headline bar, film grain and vignette.

## Sync
The master mix is the audio of the approved edit (`public/media/master.m4a`). Every raw take is
placed by an offset measured with audio cross-correlation (`src/data/media.ts`), so lip sync and
caption timings (`src/data/subtitles.ts`, from the SRT) match the original.

## Build
```bash
npm install
# raw clips from the Drive folder + the approved final export:
bash scripts/prepare-media.sh <raw_clips_dir> <GTN_Global_Tax_News_final.mp4>
npm run studio      # preview
npm run render      # -> out/GTN_Global_Tax_News_remaster.mp4
```
Fonts (Oswald, Inter — SIL OFL) are self-hosted in `public/fonts`. In environments where Chrome
cannot be downloaded, set `Config.setBrowserExecutable(...)` in `remotion.config.ts`.
