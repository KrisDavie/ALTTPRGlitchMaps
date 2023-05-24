import React from "react";
import _doorData from "../data/doorData.json";
import _doorGlitchData from "../data/doorGlitchData.json";
import { Image } from "semantic-ui-react";
import { JSX } from "react/jsx-runtime";
import { directionToRotation, glitchToImage } from "../utils";

interface DoorData {
  tile: string;
  doors: {
    x: number;
    y: number;
    name: string;
    direction: string;
  }[];
}

interface GlitchData {
  glitch: string;
  glitchName: string;
  info?: string;
  link?: string;
}

interface DoorGlitchData {
  door: string;
  glitches: GlitchData[];
}

const doorData: DoorData[] = _doorData;
const doorGlitchData: DoorGlitchData[] = _doorGlitchData;

interface DoorGlitchesProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
}

function DoorGlitches(props: DoorGlitchesProps) {
  console.log(props);
  function handleClick(name: string | undefined, text: string | undefined) {
    props.setGlitchText([
      name ? name : "Untitled Glitch",
      text ? text : "No extra info currently available...",
    ]);
  }

  const getGlitchesGrid = (
    data: DoorGlitchData,
    enabledGlitches: string[],
    doorDirection: string
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (data.glitches.length === 1) {
      const glitch = data.glitches[0];
      if (enabledGlitches.includes(glitch["glitch"])) {
        return (
          <div
            title={glitch["glitchName"]}
            onClick={() => handleClick(glitch["glitchName"], glitch["info"])}
          >
            <Image
              circular
              src={glitchToImage(glitch["glitch"])}
              style={{
                zIndex: 100,
              }}
            />
          </div>
        );
      }
    }
    // Otherwise, we have multiple glitches, so use a grid
    const grid = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const glitch = data.glitches[index];
        if (glitch) {
          if (enabledGlitches.includes(glitch["glitch"])) {
            row.push(
              <div
                title={glitch["glitchName"]}
                onClick={() =>
                  handleClick(glitch["glitchName"], glitch["info"])
                }
              >
                <Image
                  circular
                  src={glitchToImage(glitch["glitch"])}
                  alt={glitch["glitchName"]}
                  title={glitch["glitchName"]}
                />
              </div>
            );
          } else {
            row.push(<div />);
          }
        } else {
          row.push(<div />);
        }
      }
      grid.push(<div>{row}</div>);
    }
    return grid;
  };

  const createOverlays = () => {
    const overlays: JSX.Element[] = [];
    const tileWidth = 8192 / 16;
    const tileHeight = 8192 / 16;
    doorData.forEach((tile) => {
      // Extract last 2 characters of tile name
      const tileX = parseInt(tile["tile"].slice(-2, -1), 16);
      const tileY = parseInt(tile["tile"].slice(-1), 16);
      const top = tileY * tileHeight;
      const left = tileX * tileWidth;
      tile["doors"].forEach((door) => {
        let doorX = door["x"];
        let doorY = door["y"];
        const doorName = door["name"];
        const doorDirection = door["direction"];
        const doorGlitches = doorGlitchData.find((d) => d["door"] === doorName);
        if (doorGlitches) {
          const glitchGrid = getGlitchesGrid(
            doorGlitches,
            props.selectedGlitches,
            doorDirection
          );
          if (glitchGrid) {
            overlays.push(
              <div
                style={{
                  position: "absolute",
                  top: top + doorY - 32,
                  left: left + doorX - 32,
                  width: "64px",
                  height: "64px",
                  borderRadius: "5px",
                  transform: `rotate(${directionToRotation(doorDirection)}deg)`,
                }}
              >
                {glitchGrid}
              </div>
            );
          }
        } else if (true) {
          overlays.push(
            <div
              title={doorName}
              style={{
                position: "absolute",
                top: top + doorY - 6,
                left: left + doorX - 6,
                width: "12px",
                height: "12px",
                borderRadius: "5px",
                backgroundColor: "rgba(0, 255, 0, 0.5)",
              }}
            />
          );
        }
      });
    });
    return overlays;
  };

  return <div>{createOverlays()}</div>;
}

export default DoorGlitches;
