import React from "react";
import Hookpush from "./Hookpush";
import { JSX } from "react/jsx-runtime";
import { HookpushData, SelectedGlitch } from "../types";

interface HookPushLocationsProps {
  enabledGlitches: string[];
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  zoomToElement: (element: string, scale: number) => void;
  selectedGlitch: SelectedGlitch;
  hookpushData: HookpushData[];
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
}

function HookPushLocations(props: HookPushLocationsProps) {
  const { hookpushData } = props;
  const pushes: JSX.Element[] = [];
  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;
  const createHookpushes = () => {
    hookpushData.forEach((tile) => {
      const tileX = parseInt(tile["tile"].slice(-2, -1), 16);
      const tileY = parseInt(tile["tile"].slice(-1), 16);
      const top = tileY * tileHeight;
      const left = tileX * tileWidth;
      tile.locations.forEach((location) => {
        if (props.enabledGlitches.includes(`hookpush-${location.pushType}`)) {
          pushes.push(
            <Hookpush
              locationData={location}
              x={left + location.x}
              y={top + location.y}
              selectedMap={props.selectedMap}
              zoomToElement={props.zoomToElement}
              setSelectedGlitch={props.setSelectedGlitch}
              selectedGlitch={props.selectedGlitch}
              key={`${location.glitchName}-${location.pushType}`}
            />
          );
        }
      });
    });
    return pushes;
  };
  return <div>{createHookpushes()}</div>;
}

export default HookPushLocations;
