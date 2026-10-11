#!/usr/bin/env bash
# Normalises the raw camera clips (Drive folder) and extracts the master audio mix
# from the original edit into public/media, ready for Remotion.
# Usage: scripts/prepare-media.sh <raw_clips_dir> <original_final.mp4>
set -euo pipefail
RAW="${1:?raw clips dir}"; FINAL="${2:?original final mp4}"
OUT="$(dirname "$0")/../public/media"; mkdir -p "$OUT"

enc() { # in out filter
  ffmpeg -v error -y -i "$RAW/$1" -vf "$3,fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 16 \
    -g 15 -an -movflags +faststart "$OUT/$2.mp4"
}
LAND="hqdn3d=1.5:1.5:4:4,scale=1920:-2:flags=lanczos,unsharp=5:5:0.6"
VERT="hqdn3d=1.5:1.5:4:4,scale=1080:-2:flags=lanczos,unsharp=5:5:0.6"
STUDIO="scale=1920:-2:flags=lanczos"

enc "Video el 11-10-26 a la(s) 9.09 a.m..mov"    miguel_open       "$STUDIO"
enc "Video el 11-10-26 a la(s) 9.11 a.m..mov"    miguel_denmark    "$STUDIO"
enc "Video el 11-10-26 a la(s) 9.12 a.m..mov"    miguel_mexico     "$STUDIO"
enc "Video el 11-10-26 a la(s) 9.12 a.m. #3.mov" miguel_conclude   "$STUDIO"
enc "Video el 11-10-26 a la(s) 9.14 a.m..mov"    miguel_wrap       "$STUDIO"
enc "Video el 11-10-26 a la(s) 9.16 a.m..mov"    miguel_goodnight  "$STUDIO"
enc "WhatsApp Video 2026-10-09 at 20.39.26.mp4"     david_copenhagen  "$LAND"
enc "WhatsApp Video 2026-10-09 at 20.39.26 (1).mp4" david_closing     "$LAND"
enc "WhatsApp Video 2026-10-09 at 20.39.35.mp4"     david_rwanda      "$LAND"
enc "WhatsApp Video 2026-10-09 at 22.13.15.mp4"     nicolas_weather   "$LAND"
enc "WhatsApp Video 2026-10-09 at 22.13.37.mp4"     nicolas_colombia  "$LAND"
enc "WhatsApp Video 2026-10-09 at 22.14.02.mp4"     nicolas_conclude  "$LAND"
enc "WhatsApp Video 2026-10-10 at 09.15.02.mp4"     alejandro_mexico  "$VERT"
enc "WhatsApp Video 2026-10-10 at 09.15.38.mp4"     alejandro_timor   "$VERT"
enc "WhatsApp Video 2026-10-10 at 09.15.42.mp4"     alejandro_closing "$VERT"

# Master mix (voice + music) from the approved edit: the remaster is cut to it.
ffmpeg -v error -y -i "$FINAL" -vn -c:a aac -b:a 256k "$OUT/master.m4a"
echo "media ready in $OUT"
