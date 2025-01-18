import { JSX } from "react/jsx-runtime"
import { directionToRotation } from "../utils"
import { DoorData, Glitch } from "../types"
import GlitchImage from "./GlitchImage"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setSelectedGlitch } from "../app/appSlice"

interface DoorGlitchesProps {
  zoomToElement: (element: string, scale: number) => void
  doorData: DoorData[]
}

function DoorGlitches(props: DoorGlitchesProps) {
  const { doorData, zoomToElement } = props

  const dispatch = useAppDispatch()

  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const enabledGlitches = useAppSelector(state => state.app.enabledGlitches)

  function handleClick(glitch: Glitch, id: string) {
    dispatch(setSelectedGlitch({ glitch, id }))
    zoomToElement(id, selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6)
  }

  const getGlitchesGrid = (data: DoorData, enabledGlitches: string[]) => {
    // Do we have a single glitch? Then just use an icon
    if (!data.door_glitches) {
      return <div />
    }
    if (data.door_glitches.length === 1) {
      const glitch = data.door_glitches[0]
      if (enabledGlitches.includes(glitch.Type)) {
        const glitchId = `dg-${glitch.Title.replace(/ /g, "-")}`
        ;<GlitchImage
          glitch={glitch}
          glitchId={glitchId}
          key={glitchId}
          handleClick={handleClick}
        />
      }
    }
    // Otherwise, we have multiple glitches, so use a grid
    const grid = []
    for (let i = 0; i < 3; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j
        const glitch = data.door_glitches[index]
        const id = `door-glitches-${data.Name}-${index}`
        if (glitch) {
          if (enabledGlitches.includes(glitch.Type)) {
            const glitchId = `dg-${glitch.Title.replace(/ /g, "-")}`
            row.push(
              <GlitchImage
                glitch={glitch}
                glitchId={glitchId}
                key={glitchId}
                handleClick={handleClick}
              />
            )
          } else {
            row.push(<div key={id} />)
          }
        } else {
          row.push(<div key={id} />)
        }
      }
      grid.push(<div key={`door-glitches-${data.Name}-col${i}`}>{row}</div>)
    }
    return grid
  }

  const createOverlays = () => {
    const overlays: JSX.Element[] = []
    const tileWidth = 8192 / 16
    const tileHeight = 8192 / 16
    doorData.forEach(door => {
      // Extract last 2 characters of tile name
      const tileX = parseInt(door.tile.TileID.slice(-1), 16)
      const tileY = parseInt(door.tile.TileID.slice(-2, -1), 16)
      const top = tileY * tileHeight
      const left = tileX * tileWidth
      if (door.door_glitches && door.door_glitches.length > 0) {
        const glitchGrid = getGlitchesGrid(door, enabledGlitches)
        if (glitchGrid) {
          overlays.push(
            <div
              style={{
                position: "absolute",
                top: top + door.y - 32,
                left: left + door.x - 32,
                width: "64px",
                height: "64px",
                borderRadius: "5px",
                transform: `rotate(${directionToRotation(door.Direction)}deg)`,
              }}
              key={`${door.Name}-glitch-grid`}
            >
              {glitchGrid}
            </div>
          )
        }
      }
    })
    return overlays
  }

  return <div>{createOverlays()}</div>
}

export default DoorGlitches
