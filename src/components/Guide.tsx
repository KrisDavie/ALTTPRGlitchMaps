import { useSearchParams } from "./SearchParamsHook"
import {
  useGetDoorGlitchQuery,
  useGetHookPushQuery,
  useGetNonDoorGlitchQuery,
  useGetReusableGuideQuery,
} from "../app/apiSlice"
import "./Guide.css"
import GuideContent from "./GuideContent"
import { Glitch } from "../types"
import { Header } from "semantic-ui-react"
import { Link } from "react-router-dom"

function Guide() {
  const { map: mapParams, reusable, glitchName } = useSearchParams()

  let selectedGlitchName
  let glitchType

  if (reusable) {
    glitchType = "Reusable"
    selectedGlitchName = glitchName.replace(/-/g, " ")
  } else {
    const nameParts = glitchName.split("-")
    glitchType = nameParts[0]
    nameParts.shift()
    selectedGlitchName = nameParts.join(" ").replace(/-/g, " ")
  }

  const doorGlitchQuery = useGetDoorGlitchQuery(selectedGlitchName, {
    skip: !selectedGlitchName || glitchType !== "dg",
  })
  const hookPushQuery = useGetHookPushQuery(selectedGlitchName, {
    skip: !selectedGlitchName || glitchType !== "hp",
  })
  const nonDoorGlitchQuery = useGetNonDoorGlitchQuery(selectedGlitchName, {
    skip: !selectedGlitchName || glitchType !== "ndg",
  })
  const reusableGuideQuery = useGetReusableGuideQuery(selectedGlitchName, {
    skip: !selectedGlitchName || glitchType !== "Reusable",
  })

  if (!selectedGlitchName) {
    return <div className="standalone-guide-container">No glitch selected</div>
  }

  let selectedGlitch
  let glitchTypeName

  switch (glitchType) {
    case "dg":
      selectedGlitch = doorGlitchQuery.data as Glitch
      glitchTypeName = "Door Glitch"
      break
    case "hp":
      selectedGlitch = hookPushQuery.data as Glitch
      glitchTypeName = "Hookpush"
      break
    case "ndg":
      selectedGlitch = nonDoorGlitchQuery.data as Glitch
      glitchTypeName = "Non-Door Glitch"
      break
    case "Reusable":
      selectedGlitch = reusableGuideQuery.data as Glitch
      glitchTypeName = "General Guide"
      break
  }
  if (!selectedGlitch) {
    return (
      <div className="standalone-guide-container">
        No guide available for {selectedGlitchName}
      </div>
    )
  }

  return (
    <div className="standalone-guide-container">
      <Header
        as="h1"
        textAlign="left"
        inverted
        className="sidetext"
        style={{ letterSpacing: "0.1em", marginTop: "25px" }}
      >
        {selectedGlitch.Title}{" "}
      </Header>
      {mapParams && (
        <Link
          to={`/?map=${mapParams}&glitch=${glitchName}`}
          className="ui button"
          style={{ marginBottom: "10px" }}
        >
          View on Map
        </Link>
      )}
      {glitchType !== 'Reusable' && 
      (
      <>
      <div className="guide-text">
        <p>
          <strong>Type:</strong> {glitchTypeName} {mapParams && `(${mapParams})`}
        </p>
        <p>
          <strong>Description:</strong> {selectedGlitch.Description}
        </p>
      </div>
      <br />
      </>
      )}
      <div className="guide-content">
        {selectedGlitch.Guide && selectedGlitch.Guide.length > 0 ? (
          <GuideContent selectedGlitch={selectedGlitch} />
        ) : (
          <div className="guide-text">
            <p>
              <strong>No detailed guide available for this glitch.</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Guide
