import React, { useState } from "react";
import TileOverlays from "./TileOverlays";
import DropLocations from "./DropLocations";
import DoorGlitches from "./DoorGlitches";
import NonDoorGlitches from "./NonDoorGlitches";
import HookPushLocations from "./HookPushLocations";
import MapImage from "./MapImage";

import eg1doorData from "../data/EG1/doorData.json";
import eg1doorGlitchData from "../data/EG1/doorGlitchData.json";
import eg1hookpushData from "../data/EG1/hookpushData.json";
import eg1nonDoorGlitchData from "../data/EG1/nonDoorGlitchData.json";
import eg1tileData from "../data/EG1/tileData.json";

import eg2tileData from "../data/EG2/tileData.json";

import lwNonDoorGlitchData from "../data/LW/nonDoorGlitchData.json";

import dwNonDoorGlitchData from "../data/DW/nonDoorGlitchData.json";
import { SelectedGlitch } from "../types";

interface MapContentProps {
  zoomToElement: (element: string) => void;
  currentScale: number;
  enabledGlitches: string[];
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  showSomariaPits: boolean;
  selectedGlitch: SelectedGlitch;
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
}

function MapContent(props: MapContentProps) {
  const {
    zoomToElement,
    currentScale,
    enabledGlitches,
    selectedMap,
    showSomariaPits,
    setSelectedGlitch,
    selectedGlitch,
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
  let nonDoorGlitchData;
  let doorGlitchData;
  let hookpushData;
  let doorData;

  let mapImage = "";
  let somariaPits = "";

  switch (selectedMap) {
    case "EG1":
      mapImage = "images/eg_map_fully_annotated";
      somariaPits = "images/eg_somaria_pits";
      nonDoorGlitchData = eg1nonDoorGlitchData;
      doorGlitchData = eg1doorGlitchData;
      hookpushData = eg1hookpushData;
      doorData = eg1doorData;
      break;
    case "EG2":
      mapImage = "images/eg2_map_fully_annotated";
      somariaPits = "images/eg2_somaria_pits";
      break;
    case "LW":
      mapImage = "images/lightworld_large";
      somariaPits = "";
      nonDoorGlitchData = lwNonDoorGlitchData;
      break;
    case "DW":
      mapImage = "images/darkworld_large";
      somariaPits = "";
      nonDoorGlitchData = dwNonDoorGlitchData;
      break;
    default:
      mapImage = "images/eg_map_fully_annotated";
      somariaPits = "images/eg_somaria_pits";
  }

  if (selectedMap === "EG1" || selectedMap === "EG2") {
    mapElements.push(
      <TileOverlays
        selectedTile={selectedTile}
        previousTile={previousTile}
        highlightTile={highlightTile}
        key="TileOverlays"
        egMap={selectedMap}
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
        tileData={selectedMap === "EG1" ? eg1tileData : eg2tileData}
        key="DropLocations"
      />
    );
  }
  if (doorData && doorGlitchData) {
    mapElements.push(
      <DoorGlitches
        enabledGlitches={enabledGlitches}
        zoomToElement={zoomToElement}
        setSelectedGlitch={setSelectedGlitch}
        selectedMap={selectedMap}
        doorData={doorData}
        doorGlitchData={doorGlitchData}
        selectedGlitch={selectedGlitch}
        key="DoorGlitches"
      />
    );
  }
  if (hookpushData) {
    mapElements.push(
      <HookPushLocations
        enabledGlitches={enabledGlitches}
        zoomToElement={zoomToElement}
        setSelectedGlitch={setSelectedGlitch}
        selectedMap={selectedMap}
        hookpushData={hookpushData}
        selectedGlitch={selectedGlitch}
        key="HookPushLocations"
      />
    );
  }
  if (nonDoorGlitchData) {
    mapElements.push(
      <NonDoorGlitches
        enabledGlitches={enabledGlitches}
        zoomToElement={zoomToElement}
        setSelectedGlitch={setSelectedGlitch}
        selectedMap={selectedMap}
        nonDoorGlitchData={nonDoorGlitchData}
        selectedGlitch={selectedGlitch}
        key="NonDoorGlitches"
      />
    );
  }

  // Set map image basec on selected map

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <MapImage
        src={`${mapImage}.png`}
        width={8192}
        height={selectedMap === "EG2" ? 1536 : 8192}
        mapImage={mapImage}
        somariaPits={`${somariaPits}.png`}
        selectedMap={selectedMap}
        showSomariaPits={showSomariaPits}
      />

      {mapElements}
    </div>
  );
}

export default MapContent;
