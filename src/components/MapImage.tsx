import React, { useEffect, useRef, useState } from "react";

interface MapImageProps {
  src: string;
  width: number;
  height: number;
  mapImage: string;
  selectedMap: string;
}

const MapImage: React.FC<MapImageProps> = ({
  src,
  width,
  height,
  mapImage,
  selectedMap,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      const image = new Image();
      image.src = src;

      if (typeof createImageBitmap === "function") {
        image.onload = async () => {
          try {
            const bitmap = await createImageBitmap(image);
            ctx.drawImage(bitmap, 0, 0, width, height);
          } catch (error) {
            setIsSupported(false);
          }
        };
      } else {
        setIsSupported(false);
      }
    }
  }, [src, width, height]);

  if (!isSupported) {
    return (
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
    );
  }

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default MapImage;
