import React from "react";
import tileData from "../data/EG1/tileData.json";
import { Button } from "semantic-ui-react";

interface DropButtonProps {
  zoomToElement: (element: string, scale: number) => void;
  currentScale: number;
  onSelectTile: (source: string, dest: string) => void;
  selectedTile: string;
  previousTile: string;
}

const createDropButtons = (props: DropButtonProps) => {
  const buttons = [];
  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;
  const buttonSize = { width: 25, height: 16 };
  const offset = { x: 24, y: 35 };

  for (let i = 0; i < 16; i++) {
    const top = i * tileHeight + offset.y + i / 5;
    for (let j = 0; j < 16; j++) {
      const left = j * tileWidth + offset.x + j / 5;
      const tileId = `tile-${i.toString(16).toUpperCase()}${j
        .toString(16)
        .toUpperCase()}`;
      buttons.push(
        <Button
          basic
          compact
          color="red"
          key={`${tileId}-drop`}
          style={{
            position: "absolute",
            top,
            left,
            width: buttonSize.width,
            height: buttonSize.height,
            backgroundColor: "rgba(128, 128, 128, 0.75)",
            borderRadius: "5px",
          }}
          onClick={() => {
            props.zoomToElement(
              tileData[i * 16 + j]["dropTarget"],
              props.currentScale
            );
            props.onSelectTile(tileId, tileData[i * 16 + j]["dropTarget"]);
          }}
        />
      );
      buttons.push(
        <Button
          compact
          color="grey"
          size="mini"
          key={`${tileId}-back`}
          style={{
            position: "absolute",
            top: top + buttonSize.height + 4,
            left,
            backgroundColor: "rgba(128, 128, 128, 0.75)",
            borderRadius: "5px",
            display:
              props.selectedTile === tileId && props.previousTile
                ? "block"
                : "none",
          }}
          onClick={() => {
            props.zoomToElement(props.previousTile, props.currentScale);
            props.onSelectTile(tileId, props.previousTile);
          }}
        >
          {"↩"}
        </Button>
      );
    }
  }
  return buttons;
};

function DropLocations(props: any) {
  return <div>{createDropButtons(props)}</div>;
}

export default DropLocations;
