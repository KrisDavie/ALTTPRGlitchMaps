import React from "react";
import { Image } from "semantic-ui-react";
import { JSX } from "react/jsx-runtime";
import { directionToRotation, glitchToImage } from "../utils";
import { DoorGlitchData, DoorData } from "../types";

interface DoorGlitchesProps {
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
  doorGlitchData: DoorGlitchData[];
  doorData: DoorData[];
}

function DoorGlitches(props: DoorGlitchesProps) {
  const { doorGlitchData, doorData } = props;
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
    data: DoorGlitchData,
    enabledGlitches: string[],
    doorDirection: string
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (data.glitches.length === 0) {
      return <div />;
    }
    if (data.glitches.length === 1) {
      const glitch = data.glitches[0];
      if (enabledGlitches.includes(glitch["glitch"])) {
        return (
          <div
            title={glitch["glitchName"]}
            onClick={() =>
              handleClick(glitch["glitchName"], glitch["info"], glitch["link"])
            }
            key={`door-glitches-${data["door"]}`}
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
        const id = `door-glitches-${data["door"]}-${index}`;
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
                key={id}
              >
                <Image
                  circular
                  src={glitchToImage(glitch["glitch"])}
                  alt={glitch["glitchName"]}
                  title={glitch["glitchName"]}
                  style={{
                    zIndex: 100,
                  }}
                />
              </div>
            );
          } else {
            row.push(<div key={id} />);
          }
        } else {
          row.push(<div key={id} />);
        }
      }
      grid.push(<div key={`door-glitches-${data["door"]}-col${i}`}>{row}</div>);
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
                key={`${doorName}-glitch-grid}`}
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
              key={doorName}
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
