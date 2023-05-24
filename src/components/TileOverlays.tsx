import React from "react";

// TODO: Add function for button to show or go to indicated tile.

interface TileOverlaysProps {
  selectedTile: string;
  highlightTile: boolean;
}

function TileOverlays(props: TileOverlaysProps) {
  const createOverlays = () => {
    const tiles = [];
    const tileWidth = 8192 / 16;
    const tileHeight = 8192 / 16;

    for (let i = 0; i < 16; i++) {
      const top = i * tileHeight;
      for (let j = 0; j < 16; j++) {
        const left = j * tileWidth;
        const tileId = `tile-${i.toString(16).toUpperCase()}${j
          .toString(16)
          .toUpperCase()}`;
        tiles.push(
          <div
            id={tileId}
            key={`${tileId}-overlay`}
            style={{
              position: "absolute",
              top,
              left,
              width: tileWidth,
              height: tileHeight,
              backgroundColor:
                props.selectedTile === tileId && props.highlightTile
                  ? "rgba(128, 128, 128, 0.5)"
                  : "transparent",
              transition: "all .5s ease",
              WebkitTransition: "all .5s ease",
              MozTransition: "all .5s ease",
            }}
          />
        );
      }
    }
    return tiles;
  };

  return <div>{createOverlays()}</div>;
}

export default TileOverlays;
