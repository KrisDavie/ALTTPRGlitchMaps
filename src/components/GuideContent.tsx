import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"

import LinkRenderer from "./LinkRenderer"
import Collapsible from "./Collapsable"
import { Glitch } from "../types"

function GuideContent(props: { selectedGlitch: Glitch }) {
  const { selectedGlitch } = props

  if (!selectedGlitch) {
    return null
  }

  function getBlockRenderer(guide: BlocksContent) {
    if (!guide) {
      return null
    }
    return (
      <BlocksRenderer
        content={guide}
        blocks={{
          paragraph: ({ children }) => <p className="guide-text">{children}</p>,
          list: ({ format, children }) => {
            const ListTag = format === "ordered" ? "ol" : "ul"
            return <ListTag className="guide-text">{children}</ListTag>
          },
          image: ({ image }) => (
            <img
              className="guide-image"
              src={image.url}
              alt={image.alternativeText || undefined}
            />
          ),
          heading: ({ children }) => (
            <h1 className="guide-header">{children}</h1>
          ),
          link: ({ url }) => (
            <div>
              <LinkRenderer link={url} />
            </div>
          ),
        }}
      />
    )
  }

  const guidePresent =
    selectedGlitch.Guide?.length === 0 ||
    (selectedGlitch.Guide?.length === 1 &&
      "text" in selectedGlitch.Guide[0].children[0] &&
      selectedGlitch.Guide[0].children[0].text !== "")

  const reusableGuides = selectedGlitch.ReusableGuides?.map(guide => {
    return (
      <Collapsible title={guide.Title} open={!guidePresent}>
        <div className="guide-content" style={{ marginTop: "10px" }}>
          {getBlockRenderer(guide.Guide)}
        </div>
      </Collapsible>
    )
  })
  return (
    <>
      {reusableGuides}
      {reusableGuides && reusableGuides.length > 0 && guidePresent && (
        <div
          style={{
            width: "90%",
            height: "1px",
            backgroundColor: "white",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      )}
      {getBlockRenderer(selectedGlitch.Guide)}
    </>
  )
}

export default GuideContent
