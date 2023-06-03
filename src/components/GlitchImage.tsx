import { Image } from "semantic-ui-react";
import { glitchToImage } from "../utils";
import { useEffect } from "react";
import { GlitchData, SelectedGlitch } from "../types";

interface GlitchImageProps {
  glitchId: string;
  glitch: GlitchData;
  selectedGlitch: SelectedGlitch;
  handleClick: (glitch: GlitchData, id: string) => void;
}

function GlitchImage(props: GlitchImageProps) {
  const { glitch, glitchId, selectedGlitch, handleClick } = props;

  useEffect(() => {
    if (
      glitchId &&
      glitch &&
      selectedGlitch.id === glitchId &&
      !selectedGlitch.glitch
    ) {
      handleClick(glitch as GlitchData, glitchId);
    }
  }, [glitch, glitchId, selectedGlitch, handleClick]);

  return (
    <div
      title={glitch["glitchName"]}
      onClick={() => handleClick(glitch, glitchId)}
      key={glitchId}
    >
      <Image
        circular
        src={glitchToImage(glitch["glitch"])}
        style={{
          zIndex: selectedGlitch.glitch === glitch ? 110 : 100,
          outline: selectedGlitch.glitch === glitch ? "5px solid white" : "",
        }}
        id={glitchId}
      />
    </div>
  );
}

export default GlitchImage;
