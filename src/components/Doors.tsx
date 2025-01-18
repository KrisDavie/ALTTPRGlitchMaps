import { JSX } from "react/jsx-runtime"
import { DoorData } from "../types"

interface DoorsProps {
  doorData: DoorData[]
}

function Doors(props: DoorsProps) {
  const { doorData } = props

  const createOverlays = () => {
    const overlays: JSX.Element[] = []
    const tileWidth = 8192 / 16
    const tileHeight = 8192 / 16
    doorData.forEach(door => {
      const tileX = parseInt(door.tile.TileID.slice(-1), 16)
      const tileY = parseInt(door.tile.TileID.slice(-2, -1), 16)
      const top = tileY * tileHeight
      const left = tileX * tileWidth
      overlays.push(
        <div
          title={door["Name"]}
          style={{
            position: "absolute",
            top: top + door["y"] - 12,
            left: left + door["x"] - 12,
            width: "24px",
            height: "24px",
            borderRadius: "2px",
          }}
          key={door["Name"]}
        />
      )
    })
    return overlays
  }

  return <div>{createOverlays()}</div>
}

export default Doors
