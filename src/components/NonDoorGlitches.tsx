import React from "react";
import { JSX } from "react/jsx-runtime";
import { directionToRotation } from "../utils";
import { NonDoorGlitchData, GlitchData, SelectedGlitch } from "../types";
import GlitchImage from "./GlitchImage";

interface NonDoorGlitchesProps {
  enabledGlitches: string[];
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  zoomToElement: (element: string, scale: number) => void;
  selectedGlitch: SelectedGlitch;
  nonDoorGlitchData: NonDoorGlitchData[];
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
}

function NonDoorGlitches(props: NonDoorGlitchesProps) {
  const { nonDoorGlitchData, selectedGlitch, zoomToElement, selectedMap } =
    props;
  function handleClick(glitch: GlitchData, id: string) {
    props.setSelectedGlitch({ glitch, id });
    zoomToElement(id, selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6);
  }

  const getGlitchesGrid = (
    glitches: GlitchData[],
    enabledGlitches: string[]
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (glitches.length === 0) {
      return <div />;
    }
    if (glitches.length === 1) {
      const glitch = glitches[0];
      if (enabledGlitches.includes(glitch["glitch"])) {
        const glitchId = `ndg-${glitch["glitchName"].replace(/ /g, "-")}`;

        return (
          <GlitchImage
            glitch={glitch}
            glitchId={glitchId}
            key={glitchId}
            selectedGlitch={selectedGlitch}
            handleClick={handleClick}
          />
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
          const id = `nondoor-glitches-${glitch["glitch"]}-${index}`;
          if (enabledGlitches.includes(glitch["glitch"])) {
            const glitchId = `ndg-${glitch["glitchName"].replace(/ /g, "-")}`;
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
          row.push(
            <div key={`nondoor-glitches-${glitches[0]["glitch"]}-${index}`} />
          );
        }
      }
      grid.push(<div key={`${glitches[0]["glitch"]}-col${i}`}>{row}</div>);
    }
    return grid;
  };

  const createOverlays = () => {
    const overlays: JSX.Element[] = [];
    const tileWidth = 8192 / 16;
    const tileHeight = 8192 / 16;
    nonDoorGlitchData.forEach((tile) => {
      // Extract last 2 characters of tile name
      const tileX = parseInt(tile["tile"].slice(-1), 16);
      const tileY = parseInt(tile["tile"].slice(-2, -1), 16);
      const top = tileY * tileHeight;
      const left = tileX * tileWidth;
      tile["locations"].forEach((location) => {
        const glitchGrid = getGlitchesGrid(
          location["glitches"],
          props.enabledGlitches
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
              key={`${tile["tile"]}-${location["x"]}-${location["y"]}`}
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
