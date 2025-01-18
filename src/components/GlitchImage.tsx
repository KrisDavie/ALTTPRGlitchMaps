import { Image } from "semantic-ui-react"
import { glitchToImage } from "../utils"
import { useEffect } from "react"
import { DoorGlitchData, Glitch, NonDoorGlitchData } from "../types"
import { useAppSelector } from "../app/hooks"

interface GlitchImageProps {
  glitchId: string
  glitch: DoorGlitchData | NonDoorGlitchData
  handleClick: (glitch: Glitch, id: string) => void
}

function GlitchImage(props: GlitchImageProps) {
  const { glitch, glitchId, handleClick } = props

  const selectedGlitch = useAppSelector(state => state.app.selectedGlitch)

  useEffect(() => {
    if (
      glitchId &&
      glitch &&
      selectedGlitch.id === glitchId &&
      !selectedGlitch.glitch
    ) {
      handleClick(glitch, glitchId)
    }
  }, [glitch, glitchId, selectedGlitch, handleClick])

  return (
    <div
      title={glitch.Title}
      onClick={() => handleClick(glitch, glitchId)}
      key={glitchId}
    >
      <Image
        circular
        src={glitchToImage(glitch.Type)}
        style={{
          zIndex: selectedGlitch.glitch === glitch ? 110 : 100,
          outline: selectedGlitch.glitch === glitch ? "5px solid white" : "",
        }}
        id={glitchId}
      />
    </div>
  )
}

export default GlitchImage
