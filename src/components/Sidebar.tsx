import React, { useRef } from "react"
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Image,
  Button,
  Divider,
  Popup,
} from "semantic-ui-react"
import "./Sidebar.css"
import "../fonts/HyliaSerifBeta-Regular.otf"
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { useAppDispatch, useAppSelector } from "../app/hooks"

import {
  setEnabledGlitches,
  setSelectedGlitch,
  setSelectedMap,
  setShowSomariaPits,
  setShowQuadrantLines,
} from "../app/appSlice"
import GuideModal from "./GuideModal"

interface SidebarProps {
  transformComponentRef: React.RefObject<ReactZoomPanPinchRef>
  visible: boolean
  currentScale: number
}

function PageSidebar(props: SidebarProps) {
  const { transformComponentRef } = props

  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const dispatch = useAppDispatch()
  const baseURL = window.location.origin

  const [mapPopupOpen, setMapPopupOpen] = React.useState(false)
  const [clipBoardPopupOpen, setClipBoardPopupOpen] = React.useState(false)

  const handleClipBoardPopupOpen = () => {
    setClipBoardPopupOpen(true)
    setTimeout(() => {
      setClipBoardPopupOpen(false)
    }, 1000)
  }

  const handleMapPopupOpen = () => {
    setMapPopupOpen(true)
    setTimeout(() => {
      setMapPopupOpen(false)
    }, 1000)
  }

  const enabledGlitches = useAppSelector(state => state.app.enabledGlitches)
  const selectedMap = useAppSelector(state => state.app.selectedMap)
  const selectedGlitch = useAppSelector(state => state.app.selectedGlitch)
  const showSomariaPits = useAppSelector(state => state.app.showSomariaPits)
  const showQuadrantLines = useAppSelector(state => state.app.showQuadrantLines)

  const handleClicks = (glitch: string) => {
    if (enabledGlitches.includes(glitch)) {
      dispatch(setEnabledGlitches(enabledGlitches.filter(g => g !== glitch)))
    } else {
      dispatch(setEnabledGlitches([...enabledGlitches, glitch]))
    }
  }

  const handleMapChange = (map: "EG1" | "EG2" | "LW" | "DW") => {
    if (selectedMap === map) {
      return
    }
    const oldMap = selectedMap
    dispatch(setSelectedMap(map))
    dispatch(setSelectedGlitch({ glitch: undefined, id: "" }))
    if (
      (map === "LW" || map === "DW") &&
      (oldMap === "LW" || oldMap === "DW")
    ) {
      return
    }
    const zoom = map === "LW" || map === "DW" ? 0.15 : 0.5
    const mapHeight = map === "EG2" ? 1536 : 8192
    transformComponentRef?.current?.setTransform(
      -4096 * zoom + windowSize.current.width / 2 - 154,
      -(mapHeight / 2) * zoom + windowSize.current.height / 2,
      zoom
    )
  }

  const mapButton = (map: "EG1" | "EG2" | "LW" | "DW") => {
    return (
      <Button
        color={selectedMap === map ? "orange" : undefined}
        onClick={() => handleMapChange(map)}
        id={map}
        key={map}
      >
        {map}
      </Button>
    )
  }

  const makeGlitchButton = (image: string, title: string, iconName: string = "") => {
    iconName = iconName === "" ? title : iconName
    return (
      <Grid.Column>
        <Image
          circular
          src={image}
          alt={title}
          title={title}
          style={{
            filter: enabledGlitches.includes(iconName)
              ? "grayscale(0%)"
              : "grayscale(100%) blur(2px)",
          }}
          onClick={() => handleClicks(iconName)}
        />
      </Grid.Column>
    )
  }

  const getMapGlitchFilters = (map: "EG1" | "EG2" | "LW" | "DW") => {
    switch (map) {
      case "EG1":
      case "EG2":
        return (
          <Grid columns={4} rows={5}>
            <Grid.Row style={{ padding: "10px 0px 4px 0px" }}>
              {makeGlitchButton("images/red_pot.png", "Double YBA")}
              {makeGlitchButton("images/green_pot.png", "Subtile YBA")}
              {makeGlitchButton("images/blue_pot.png", "Supertile YBA")}
              {makeGlitchButton("images/somaria.png", "Somaria")}
            </Grid.Row>
            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/bomb.png", "Bomb Juke")}
              {makeGlitchButton("images/boots.png", "Spinspeed Clip/Clip Through")}
              {makeGlitchButton(
                "images/spin_green_pot_112.png",
                "Spin Subtile YBA"
              )}
              {makeGlitchButton(
                "images/spin_blue_pot_112.png",
                "Spin Supertile YBA"
              )}
            </Grid.Row>

            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/quadrant.png", "Quadrant Glitch")}
              {makeGlitchButton("images/jingle.png", "Jingle Glitch")}
              {makeGlitchButton("images/spin_somaria_112.png", "Spin Somaria")}
              {makeGlitchButton(
                "images/somaria_blue_pot.png",
                "Somaria Supertile YBA"
              )}
            </Grid.Row>

            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/statue_drag.png", "Statue Drag")}
              {makeGlitchButton("images/dead_link.png", "Deathhole/0hp")}
              {makeGlitchButton("images/stairmaster.png", "Stairmaster")}
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src="images/hook_somaria.png"
                  alt="Misslot Hookpush"
                  title="Misslot Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: enabledGlitches.includes("hookpush-Somaria")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-Somaria")}
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="images/hook_boom.png"
                  alt="0A Hookpush"
                  title="0A Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: enabledGlitches.includes("hookpush-Boomerang")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-Boomerang")}
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="images/hook_push.png"
                  alt="Hookpush"
                  title="Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: enabledGlitches.includes("hookpush-Stuckpush")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-Stuckpush")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      case "LW":
      case "DW":
        return (
          <Grid columns={4} rows={4}>
            <Grid.Row centered style={{ padding: "10px 0px 4px 0px" }}>
              {makeGlitchButton("images/teleport_up.png", "Up Teleport")}
              {makeGlitchButton("images/teleport_down.png", "Down Teleport")}

              {makeGlitchButton(
                "images/boots.png",
                "Spinspeed Clip/Clip Through"
              )}
              {makeGlitchButton("images/citrus.png", "Bootsless Clip", "Citrus Clip")}
            </Grid.Row>
            <Grid.Row centered style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/flippers.png", "Swim Clip")}

              {makeGlitchButton("images/owYBA.png", "Overworld YBA")}

              {makeGlitchButton(
                "images/mirror_portal.png",
                "Mirror Clip/Portal Offset"
              )}
              {makeGlitchButton("images/bomb.png", "Bomb Clip")}
            </Grid.Row>
            <Grid.Row centered style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton(
                "images/conveyor_up.png",
                "Overworld Conveyor Up"
              )}
              {makeGlitchButton(
                "images/conveyor_up.png",
                "Overworld Conveyor Down"
              )}
              {makeGlitchButton("images/mirror_wrap.png", "Mirror Wrap")}
              {makeGlitchButton(
                "images/mirrorless_wrap.png",
                "Mirrorless Wrap"
              )}
            </Grid.Row>
            <Grid.Row>
              {makeGlitchButton("images/wallmaster.png", "Treewarp")}
              {makeGlitchButton("images/dead_link.png", "Deathhole/0hp")}
            </Grid.Row>
          </Grid>
        )
      default:
        return <Grid columns={4} rows={4}></Grid>
    }
  }
  return (
    <Sidebar
      as={Segment}
      direction="right"
      animation="overlay"
      visible={props.visible}
      width="wide"
    >
      <Grid columns={1} rows={4} container>
        <Grid.Column>
          <Grid.Row style={{ padding: "5px 0px 15px 0px" }}>
            <Header
              as="h1"
              textAlign="center"
              inverted
              className="sidetext"
              style={{ letterSpacing: "0.1em" }}
            >
              ALTTPR
              <br />
              Glitch Maps
            </Header>
            <Header
              as="h4"
              textAlign="center"
              inverted
              dividing
              className="sidetext"
              style={{ letterSpacing: "0.1em", margin: "0px 0px 5px 0px" }}
            >
              By Malmo and Muffins
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Header as="h2" textAlign="left" inverted className="sidetext">
              Maps
            </Header>
            <Button.Group style={{ align: "center" }}>
              {mapButton("EG1")}
              {mapButton("EG2")}
              {mapButton("LW")}
              {mapButton("DW")}
            </Button.Group>
            <div style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: "16px"}}>
              <Popup
                trigger={
                  <Button
                    size="mini"
                    disabled={["LW", "DW"].includes(selectedMap)}
                    active={showSomariaPits}
                    color={
                      showSomariaPits && !["LW", "DW"].includes(selectedMap)
                        ? "red"
                        : undefined
                    }
                    onClick={() => dispatch(setShowSomariaPits(!showSomariaPits))}
                    style={{ margin: "10px 0px 0px 0px" }}
                  >
                    {showSomariaPits ? "Hide" : "Show"} Somaria Pits
                  </Button>
                }
                content="Pits shown are room load pits. Rooms entered via a fade are likely not accurate."
                basic
                position="bottom center"
              />
              <Button
                size="mini"
                disabled={["LW", "DW"].includes(selectedMap)}
                active={showQuadrantLines}
                color={
                  showQuadrantLines && !["LW", "DW"].includes(selectedMap)
                    ? "teal"
                    : undefined
                }
                onClick={() => dispatch(setShowQuadrantLines(!showQuadrantLines))}
                style={{ margin: "10px 0px 0px 0px" }}
              >
                {showQuadrantLines ? "Hide" : "Show"} Quadrant Lines
              </Button>
            </div>

            <Header
              as="h5"
              textAlign="left"
              inverted
              className="side-glitchtext"
              style={{ height: "58%", margin: "7px 0px 0px 0px" }}
            >
              Annotated EG images created by kan
              <br />
              Somaria pit images created by jsd & kan
            </Header>
          </Grid.Row>
          <Divider />
          <Grid.Row stretched style={{ padding: "5px 0px 0px 0px" }}>
            <Header
              as="h2"
              textAlign="left"
              inverted
              className="sidetext"
              style={{ letterSpacing: "0.1em" }}
            >
              Glitch Information
            </Header>
            <Header
              as="h3"
              textAlign="left"
              inverted
              className="sidetext"
              style={{ letterSpacing: "0.1em" }}
            >
              {selectedGlitch.glitch ? (
                <div>
                  {selectedGlitch.glitch.Title}{" "}
                  <Popup
                  trigger={
                    <i
                    className="map outline icon link"
                    title="Copy map link to clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(
                      `${baseURL}/?map=${selectedMap}&glitch=${selectedGlitch.id}`
                      )
                    }}
                    />
                  }
                  content="Copied!"
                  on="click"
                  open={mapPopupOpen}
                  onOpen={handleMapPopupOpen}
                  position="top left"
                  />
                  <Popup
                  trigger={
                    <i
                    className="clipboard outline icon link"
                    title="Copy standalone guide link to clipboard"
                    onClick={() => {
                      navigator.clipboard.writeText(
                      `${baseURL}/guide/?map=${selectedMap}&glitch=${selectedGlitch.id}`
                      )
                    }}
                    />
                  }
                  content="Copied!"
                  on="click"
                  open={clipBoardPopupOpen}
                  onOpen={handleClipBoardPopupOpen}
                  position="top left"
                  />
                </div>
              ) : (
                "Select a Glitch"
              )}
            </Header>
            <div>
              <p className="side-glitchtext">
                {selectedGlitch.glitch
                  ? selectedGlitch.glitch.Description
                  : "Click a glitch for information..."}
              </p>
            </div>

            {selectedGlitch.glitch?.Guide ? (
              <>
                <br />
                <GuideModal />
              </>
            ) : null}
          </Grid.Row>
          <Grid.Row
            verticalAlign="bottom"
            style={{ padding: "45px 0px 0px 0px" }}
          >
            <Header
              as="h2"
              textAlign="left"
              inverted
              className="sidetext"
              dividing
              style={{ letterSpacing: "0.1em" }}
            >
              Glitches Filter
            </Header>
            {getMapGlitchFilters(selectedMap)}
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Sidebar>
  )
}

export default PageSidebar
