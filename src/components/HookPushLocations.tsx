import { useMemo } from "react"
import Hookpush from "./Hookpush"
import { JSX } from "react/jsx-runtime"
import { HookpushData } from "../types"
import { useAppSelector } from "../app/hooks"

interface HookPushLocationsProps {
  zoomToElement: (element: string, scale: number) => void
  hookpushData: HookpushData[]
}

function HookPushLocations(props: HookPushLocationsProps) {
  const { hookpushData, zoomToElement } = props
  const tileWidth = 8192 / 16
  const tileHeight = 8192 / 16

  const enabledGlitches = useAppSelector(state => state.app.enabledGlitches)

  const pushes: JSX.Element[] = useMemo(() => {
    const pushData: JSX.Element[] = []
    hookpushData.forEach(hookpush => {
      const tileX = hookpush.tile
        ? parseInt(hookpush.tile.TileID.slice(-1), 16)
        : 0
      const tileY = hookpush.tile
        ? parseInt(hookpush.tile.TileID.slice(-2, -1), 16)
        : 0
      const top = tileY * tileHeight
      const left = tileX * tileWidth
      if (enabledGlitches.includes(`hookpush-${hookpush.Type}`)) {
        pushData.push(
          <Hookpush
            hookpushData={hookpush}
            topOffset={top}
            leftOffset={left}
            zoomToElement={zoomToElement}
            key={`${hookpush.Title}-${hookpush.Type}`}
          />
        )
      }
    })
    return pushData
  }, [zoomToElement, enabledGlitches, hookpushData, tileHeight, tileWidth])
  return <div>{pushes}</div>
}

export default HookPushLocations
