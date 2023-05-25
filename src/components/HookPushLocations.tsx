import React from "react";
import Hookpush from "./Hookpush";
import { JSX } from "react/jsx-runtime";
import { HookpushData } from "../types";

interface HookPushLocationsProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
  hookpushData: HookpushData[];
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
        if (props.selectedGlitches.includes(`hookpush-${location.pushType}`)) {
          pushes.push(
            <Hookpush
              direction={location.direction}
              length={location.distance}
              x={left + location.x}
              y={top + location.y}
              glitchName={location.glitchName}
              type={location.pushType}
              info={location.info}
              link={location.link}
              setGlitchText={props.setGlitchText}
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
