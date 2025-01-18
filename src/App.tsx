import { useCallback, useEffect, useRef, useState } from "react"
import "./App.css"
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch"
import MapContent from "./components/MapContent"
import PageSidebar from "./components/Sidebar"
import { useSearchParams } from "./components/SearchParamsHook"
import { useSearchParams as useReactSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  setSelectedMap,
  setEnabledGlitches,
  setSelectedGlitch,
  checkMousePosition,
} from "./app/appSlice"

function App() {
  const dispatch = useAppDispatch()

  const { map: mapParams, glitchName } = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useReactSearchParams()

  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)
  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const initialScale = 0.5
  const [currentScale, setCurrentScale] = useState(1)
  const [sidebarVisible, setSidebarVisible] = useState(
    windowSize.current.width > 800
  )

  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const selectedGlitch = useAppSelector(state => state.app.selectedGlitch)
  const mousePosition = useAppSelector(state => state.app.mousePosition)
  const showMousePosition = useAppSelector(state => state.app.showMousePosition)

  useEffect(() => {
    switch (selectedMap) {
      case "EG1":
      case "EG2":
        dispatch(
          setEnabledGlitches([
            "Supertile YBA",
            "Bomb Juke",
            "Stairmaster",
            "Subtile YBA",
            "Jingle Glitch",
            "Quadrant Glitch",
            "Double YBA",
            "Somaria",
            "Somaria Supertile YBA",
            "Spin Supertile YBA",
            "Spin Subtile YBA",
            "Spin Somaria",
            "Statue Drag",
            "Deathhole/0hp",
            "hookpush-Somaria",
            "hookpush-Boomerang",
            "hookpush-Stuckpush",
          ])
        )
        break
      case "LW":
      case "DW":
        dispatch(
          setEnabledGlitches([
            "Bomb Clip",
            "Spinspeed Clip/Clip Through",
            "Citrus Clip",
            "Overworld Conveyor Down",
            "Overworld Conveyor Up",
            "Deathhole/0hp",
            "Swim Clip",
            "Mirror Clip/Portal Offset",
            "Mirror Wrap",
            "Mirrorless Wrap",
            "Overworld YBA",
            "Up Teleport",
            "Down Teleport",
            "Treewarp",
          ])
        )
        break
    }
  }, [selectedMap, dispatch])

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
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          color: "white",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "8px",
          width: "fit-content",
          display: showMousePosition ? "block" : "none"
        }}
      >
        <div>Mouse X: {mousePosition.x}</div>
        <div>Mouse Y: {mousePosition.y}</div>
        {<div>Tile: {selectedMap.startsWith('EG') ? mousePosition.tile : 'N/A'}</div>}
      </div>
    </div>
  )

  const curImageSize = {
    width: 8192,
    height: selectedMap === "EG2" ? 1536 : 8192,
  }

  const enableMousePos = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Control") return
      dispatch(checkMousePosition(true))
    },
    [dispatch]
  )

  const disableMousePos = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Control") return
      dispatch(checkMousePosition(false))
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener("keydown", enableMousePos)
    document.addEventListener("keyup", disableMousePos)

    return () => {
      document.removeEventListener("keydown", enableMousePos)
      document.removeEventListener("keyup", disableMousePos)
    }
  }, [enableMousePos, disableMousePos])

  useEffect(() => {
    if (glitchName || mapParams) {
      setSearchParams({})
    }

    if (mapParams && mapParams !== selectedMap) {
      dispatch(setSelectedMap(mapParams))
    }

    if (glitchName && glitchName !== selectedGlitch?.id) {
      dispatch(setSelectedGlitch({ glitch: undefined, id: glitchName }))
    }

    return () => {}
  }, [
    mapParams,
    selectedMap,
    dispatch,
    glitchName,
    selectedGlitch,
    setSearchParams,
  ])

  return (
    <>
      <PageSidebar
        visible={sidebarVisible}
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
        onZoom={zoom => {
          setCurrentScale(zoom.state.scale)
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
              />
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </>
  )
}

export default App
