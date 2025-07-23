#!/bin/bash

# --- The final, corrected script to find, resize, and convert images to WebP.

# --- CONFIGURATION ---
ROOT_DIR="src/assets/images"
MAX_WIDTH=1200  # Maximum width for images in pixels
MAX_HEIGHT=1200 # Maximum height for images in pixels
QUALITY=80
# --- END CONFIGURATION ---


# Check if the root directory exists.
if [ ! -d "$ROOT_DIR" ]; then
  echo "Error: Directory '$ROOT_DIR' not found."
  exit 1
fi

# Check if required commands are available.
if ! command -v ffmpeg &> /dev/null || ! command -v cwebp &> /dev/null; then
    echo "Error: This script requires 'ffmpeg' and 'cwebp' to be installed."
    exit 1
fi

echo "Starting image processing in '$ROOT_DIR'..."
echo "Maximum dimensions set to ${MAX_WIDTH}x${MAX_HEIGHT}px. Quality set to ${QUALITY}."

find "$ROOT_DIR" \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec sh -c '
  MAX_WIDTH_ARG="'$MAX_WIDTH'"
  MAX_HEIGHT_ARG="'$MAX_HEIGHT'"
  QUALITY_ARG="'$QUALITY'"

  file="$0"
  output_file="${file%.*}.webp"

  # Get current image dimensions
  current_width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of csv=s=x:p=0 "$file")
  current_height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=s=x:p=0 "$file")

  # --- FULLY CORRECTED RESIZE LOGIC ---
  # First, check if resizing is needed at all.
  if [ "$current_width" -gt "$MAX_WIDTH_ARG" ] || [ "$current_height" -gt "$MAX_HEIGHT_ARG" ]; then
    echo -n "Resizing & Converting: $file (${current_width}x${current_height}px -> "

    # Now, determine whether to resize based on width or height to maintain aspect ratio.
    # We use cross-multiplication to avoid floating point math in the shell.
    # This checks if the image is proportionally wider than it is tall, compared to the max dimensions.
    if [ $((current_width * MAX_HEIGHT_ARG)) -gt $((current_height * MAX_WIDTH_ARG)) ]; then
      # Width is the limiting factor. Resize by width, calculate height automatically.
      echo "${MAX_WIDTH_ARG}px wide)"
      cwebp -q "$QUALITY_ARG" -resize "$MAX_WIDTH_ARG" 0 "$file" -o "$output_file"
    else
      # Height is the limiting factor. Resize by height, calculate width automatically.
      echo "${MAX_HEIGHT_ARG}px tall)"
      cwebp -q "$QUALITY_ARG" -resize 0 "$MAX_HEIGHT_ARG" "$file" -o "$output_file"
    fi
  else
    # If the image is within the size limits, just convert it.
    echo "Converting: $file (${current_width}x${current_height}px)"
    cwebp -q "$QUALITY_ARG" "$file" -o "$output_file"
  fi
' {} \;

echo "-------------------------------------"
echo "Processing complete!"