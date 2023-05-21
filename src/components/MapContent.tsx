import React from "react";
import TileOverlays from "./TileOverlays";
import DropLocations from "./DropLocations";
import { ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";

interface MapContentProps {
  zoomToElement: (element: string) => void;
}

function MapContent(props: MapContentProps) {
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
      <TileOverlays />
      <DropLocations zoomToElement={props.zoomToElement} />
    </div>
  );
}

export default MapContent;
