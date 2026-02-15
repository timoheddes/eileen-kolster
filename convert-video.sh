#!/bin/bash

# --- Script to convert video files to web-optimized H.264 MP4 for minimum file size.

# --- CONFIGURATION ---
ROOT_DIR="src/assets/video"
MAX_HEIGHT=720    # Maximum height in pixels (720p). Aspect ratio is preserved.
CRF=28            # Constant Rate Factor (0-51, higher = smaller file, 23 = default, 28 = good web quality)
PRESET="slow"     # Encoding preset (ultrafast, superfast, fast, medium, slow, slower, veryslow)
PROFILE="high"    # H.264 profile (baseline, main, high). High = best compression for modern browsers.
AUDIO_BITRATE=128 # AAC audio bitrate in kbps
SUFFIX="-web"     # Suffix added to output filenames (e.g., video-web.mp4)
# --- END CONFIGURATION ---

# Check if the root directory exists.
if [ ! -d "$ROOT_DIR" ]; then
  echo "Error: Directory '$ROOT_DIR' not found."
  exit 1
fi

# Check if required commands are available.
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: This script requires 'ffmpeg' to be installed."
    echo "Install with: brew install ffmpeg (macOS) or apt-get install ffmpeg (Ubuntu)"
    exit 1
fi

echo "Starting video processing in '$ROOT_DIR'..."
echo "Settings: ${MAX_HEIGHT}p max, CRF ${CRF}, preset ${PRESET}, profile ${PROFILE}, audio ${AUDIO_BITRATE}kbps."
echo ""

# Find all MP4 files that do NOT already have the -web suffix
find "$ROOT_DIR" -iname "*.mp4" ! -iname "*${SUFFIX}.mp4" -exec sh -c '
  MAX_HEIGHT_ARG="'$MAX_HEIGHT'"
  CRF_ARG="'$CRF'"
  PRESET_ARG="'$PRESET'"
  PROFILE_ARG="'$PROFILE'"
  AUDIO_BITRATE_ARG="'$AUDIO_BITRATE'"
  SUFFIX_ARG="'$SUFFIX'"

  file="$0"
  output_file="${file%.*}${SUFFIX_ARG}.mp4"

  # Get original file size
  original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  original_size_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")

  # Get current video height
  current_height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=s=x:p=0 "$file")

  echo "Processing: $file (${original_size_mb}MB, ${current_height}p)"

  # Only scale down if source is larger than target height
  if [ "$current_height" -gt "$MAX_HEIGHT_ARG" ] 2>/dev/null; then
    SCALE_FILTER="-vf scale=-2:${MAX_HEIGHT_ARG}"
    echo "  Scaling down to ${MAX_HEIGHT_ARG}p..."
  else
    SCALE_FILTER=""
    echo "  Already at or below ${MAX_HEIGHT_ARG}p, keeping original resolution."
  fi

  # Convert with H.264 + AAC, optimized for web
  ffmpeg -i "$file" \
    -c:v libx264 \
    -crf "$CRF_ARG" \
    -preset "$PRESET_ARG" \
    -profile:v "$PROFILE_ARG" \
    -pix_fmt yuv420p \
    $SCALE_FILTER \
    -c:a aac \
    -b:a "${AUDIO_BITRATE_ARG}k" \
    -movflags +faststart \
    -y \
    "$output_file" 2>/dev/null

  if [ $? -eq 0 ]; then
    # Get converted file size
    converted_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    converted_size_mb=$(echo "scale=2; $converted_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")

    # Calculate size reduction
    if [ "$original_size" != "unknown" ] && [ "$converted_size" != "unknown" ]; then
      reduction_percent=$(echo "scale=1; (1 - $converted_size / $original_size) * 100" | bc -l 2>/dev/null || echo "unknown")
      echo "  -> $output_file (${converted_size_mb}MB, ${reduction_percent}% smaller)"
    else
      echo "  -> $output_file (${converted_size_mb}MB)"
    fi
  else
    echo "  ERROR: Failed to convert $file"
  fi
  echo ""
' {} \;

echo "-------------------------------------"
echo "Video processing complete!"
echo ""
echo "Note: Original video files are preserved. You can delete them after verifying"
echo "      the web-optimized files work correctly in your application."
echo ""
echo "To use the optimized videos in your code, import the -web suffixed files:"
echo "  import videoFile from './video${SUFFIX}.mp4'"
