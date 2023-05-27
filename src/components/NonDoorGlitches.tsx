import React from "react";
import { Image } from "semantic-ui-react";
import { JSX } from "react/jsx-runtime";
import { directionToRotation, glitchToImage } from "../utils";
import { NonDoorGlitchData, GlitchData } from "../types";

interface NonDoorGlitchesProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
  nonDoorGlitchData: NonDoorGlitchData[];
}

function NonDoorGlitches(props: NonDoorGlitchesProps) {
  const { nonDoorGlitchData } = props;
  function handleClick(
    name: string | undefined,
    text: string | undefined,
    link: string | undefined
  ) {
    props.setGlitchText([
      name ? name : "Untitled Glitch",
      text ? text : "No extra info currently available...",
      link ? link : "",
    ]);
  }

  const getGlitchesGrid = (
    glitches: GlitchData[],
    enabledGlitches: string[]
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (glitches.length === 1) {
      const glitch = glitches[0];
      if (enabledGlitches.includes(glitch["glitch"])) {
        return (
          <div
            title={glitch["glitchName"]}
            onClick={() =>
              handleClick(glitch["glitchName"], glitch["info"], glitch["link"])
            }
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
                  handleClick(
                    glitch["glitchName"],
                    glitch["info"],
                    glitch["link"]
                  )
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
          props.selectedGlitches
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
