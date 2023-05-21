import React from "react";

const createOverlays = () => {
  // Create one button per tile (512x512) in the 16x16 grid of the image, use absolute positioning to place them
  const tiles = [];
  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;

  for (let i = 0; i < 16; i++) {
    const top = i * tileHeight;
    for (let j = 0; j < 16; j++) {
      const left = j * tileWidth;
      tiles.push(
        <div
          id={`tile-${i.toString(16).toUpperCase()}${j
            .toString(16)
            .toUpperCase()}`}
          style={{
            position: "absolute",
            top,
            left,
            width: tileWidth,
            height: tileHeight,
            backgroundColor: "transparent",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
        />
      );
    }
  }
  return tiles;
};

// TODO: Add function for button to show or go to indicated tile.

function TileOverlays() {
  return <div>{createOverlays()}</div>;
}

export default TileOverlays;
