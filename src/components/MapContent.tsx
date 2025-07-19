import { useState } from "react"
import TileOverlays from "./TileOverlays"
import DropLocations from "./DropLocations"
import DoorGlitches from "./DoorGlitches"
import NonDoorGlitches from "./NonDoorGlitches"
import HookPushLocations from "./HookPushLocations"
import MapImage from "./MapImage"

import {
  useGetDoorsQuery,
  useGetHookPushesQuery,
  useGetNonDoorGlitchesQuery,
} from "../app/apiSlice"
import Doors from "./Doors"
import { useAppSelector } from "../app/hooks"
import QuadrantLines from "./QuadrantLines"

interface MapContentProps {
  zoomToElement: (element: string) => void
  currentScale: number
}

function MapContent(props: MapContentProps) {
  const { zoomToElement, currentScale } = props
  const [selectedTile, setSelectedTile] = useState("")
  const [previousTile, setPreviousTile] = useState("")
  const [highlightTile, setHighlightTile] = useState(false)

  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const showQuadrantLines = useAppSelector(state => state.app.showQuadrantLines)

  const updateSelectedTile = (source: string, dest: string) => {
    setPreviousTile(source)
    setSelectedTile(dest)
    setHighlightTile(true)
    setTimeout(() => {
      setHighlightTile(false)
    }, 1000)
  }

  const mapElements = []

  let mapImage = ""
  let somariaPits = ""

  switch (selectedMap) {
    case "EG1":
      mapImage = "images/eg_map_fully_annotated"
      somariaPits = "images/eg_somaria_pits"
      break
    case "EG2":
      mapImage = "images/eg2_map_fully_annotated"
      somariaPits = "images/eg2_somaria_pits"
      break
    case "LW":
      mapImage = "images/lightworld_large"
      somariaPits = ""
      break
    case "DW":
      mapImage = "images/darkworld_large"
      somariaPits = ""
      break
    default:
      mapImage = "images/eg_map_fully_annotated"
      somariaPits = "images/eg_somaria_pits"
  }

  const { data: doorData, isLoading: doorsLoading } =
    useGetDoorsQuery(selectedMap)

  const { data: nonDoorGlitchData } = useGetNonDoorGlitchesQuery(selectedMap)
  const { data: hookPushData } = useGetHookPushesQuery(selectedMap)

  mapElements.push(
    <TileOverlays
      selectedTile={selectedTile}
      previousTile={previousTile}
      highlightTile={highlightTile}
      key="TileOverlays"
    />
  )

  showQuadrantLines && mapElements.push(<QuadrantLines key="QuadrantLines" />)

  if (selectedMap === "EG1" || selectedMap === "EG2") {
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
    )
    if (doorData && !doorsLoading) {
      mapElements.push(<Doors doorData={doorData} key="Doors" />)
      mapElements.push(
        <DoorGlitches
          zoomToElement={zoomToElement}
          doorData={doorData}
          key="DoorGlitches"
        />
      )
    }
  }

  hookPushData &&
    mapElements.push(
      <HookPushLocations
        zoomToElement={zoomToElement}
        hookpushData={hookPushData}
        key="HookPushLocations"
      />
    )

  nonDoorGlitchData &&
    mapElements.push(
      <NonDoorGlitches
        zoomToElement={zoomToElement}
        nonDoorGlitchData={nonDoorGlitchData}
        key="NonDoorGlitches"
      />
    )

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
      />

      {mapElements}
    </div>
  )
}

export default MapContent
