import { TileData } from "../types"
import { JSX } from "react/jsx-runtime"
import { useGetTilesDataQuery } from "../app/apiSlice"
import { useAppSelector } from "../app/hooks"

interface QuadrantLineProps {
  tileData: TileData[]
}

const createQuadLines = (props: QuadrantLineProps) => {
  const {
    tileData,
  } = props

  const lines: JSX.Element[] = []
  const tileWidth = 8192 / 16
  const tileHeight = 8192 / 16

  tileData.forEach(tile => {
    const tileId = tile.TileID
    const hstart = parseInt(tileId[6], 16) * tileHeight + (tileHeight / 2)
    const vstart = parseInt(tileId[5], 16) * tileWidth + (tileWidth / 2)
    if (tile.VQuadLine) {
      lines.push(
        <div
          key={`${tileId}-v`}
          style={{
            position: "absolute",
            left: `${hstart}px`,
            top: `${vstart - (tileHeight / 2)}px`,
            width: "1px",
            height: `${tileHeight}px`,
            backgroundColor: "cyan",
            pointerEvents: "none",
          }}
        />
      )
    }
    if (tile.HQuadLine) {
      lines.push(
        <div
          key={`${tileId}-h`}
          style={{
            position: "absolute",
            left: `${hstart - (tileWidth / 2)}px`,
            top: `${vstart}px`,
            width: `${tileWidth}px`,
            height: "1px",
            backgroundColor: "cyan",
            pointerEvents: "none",
          }}
        />
      )
    }
  })
  return lines
}

function DropLocations() {
  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const { data: tileData, isLoading } = useGetTilesDataQuery(selectedMap)

  return isLoading || tileData === undefined ? (
    <></>
  ) : (
    <div>{createQuadLines({ tileData })}</div>
  )
}

export default DropLocations
