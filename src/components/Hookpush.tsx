import React from "react";
import { directionToRotation } from "../utils";

type HookPushProps = {
  type: string;
  glitchName: string;
  length: number;
  direction: string;
  x: number;
  y: number;
  info?: string;
  link?: string;
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
};

function Hookpush({
  type,
  glitchName,
  info,
  link,
  length,
  direction,
  x,
  y,
  setGlitchText,
}: HookPushProps) {
  function handleClick(
    name: string | undefined,
    text: string | undefined,
    link: string | undefined
  ) {
    setGlitchText([
      name ? name : "Untitled Glitch",
      text ? text : "No extra info currently available...",
      link ? link : "",
    ]);
  }

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
        zIndex: 5,
      }}
      title={glitchName}
      onClick={() => handleClick(glitchName, info, link)}
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
