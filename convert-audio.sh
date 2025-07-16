#!/bin/bash

# --- Script to convert WAV files to MP3 format for web optimization.

# --- CONFIGURATION ---
ROOT_DIR="src/assets/music"
BITRATE=192  # MP3 bitrate in kbps (128-320, higher = better quality but larger file)
QUALITY=2    # MP3 quality (0-9, lower = better quality)
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

echo "Starting audio processing in '$ROOT_DIR'..."
echo "Converting WAV files to MP3 with ${BITRATE}kbps bitrate and quality ${QUALITY}."

# Find all WAV files and convert them to MP3
find "$ROOT_DIR" -iname "*.wav" -exec sh -c '
  BITRATE_ARG="'$BITRATE'"
  QUALITY_ARG="'$QUALITY'"

  file="$0"
  output_file="${file%.*}.mp3"

  # Get original file size
  original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
  original_size_mb=$(echo "scale=2; $original_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")

  echo -n "Converting: $file (${original_size_mb}MB) -> "

  # Convert WAV to MP3
  ffmpeg -i "$file" -b:a "${BITRATE_ARG}k" -q:a "$QUALITY_ARG" "$output_file" -y

  if [ $? -eq 0 ]; then
    # Get converted file size
    converted_size=$(stat -f%z "$output_file" 2>/dev/null || stat -c%s "$output_file" 2>/dev/null)
    converted_size_mb=$(echo "scale=2; $converted_size / 1024 / 1024" | bc -l 2>/dev/null || echo "unknown")

    # Calculate size reduction
    if [ "$original_size" != "unknown" ] && [ "$converted_size" != "unknown" ]; then
      reduction_percent=$(echo "scale=1; (1 - $converted_size / $original_size) * 100" | bc -l 2>/dev/null || echo "unknown")
      echo "$output_file (${converted_size_mb}MB, ${reduction_percent}% smaller)"
    else
      echo "$output_file (${converted_size_mb}MB)"
    fi
  else
    echo "ERROR: Failed to convert $file"
  fi
' {} \;

echo "-------------------------------------"
echo "Audio processing complete!"
echo ""
echo "Note: Original WAV files are preserved. You can delete them after verifying"
echo "      the MP3 files work correctly in your application."
echo ""
echo "To use MP3 files in your code, update your audio imports from:"
echo "  import audioFile from './audio.wav'"
echo "to:"
echo "  import audioFile from './audio.mp3'"