import React from "react";
import _nonDoorGlitchData from "../data/nonDoorGlitchData.json";
import { Image } from "semantic-ui-react";
import { JSX } from "react/jsx-runtime";

interface GlitchData {
  glitch: string;
  glitchName: string;
  info?: string;
  link?: string;
}

interface GlitchLocation {
  x: number;
  y: number;
  direction: string;
  glitches: GlitchData[];
}

interface NonDoorGlitchData {
  tile: string;
  locations: GlitchLocation[];
}

const glitchToImage = (glitch: string) => {
  switch (glitch) {
    case "redYBA":
      return "images/red_pot.png";
    case "greenYBA":
      return "images/green_pot.png";
    case "blueYBA":
      return "images/blue_pot.png";
    case "somaria":
      return "images/somaria.png";
    case "bomb":
      return "images/bomb.png";
    case "boots":
      return "images/boots.png";
    case "spinGreenYBA":
      return "images/spin_green_pot.png";
    case "spinBlueYBA":
      return "images/spin_blue_pot.png";
    case "spinSomaria":
      return "images/spin_somaria.png";
    case "quadrant":
      return "images/quadrant.png";
    case "jingle":
      return "images/jingle.png";
    case "statueDrag":
      return "images/statue_drag.png";
    case "somariaBlueYBA":
      return "images/somaria_blue_pot.png";
    default:
      return "images/somaria.png";
  }
};

const directionToRotation = (direction: string) => {
  switch (direction) {
    case "No":
      return 0;
    case "So":
      return 180;
    case "We":
      return 270;
    case "Ea":
      return 90;
    case "Up":
      return 0;
    case "Down":
      return 180;
    default:
      return 0;
  }
};

const nonDoorGlitchData: NonDoorGlitchData[] = _nonDoorGlitchData;

interface NonDoorGlitchesProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
}

function NonDoorGlitches(props: NonDoorGlitchesProps) {
  console.log(props);
  function handleClick(name: string | undefined, text: string | undefined) {
    props.setGlitchText([
      name ? name : "Untitled Glitch",
      text ? text : "No extra info currently available...",
    ]);
  }

  const getGlitchesGrid = (
    glitches: GlitchData[],
    enabledGlitches: string[],
    direction: string
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (glitches.length === 1) {
      const glitch = glitches[0];
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
        const glitch = glitches[index];
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
    nonDoorGlitchData.forEach((tile) => {
      // Extract last 2 characters of tile name
      const tileX = parseInt(tile["tile"].slice(-2, -1), 16);
      const tileY = parseInt(tile["tile"].slice(-1), 16);
      const top = tileY * tileHeight;
      const left = tileX * tileWidth;
      tile["locations"].forEach((location) => {
        const glitchGrid = getGlitchesGrid(
          location["glitches"],
          props.selectedGlitches,
          location["direction"]
        );
        if (glitchGrid) {
          overlays.push(
            <div
              style={{
                position: "absolute",
                top: top + location["y"] - 32,
                left: left + location["x"] - 32,
                width: "64px",
                height: "64px",
                borderRadius: "5px",
                transform: `rotate(${directionToRotation(
                  location["direction"]
                )}deg)`,
              }}
            >
              {glitchGrid}
            </div>
          );
        }
      });
    });
    return overlays;
  };

  return <div>{createOverlays()}</div>;
}

export default NonDoorGlitches;
