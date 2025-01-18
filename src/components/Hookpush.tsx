import { useCallback, useEffect } from "react"
import { directionToRotation } from "../utils"
import { HookpushData } from "../types"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setSelectedGlitch } from "../app/appSlice"

type HookPushProps = {
  hookpushData: HookpushData
  topOffset: number
  leftOffset: number
  zoomToElement: (element: string, scale: number) => void
}

function Hookpush({
  hookpushData,
  topOffset,
  leftOffset,
  zoomToElement,
}: HookPushProps) {
  const dispatch = useAppDispatch()
  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const selectedGlitch = useAppSelector(state => state.app.selectedGlitch)

  const handleClick = useCallback(
    (glitch: HookpushData, id: string) => {
      dispatch(setSelectedGlitch({ glitch, id }))
      zoomToElement(
        id,
        selectedMap === "EG1" || selectedMap === "EG2" ? 1 : 0.6
      )
    },
    [dispatch, zoomToElement, selectedMap]
  )

  const type = hookpushData.Type
  const length = hookpushData.Distance
  const direction = hookpushData.Direction
  const glitchName = hookpushData.Title

  const misslot =
    type === "Somaria"
      ? "images/somaria_block.png"
      : type === "Boomerang"
      ? "images/blue_boom.png"
      : "images/hook_link_square.png"
  const head =
    direction === "So" || direction === "Ea" ? "images/hook_head.png" : misslot
  const middle =
    direction === "No" || direction === "So"
      ? "images/hook_link.png"
      : "images/hook_link_horiz.png"
  const end =
    direction === "So" || direction === "Ea" ? misslot : "images/hook_head.png"
  const rotation = directionToRotation(direction)
  const endpointStyle = {
    transform: `rotate(${rotation}deg)`,
    width: "32px",
  }
  const lengthRemove = type === "Somaria" || type === "Boomerang" ? 56 : 48
  const middleStyle = {
    height:
      direction === "No" || direction === "So"
        ? `${length - lengthRemove}px`
        : "32px",
    width:
      direction === "No" || direction === "So"
        ? "32px"
        : `${length - lengthRemove}px`,
  }

  const glitchId = `hp-${glitchName.replace(/ /g, "-")}`

  useEffect(() => {
    if (selectedGlitch.id === glitchId && !selectedGlitch.glitch) {
      handleClick(hookpushData, glitchId)
    }
  }, [selectedGlitch, glitchId, hookpushData, handleClick])

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        flexDirection:
          direction === "No" || direction === "So" ? "column" : "row",
        top: hookpushData.y + topOffset,
        left: hookpushData.x + leftOffset,
        zIndex: selectedGlitch.glitch === hookpushData ? 110 : 100,
        outline:
          selectedGlitch.glitch === hookpushData ? "5px solid white" : "",
      }}
      title={glitchName}
      onClick={() => handleClick(hookpushData, glitchId)}
      id={glitchId}
    >
      <img src={end} alt="end1" style={endpointStyle} />
      <div
        style={{
          backgroundImage: `url(${middle})`,
          backgroundRepeat: "repeat",
          ...middleStyle,
        }}
      />
      <img src={head} alt="end2" style={endpointStyle} />
    </div>
  )
}

export default Hookpush
