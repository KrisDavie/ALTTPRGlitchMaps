import React, { useRef, useState } from "react";
import TileOverlays from "./TileOverlays";
import DropLocations from "./DropLocations";
import { ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";
import DoorGlitches from "./DoorGlitches";
import NonDoorGlitches from "./NonDoorGlitches";
import Hookpush from "./Hookpush";
import HookPushLocations from "./HookPushLocations";

interface MapContentProps {
  zoomToElement: (element: string) => void;
  currentScale: number;
  selectedGlitches: string[];
  setGlitchText: React.Dispatch<React.SetStateAction<string[]>>;
}

function MapContent(props: MapContentProps) {
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

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <img
        src="images/eg_map_fully_annotated.png"
        alt="EG1 Image"
        id="eg1-image"
        style={{ height: "100%" }}
      />
      <TileOverlays selectedTile={selectedTile} highlightTile={highlightTile} />
      <DoorGlitches
        selectedGlitches={props.selectedGlitches}
        setGlitchText={props.setGlitchText}
      />
      <HookPushLocations
        selectedGlitches={props.selectedGlitches}
        setGlitchText={props.setGlitchText}
      />
      <NonDoorGlitches
        selectedGlitches={props.selectedGlitches}
        setGlitchText={props.setGlitchText}
      />
      <DropLocations
        zoomToElement={props.zoomToElement}
        currentScale={props.currentScale}
        onSelectTile={(source: string, dest: string) =>
          updateSelectedTile(source, dest)
        }
        selectedTile={selectedTile}
        previousTile={previousTile}
      />
    </div>
  );
}

export default MapContent;
