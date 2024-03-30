import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import MapContent from "./components/MapContent";
import PageSidebar from "./components/Sidebar";
import { useSearchParams } from "./components/SearchParamsHook";
import { SelectedGlitch } from "./types";
import { useSearchParams as useReactSearchParams } from "react-router-dom";

function App() {
  const { map: mapParams, glitchName } = useSearchParams();
  const [_, setSearchParams] = useReactSearchParams();

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const initialScale = 0.5;
  const [currentScale, setCurrentScale] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(windowSize.current.width > 800);
  const [showSomariaPits, setShowSomariaPits] = useState(false);
  const [enabledGlitches, setEnabledGlitches] = useState<string[]>([
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
  const [selectedGlitch, setSelectedGlitch] = useState<SelectedGlitch>({
    glitch: undefined,
    id: "",
  });
  const [selectedMap, setSelectedMap] = useState<"EG1" | "EG2" | "LW" | "DW">(
    "EG1"
  );

  const handleMapChange = (map: "EG1" | "EG2" | "LW" | "DW") => {
    setSelectedMap(map);
    switch (map) {
      case "EG1":
      case "EG2":
        setEnabledGlitches([
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
        setEnabledGlitches([
          "boots",
          "teleportUp",
          "teleportDown",
          "flippers",
          "citrus",
          "mirrorPortal",
          "conveyorUp",
          "conveyorDown",
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

  useEffect(() => {
    if (glitchName || mapParams) {
      setSearchParams({});
    }

    if (mapParams && mapParams !== selectedMap) {
      handleMapChange(mapParams);
    }

    if (glitchName && glitchName !== selectedGlitch?.glitch?.glitchName) {
      setSelectedGlitch({ glitch: undefined, id: glitchName });
    }

    return () => {};
  }, [mapParams, selectedMap, glitchName, selectedGlitch, setSearchParams]);

  return (
    <>
      <PageSidebar
        visible={sidebarVisible}
        selectedGlitch={selectedGlitch}
        enabledGlitches={enabledGlitches}
        showSomariaPits={showSomariaPits}
        setEnabledGlitches={setEnabledGlitches}
        setSelectedGlitch={setSelectedGlitch}
        setShowSomariaPits={setShowSomariaPits}
        selectedMap={selectedMap}
        setSelectedMap={handleMapChange}
        transformComponentRef={transformComponentRef}
        currentScale={currentScale}
      />
      <TransformWrapper
        initialScale={initialScale}
        initialPositionX={
          (-curImageSize.width * initialScale) / 2 +
          windowSize.current.width / 2 -
          292
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
                setSelectedGlitch={setSelectedGlitch}
                showSomariaPits={showSomariaPits}
                selectedGlitch={selectedGlitch}
                enabledGlitches={enabledGlitches}
                selectedMap={selectedMap}
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </>
  );
}

export default App;
