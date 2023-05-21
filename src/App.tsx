import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
  MiniMap,
} from "react-zoom-pan-pinch";
import DropLocations from "./components/DropLocations";
import TileOverlays from "./components/TileOverlays";
import MapContent from "./components/MapContent";

function App() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const initialScale = 1;

  const Controls = ({ resetTransform }: { resetTransform: () => void }) => (
    <>
      <button onClick={() => resetTransform()}>x</button>
    </>
  );

  const egImageSize = { width: 8192, height: 8192 };

  return (
    <TransformWrapper
      initialScale={initialScale}
      initialPositionX={
        (-egImageSize.width * initialScale) / 2 + windowSize.current.width / 2
      }
      initialPositionY={
        (-egImageSize.height * initialScale) / 2 + windowSize.current.height / 2
      }
      minScale={0.1}
      wheel={{ step: 0.05 }}
      ref={transformComponentRef}
    >
      {({ zoomToElement, resetTransform }) => (
        <React.Fragment>
          <Controls resetTransform={resetTransform} />
          <TransformComponent
            wrapperStyle={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 1px)",
            }}
          >
            <MapContent zoomToElement={zoomToElement} />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default App;
