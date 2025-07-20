import ReactPlayer from "react-player"

function LinkRenderer(props: { link: string }) {
  const { link } = props

  if (link.includes("clips.twitch.tv")) {
    return (
      <div>
        <iframe
          src={
            link.replace("clips.twitch.tv/", "clips.twitch.tv/embed?clip=") +
            "&parent=glitchmaps.mfns.dev"
          }
          height="360"
          width="640"
          allowFullScreen
          title="Embedded Twitch Clip"
        />
      </div>
    )
  } else if (ReactPlayer.canPlay(link)) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ReactPlayer controls url={link} />
      </div>
    )
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      style={{ color: "white", textDecoration: "underline" }}
    >
      {link}
    </a>
  )
}

export default LinkRenderer
