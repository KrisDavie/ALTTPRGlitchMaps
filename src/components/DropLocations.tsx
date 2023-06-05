import { Button } from "semantic-ui-react";
import { TileData } from "../types";
import { JSX } from "react/jsx-runtime";

interface DropButtonProps {
  zoomToElement: (element: string, scale: number) => void;
  currentScale: number;
  onSelectTile: (source: string, dest: string) => void;
  selectedTile: string;
  previousTile: string;
  tileData: TileData[];
}

const createDropButtons = (props: DropButtonProps) => {
  const {
    tileData,
    zoomToElement,
    currentScale,
    onSelectTile,
    selectedTile,
    previousTile,
  } = props;
  const buttons: JSX.Element[] = [];
  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;
  const buttonSize = { width: 25, height: 16 };
  const offset = { x: 24, y: 35 };
  const existingTiles = tileData.map((tile) => tile.id);

  tileData.forEach((tile) => {
    const tileId = tile.id;
    const top = parseInt(tileId[5], 16) * tileHeight + offset.y;
    const left = parseInt(tileId[6], 16) * tileWidth + offset.x;
    if (existingTiles.includes(tile.dropTarget)) {
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
            onSelectTile(tileId, tile.dropTarget);
            setTimeout(() => {
              zoomToElement(tile.dropTarget, currentScale);
            }, 50);
          }}
        />
      );
    }
    if (selectedTile === tileId && previousTile !== tileId) {
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
            display: previousTile ? "block" : "none",
          }}
          onClick={() => {
            onSelectTile(tileId, previousTile);
            setTimeout(() => {
              zoomToElement(previousTile, currentScale);
            }, 50);
          }}
        >
          {"↩"}
        </Button>
      );
    }
  });
  return buttons;
};

function DropLocations(props: any) {
  return <div>{createDropButtons(props)}</div>;
}

export default DropLocations;
