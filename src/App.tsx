import React, { useRef, useState } from "react";
import "./App.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import MapContent from "./components/MapContent";
import PageSidebar from "./components/Sidebar";

function App() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const initialScale = 0.5;
  const [currentScale, setCurrentScale] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedGlitches, setSelectedGlitches] = useState<string[]>([
    "redYBA",
    "greenYBA",
    "blueYBA",
    "somaria",
    "bomb",
    "boots",
    "spinGreenYBA",
    "spinBlueYBA",
    "quadrant",
    "jingle",
    "spinSomaria",
    "statueDrag",
    "somariaBlueYBA",
    "hookpush-somaria",
    "hookpush-boom",
    "hookpush-push",
  ]);
  const [selectedGlitch, setSelectedGlitch] = useState<string>("");
  const [selectedMap, setSelectedMap] = useState<"EG1" | "EG2" | "LW" | "DW">(
    "EG1"
  );

  const [glitchText, setGlitchText] = useState<string[]>([
    "Click a glitch for informaton...",
    "",
  ]);

  const handleMapChange = (map: "EG1" | "EG2" | "LW" | "DW") => {
    setSelectedMap(map);
    switch (map) {
      case "EG1":
      case "EG2":
        setSelectedGlitches([
          "redYBA",
          "greenYBA",
          "blueYBA",
          "somaria",
          "bomb",
          "boots",
          "spinGreenYBA",
          "spinBlueYBA",
          "quadrant",
          "jingle",
          "spinSomaria",
          "statueDrag",
          "somariaBlueYBA",
          "hookpush-somaria",
          "hookpush-boom",
          "hookpush-push",
        ]);
        break;
      case "LW":
      case "DW":
        setSelectedGlitches([
          "boots",
          "teleportUp",
          "teleportDown",
          "flippers",
          "citrus",
          "mirrorPortal",
          "mirrorWrap",
          "mirrorlessWrap",
          "owYBA",
          "bomb",
        ]);
        break;
    }
  };

  const Controls = ({ resetTransform }: { resetTransform: () => void }) => (
    <div className="controls" style={{ zIndex: 110 }}>
      <button className="controlsButton" onClick={() => resetTransform()}>
        Reset Zoom + Location
      </button>
      <button
        className="controlsButton"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        Show/Hide Sidebar
      </button>
    </div>
  );

  const curImageSize = {
    width: 8192,
    height: selectedMap === "EG2" ? 1536 : 8192,
  };

  return (
    <React.Fragment>
      <PageSidebar
        visible={sidebarVisible}
        selectedGlitches={selectedGlitches}
        setSelectedGlitches={setSelectedGlitches}
        glitchText={glitchText}
        selectedMap={selectedMap}
        setSelectedMap={handleMapChange}
        transformComponentRef={transformComponentRef}
      />
      <TransformWrapper
        initialScale={initialScale}
        initialPositionX={
          (-curImageSize.width * initialScale) / 2 +
          windowSize.current.width / 2
        }
        initialPositionY={
          (-curImageSize.height * initialScale) / 2 +
          windowSize.current.height / 2
        }
        minScale={0.1}
        wheel={{ step: 0.05 }}
        ref={transformComponentRef}
        onZoom={(zoom) => {
          setCurrentScale(zoom.state.scale);
        }}
        limitToBounds={false}
      >
        {({ zoomToElement, resetTransform, setTransform }) => (
          <div>
            <Controls resetTransform={resetTransform} />
            <TransformComponent
              wrapperStyle={{
                maxWidth: "100%",
                maxHeight: "calc(100vh - 1px)",
                backgroundColor: "#322d38",
              }}
            >
              <MapContent
                zoomToElement={zoomToElement}
                currentScale={currentScale}
                selectedGlitches={selectedGlitches}
                setGlitchText={setGlitchText}
                selectedMap={selectedMap}
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </React.Fragment>
  );
}

export default App;
