import { useState } from "react"
import { useGetTilesDataQuery } from "../app/apiSlice"
import { setMousePosition } from "../app/appSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"

interface TileOverlaysProps {
  selectedTile: string
  previousTile: string
  highlightTile: boolean
}

function TileOverlays(props: TileOverlaysProps) {
  const { selectedTile, highlightTile, previousTile } = props
  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const { data: tileData } = useGetTilesDataQuery(selectedMap)
  const checkMousePosition = useAppSelector(
    state => state.app.checkMousePosition
  )

  const dispatch = useAppDispatch()

  const [overTile, setOverTile] = useState("")

  const makeTile = (tile: string, kind: string) => {
    const tileWidth = kind === "ow" ? 8192 : 8192 / 16
    const tileHeight = kind === "ow" ? 8192 : 8192 / 16
    const top = parseInt(tile[5], 16) * tileHeight
    const left = parseInt(tile[6], 16) * tileWidth
    return (
      <div
        id={tile}
        key={`${tile}-${kind}-overlay`}
        onMouseEnter={() => setOverTile(tile)}
        onMouseMove={e => {
          if (!checkMousePosition || overTile !== tile || !e.ctrlKey) return
          const bounds = (e.target as HTMLElement).getBoundingClientRect()
          const x = Math.round(
            ((e.clientX - bounds.left) / bounds.width) * tileWidth
          )
          const y = Math.round(
            ((e.clientY - bounds.top) / bounds.height) * tileHeight
          )
          if (0 > x || x >= tileWidth || 0 > y || y >= tileHeight) return
          dispatch(setMousePosition({ x, y, tile }))
        }}
        style={{
          position: "absolute",
          top,
          left,
          width: tileWidth,
          height: tileHeight,
          backgroundColor:
            ["selected", "previous"].includes(kind) && highlightTile
              ? "rgba(128, 128, 128, 0.5)"
              : "transparent",
          transition: "all .5s ease",
          WebkitTransition: "all .5s ease",
          MozTransition: "all .5s ease",
          zIndex: 1000,
          pointerEvents: checkMousePosition ? "all" : "none",
        }}
      />
    )
  }

  return (
    <div>
      {tileData && tileData.length > 0
        ? tileData.map(tile => {
            let type = "normal"
            if (tile.TileID === selectedTile) {
              type = "selected"
            } else if (tile.TileID === previousTile) {
              type = "previous"
            }
            return makeTile(tile.TileID, type)
          })
        : makeTile("tile-00", "ow")}
    </div>
  )
}

export default TileOverlays
