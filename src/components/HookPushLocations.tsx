import React from "react";
import Hookpush from "./Hookpush";
import _hookpushData from "../data/hookpushData.json";
import { JSX } from "react/jsx-runtime";

interface HookpushLocation {
  x: number;
  y: number;
  direction: string;
  pushType: string;
  distance: number;
  glitchName: string;
  info?: string;
  link?: string;
}

interface HookpushData {
  tile: string;
  locations: HookpushLocation[];
}

interface HookPushLocationsProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
}

const hookpushData: HookpushData[] = _hookpushData;

function HookPushLocations(props: HookPushLocationsProps) {
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
