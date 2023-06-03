import React, { useCallback, useEffect } from "react";
import { directionToRotation } from "../utils";
import { SelectedGlitch, HookpushLocation } from "../types";

type HookPushProps = {
  locationData: HookpushLocation;
  x: number;
  y: number;
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  selectedGlitch: SelectedGlitch;
  zoomToElement: (element: string, scale: number) => void;
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
};

function Hookpush({
  locationData,
  x,
  y,
  setSelectedGlitch,
  selectedGlitch,
  zoomToElement,
  selectedMap,
}: HookPushProps) {
  const handleClick = useCallback(
    (glitch: HookpushLocation, id: string) => {
      setSelectedGlitch({ glitch, id });
      zoomToElement(
        id,
        selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6
      );
    },
    [setSelectedGlitch, zoomToElement, selectedMap]
  );

  const type = locationData.pushType;
  const length = locationData.distance;
  const direction = locationData.direction;
  const glitchName = locationData.glitchName;

  const misslot =
    type === "somaria"
      ? "images/somaria_block.png"
      : type === "boom"
      ? "images/blue_boom.png"
      : "images/hook_link_square.png";
  const head =
    direction === "So" || direction === "Ea" ? "images/hook_head.png" : misslot;
  const middle =
    direction === "No" || direction === "So"
      ? "images/hook_link.png"
      : "images/hook_link_horiz.png";
  const end =
    direction === "So" || direction === "Ea" ? misslot : "images/hook_head.png";
  const rotation = directionToRotation(direction);
  const endpointStyle = {
    transform: `rotate(${rotation}deg)`,
    width: "32px",
  };
  const lengthRemove = type === "somaria" || type === "boom" ? 56 : 48;
  const middleStyle = {
    height:
      direction === "No" || direction === "So"
        ? `${length - lengthRemove}px`
        : "32px",
    width:
      direction === "No" || direction === "So"
        ? "32px"
        : `${length - lengthRemove}px`,
  };

  const glitchId = `hp-${glitchName.replace(/ /g, "-")}`;

  useEffect(() => {
    if (selectedGlitch.id === glitchId && !selectedGlitch.glitch) {
      handleClick(locationData, glitchId);
    }
  }, [selectedGlitch, glitchId, locationData, handleClick]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        flexDirection:
          direction === "No" || direction === "So" ? "column" : "row",
        top: y,
        left: x,
        zIndex: selectedGlitch.glitch === locationData ? 110 : 100,
        outline:
          selectedGlitch.glitch === locationData ? "5px solid white" : "",
      }}
      title={glitchName}
      onClick={() => handleClick(locationData, glitchId)}
      id={glitchId}
    >
      <img src={end} alt="end1" style={endpointStyle} />
      <div
        style={{
          backgroundImage: `url(${middle})`,
          backgroundRepeat: "repeat",
          ...middleStyle,
        }}
      />
      <img src={head} alt="end2" style={endpointStyle} />
    </div>
  );
}

export default Hookpush;
