import ReactPlayer from "react-player"

function LinkRenderer(props: { link: string }) {
  const { link } = props

  if (link.includes("clips.twitch.tv")) {
    return (
      <iframe
        src={
          link.replace("clips.twitch.tv/", "clips.twitch.tv/embed?clip=") +
          "&parent=localhost"
        }
        height="360"
        width="640"
        allowFullScreen
        title="Embedded Twitch Clip"
      />
    )
  } else if (ReactPlayer.canPlay(link)) {
    return <ReactPlayer controls url={link} />
  }

  return (
    <a href={link} target="_blank" rel="noreferrer" style={{ color: "white", textDecoration: "underline"  }}>
      {link}
    </a>
  )
}

export default LinkRenderer
