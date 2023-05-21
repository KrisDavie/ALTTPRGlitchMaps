import React from "react";
import tileData from "./tileData.json";

interface DropButtonProps {
  zoomToElement: (element: string, scale: number) => void;
  currentScale: number;
}

const createDropButtons = (props: DropButtonProps) => {
  // Create one button per tile (512x512) in the 16x16 grid of the image, use absolute positioning to place them
  const buttons = [];
  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;
  const buttonSize = { width: 25, height: 16 };
  const offset = { x: 26, y: 36 };

  for (let i = 0; i < 16; i++) {
    const top = i * tileHeight + offset.y + i / 5;
    for (let j = 0; j < 16; j++) {
      const left = j * tileWidth + offset.x + j / 5; // Weird offset to fix the alignment from the image
      buttons.push(
        <button
          style={{
            position: "absolute",
            top,
            left,
            width: buttonSize.width,
            height: buttonSize.height,
            backgroundColor: "transparent",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "transparent";
          }}
          onClick={() => {
            props.zoomToElement(tileData[i * 16 + j]["dropTarget"], 0.7);
          }}
        ></button>
      );
    }
  }
  return buttons;
};

// TODO: Add function for button to show or go to indicated tile.

function DropLocations(zoomToElement: any) {
  return <div>{createDropButtons(zoomToElement)}</div>;
}

export default DropLocations;
