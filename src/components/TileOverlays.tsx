interface TileOverlaysProps {
  selectedTile: string;
  previousTile: string;
  highlightTile: boolean;
  egMap: string;
}

function TileOverlays(props: TileOverlaysProps) {
  const { selectedTile, highlightTile, previousTile } = props;

  const tileWidth = 8192 / 16;
  const tileHeight = 8192 / 16;

  const makeTile = (tile: string, kind: string) => {
    const top = parseInt(tile[5], 16) * tileHeight;
    const left = parseInt(tile[6], 16) * tileWidth;
    return (
      <div
        id={tile}
        key={`${tile}-${kind}-overlay`}
        style={{
          position: "absolute",
          top,
          left,
          width: tileWidth,
          height: tileHeight,
          backgroundColor:
            tile === tile && highlightTile
              ? "rgba(128, 128, 128, 0.5)"
              : "transparent",
          transition: "all .5s ease",
          WebkitTransition: "all .5s ease",
          MozTransition: "all .5s ease",
        }}
      />
    );
  };

  return (
    <div>
      {makeTile(selectedTile, "selected")}
      {makeTile(previousTile, "previous")}
    </div>
  );
}

export default TileOverlays;
