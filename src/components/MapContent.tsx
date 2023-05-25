import React, { useState } from "react";
import TileOverlays from "./TileOverlays";
import DropLocations from "./DropLocations";
import DoorGlitches from "./DoorGlitches";
import NonDoorGlitches from "./NonDoorGlitches";
import HookPushLocations from "./HookPushLocations";

import doorData from "../data/EG1/doorData.json";
import doorGlitchData from "../data/EG1/doorGlitchData.json";
import hookpushData from "../data/EG1/hookpushData.json";
import nonDoorGlitchData from "../data/EG1/nonDoorGlitchData.json";

interface MapContentProps {
  zoomToElement: (element: string) => void;
  currentScale: number;
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
}

function MapContent(props: MapContentProps) {
  const {
    zoomToElement,
    currentScale,
    selectedGlitches,
    setGlitchText,
    selectedMap,
  } = props;
  const [selectedTile, setSelectedTile] = useState("");
  const [previousTile, setPreviousTile] = useState("");
  const [highlightTile, setHighlightTile] = useState(false);

  const updateSelectedTile = (source: string, dest: string) => {
    setPreviousTile(source);
    setSelectedTile(dest);
    setHighlightTile(true);
    setTimeout(() => {
      setHighlightTile(false);
    }, 1000);
  };

  const mapElements = [];

  if (selectedMap === "EG1") {
    mapElements.push(
      <TileOverlays
        selectedTile={selectedTile}
        highlightTile={highlightTile}
        key="TileOverlays"
      />
    );
    mapElements.push(
      <DropLocations
        zoomToElement={zoomToElement}
        currentScale={currentScale}
        onSelectTile={(source: string, dest: string) =>
          updateSelectedTile(source, dest)
        }
        selectedTile={selectedTile}
        previousTile={previousTile}
        key="DropLocations"
      />
    );
    mapElements.push(
      <DoorGlitches
        selectedGlitches={selectedGlitches}
        setGlitchText={setGlitchText}
        doorData={doorData}
        doorGlitchData={doorGlitchData}
        key="DoorGlitches"
      />
    );
    mapElements.push(
      <HookPushLocations
        selectedGlitches={selectedGlitches}
        setGlitchText={setGlitchText}
        hookpushData={hookpushData}
        key="HookPushLocations"
      />
    );
    mapElements.push(
      <NonDoorGlitches
        selectedGlitches={selectedGlitches}
        setGlitchText={setGlitchText}
        nonDoorGlitchData={nonDoorGlitchData}
        key="NonDoorGlitches"
      />
    );
  }

  // Set map image basec on selected map
  let mapImage = "";
  switch (selectedMap) {
    case "EG1":
      mapImage = "images/eg_map_fully_annotated.png";
      break;
    case "EG2":
      mapImage = "images/eg2_map.png";
      break;
    case "LW":
      mapImage = "images/lightworld_large.png";
      break;
    case "DW":
      mapImage = "images/darkworld_large.png";
      break;
    default:
      mapImage = "images/eg_map_fully_annotated.png";
  }

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        src={mapImage}
        alt={`${selectedMap} Map`}
        id="image"
        style={{
          height: "100%",
          paddingTop: `${selectedMap === "EG2" ? 3027 : 0}px`,
        }}
      />
      {mapElements}
    </div>
  );
}

export default MapContent;
