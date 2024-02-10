import React from "react";
import { JSX } from "react/jsx-runtime";
import { directionToRotation } from "../utils";
import { DoorGlitchData, DoorData, GlitchData, SelectedGlitch } from "../types";
import GlitchImage from "./GlitchImage";

interface DoorGlitchesProps {
  enabledGlitches: string[];
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  zoomToElement: (element: string, scale: number) => void;
  selectedGlitch: SelectedGlitch;
  doorGlitchData: DoorGlitchData[];
  doorData: DoorData[];
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
}

function DoorGlitches(props: DoorGlitchesProps) {
  const {
    doorGlitchData,
    doorData,
    selectedGlitch,
    zoomToElement,
    selectedMap,
  } = props;
  function handleClick(glitch: GlitchData, id: string) {
    props.setSelectedGlitch({ glitch, id });
    zoomToElement(id, selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6);
  }

  const getGlitchesGrid = (
    data: DoorGlitchData,
    enabledGlitches: string[],
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (data.glitches.length === 0) {
      return <div />;
    }
    if (data.glitches.length === 1) {
      const glitch = data.glitches[0];
      if (enabledGlitches.includes(glitch["glitch"])) {
        const glitchId = `dg-${glitch["glitchName"].replace(/ /g, "-")}`;
        <GlitchImage
          glitch={glitch}
          glitchId={glitchId}
          key={glitchId}
          selectedGlitch={selectedGlitch}
          handleClick={handleClick}
        />;
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
            const glitchId = `dg-${glitch["glitchName"].replace(/ /g, "-")}`;
            row.push(
              <GlitchImage
                glitch={glitch}
                glitchId={glitchId}
                key={glitchId}
                selectedGlitch={selectedGlitch}
                handleClick={handleClick}
              />
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
      const tileX = parseInt(tile["tile"].slice(-1), 16);
      const tileY = parseInt(tile["tile"].slice(-2, -1), 16);
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
            props.enabledGlitches
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
                key={`${doorName}-glitch-grid`}
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
