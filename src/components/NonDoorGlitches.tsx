import { useMemo } from "react"
import { JSX } from "react/jsx-runtime"
import { directionToRotation } from "../utils"
import { NonDoorGlitchData, Glitch } from "../types"
import GlitchImage from "./GlitchImage"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setSelectedGlitch } from "../app/appSlice"

interface NonDoorGlitchesProps {
  zoomToElement: (element: string, scale: number) => void
  nonDoorGlitchData: NonDoorGlitchData[]
}

function NonDoorGlitches(props: NonDoorGlitchesProps) {
  const { nonDoorGlitchData, zoomToElement } = props

  const dispatch = useAppDispatch()

  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const enabledGlitches = useAppSelector(state => state.app.enabledGlitches)

  function handleClick(glitch: Glitch, id: string) {
    dispatch(setSelectedGlitch({ glitch, id }))
    zoomToElement(id, selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6)
  }

  const groupedGlitches: {
    [key: string]: {
      [key: string]: NonDoorGlitchData[]
    }
  } = useMemo(() => {
    const grouped: {
      [key: string]: {
        [key: string]: NonDoorGlitchData[]
      }
    } = {}

    nonDoorGlitchData.forEach(glitch => {
      const tile = glitch.tile?.TileID ?? "tile-00"
      const x = glitch.x
      const y = glitch.y
      if (!grouped[tile]) {
        grouped[tile] = {}
      }
      if (!grouped[tile][`${x}-${y}`]) {
        grouped[tile][`${x}-${y}`] = []
      }
      grouped[tile][`${x}-${y}`].push(glitch)
    })
    return grouped
  }, [nonDoorGlitchData])

  const getGlitchesGrid = (
    glitches: NonDoorGlitchData[],
    enabledGlitches: string[]
  ) => {
    // Do we have a single glitch? Then just use an icon
    if (glitches.length === 0) {
      return <div />
    }
    if (glitches.length === 1) {
      const glitch = glitches[0]
      if (enabledGlitches.includes(glitch.Type)) {
        const glitchId = `ndg-${glitch.Title.replace(/ /g, "-")}`

        return (
          <GlitchImage
            glitch={glitch}
            glitchId={glitchId}
            key={glitchId}
            handleClick={handleClick}
          />
        )
      }
    }
    // Otherwise, we have multiple glitches, so use a grid
    const grid = []
    for (let i = 0; i < 3; i++) {
      const row = []
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j
        const glitch = glitches[index]
        if (glitch) {
          const id = `nondoor-glitches-${glitch.Type}-${index}`
          if (enabledGlitches.includes(glitch.Type)) {
            const glitchId = `ndg-${glitch.Title.replace(/ /g, "-")}`
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
          row.push(
            <div key={`nondoor-glitches-${glitches[0].Title}-${index}`} />
          )
        }
      }
      grid.push(<div key={`${glitches[0].Title}-col${i}`}>{row}</div>)
    }
    return grid
  }

  const createOverlays = () => {
    const overlays: JSX.Element[] = []
    const tileWidth = 8192 / 16
    const tileHeight = 8192 / 16

    Object.keys(groupedGlitches).forEach(tile => {
      // Extract last 2 characters of tile name
      const tileX = parseInt(tile.slice(-1), 16)
      const tileY = parseInt(tile.slice(-2, -1), 16)
      const top = tileY * tileHeight
      const left = tileX * tileWidth
      Object.values(groupedGlitches[tile]).forEach(location => {
        const glitchGrid = getGlitchesGrid(location, enabledGlitches)
        if (glitchGrid) {
          overlays.push(
            <div
              style={{
                position: "absolute",
                top: top + location[0].y - 32,
                left: left + location[0].x - 32,
                width: "64px",
                height: "64px",
                borderRadius: "5px",
                transform: `rotate(${directionToRotation(
                  location[0].Direction
                )}deg)`,
              }}
              key={`${tile}-${location[0].x}-${location[0].y}`}
            >
              {glitchGrid}
            </div>
          )
        }
      })
    })
    return overlays
  }

  return <div>{createOverlays()}</div>
}

export default NonDoorGlitches
