import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../app/hooks"

interface MapImageProps {
  src: string
  width: number
  height: number
  mapImage: string
  somariaPits: string
}

const MapImage: React.FC<MapImageProps> = ({
  src,
  width,
  height,
  mapImage,
  somariaPits,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isSupported, setIsSupported] = useState(true)

  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const showSomariaPits = useAppSelector(state => state.app.showSomariaPits)

  function loadSomariaImage(src: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    if (canvas && ctx) {
      const image = new Image()
      image.src = src

      if (typeof createImageBitmap === "function") {
        image.onload = async () => {
          try {
            const bitmap = await createImageBitmap(image)
            if (signal.aborted) return
            ctx.drawImage(bitmap, 0, 0, width, height)
            if (showSomariaPits && !["LW", "DW"].includes(selectedMap)) {
              const somariaImage = (await loadSomariaImage(
                somariaPits
              )) as HTMLImageElement
              ctx.drawImage(somariaImage, 0, 0, width, height)
            }
          } catch (error) {
            setIsSupported(false)
          }
        }
      } else {
        setIsSupported(false)
      }
    }
    return () => {
      controller.abort()
    }
  }, [src, width, height, selectedMap, showSomariaPits, somariaPits])

  if (!isSupported) {
    return (
      <div>
        (showSomariaPits && !['LW', 'DW'].includes(selectedMap) && (
        <picture>
          <source srcSet={`${somariaPits}.webp`} type="image/webp" />
          <source srcSet={`${somariaPits}.png`} type="image/png" />
          <img
            src={`${somariaPits}.png`}
            alt={`${selectedMap} Somaria Pits`}
            id="image"
            style={{
              height: "100%",
              paddingTop: `${selectedMap === "EG2" ? 3027 : 0}px`,
            }}
          />
        </picture>
        ) )
        <picture>
          <source srcSet={`${mapImage}.webp`} type="image/webp" />
          <source srcSet={`${mapImage}.png`} type="image/png" />
          <img
            src={`${mapImage}.png`}
            alt={`${selectedMap} Map`}
            id="image"
            style={{
              height: "100%",
              paddingTop: `${selectedMap === "EG2" ? 3027 : 0}px`,
            }}
          />
        </picture>
      </div>
    )
  }

  return <canvas ref={canvasRef} width={width} height={height} />
}

export default MapImage
