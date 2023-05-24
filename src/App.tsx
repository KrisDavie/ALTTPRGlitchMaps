import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  MiniMap,
  useTransformContext,
} from "react-zoom-pan-pinch";
import DropLocations from "./components/DropLocations";
import TileOverlays from "./components/TileOverlays";
import MapContent from "./components/MapContent";
import PageSidebar from "./components/Sidebar";

function App() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const initialScale = 1;
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
  ]);
  const [selectedGlitch, setSelectedGlitch] = useState<string>("");
  const [glitchText, setGlitchText] = useState<string[]>([
    "Click a glitch for informaton...",
    "",
  ]);

  const Controls = ({ resetTransform }: { resetTransform: () => void }) => (
    <div className="controls">
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

  const egImageSize = { width: 8192, height: 8192 };

  return (
    <React.Fragment>
      <PageSidebar
        visible={sidebarVisible}
        selectedGlitches={selectedGlitches}
        setSelectedGlitches={setSelectedGlitches}
        glitchText={glitchText}
      />
      <TransformWrapper
        initialScale={initialScale}
        initialPositionX={
          (-egImageSize.width * initialScale) / 2 + windowSize.current.width / 2
        }
        initialPositionY={
          (-egImageSize.height * initialScale) / 2 +
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
        {({ zoomToElement, resetTransform }) => (
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
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </React.Fragment>
  );
}

export default App;
