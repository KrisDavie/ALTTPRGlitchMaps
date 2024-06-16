import React, { useRef } from "react";
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Image,
  Button,
  Divider,
  Icon,
  Popup,
} from "semantic-ui-react";
import "./Sidebar.css";
import "../fonts/HyliaSerifBeta-Regular.otf";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { GlitchData, HookpushLocation, SelectedGlitch } from "../types";

interface SidebarProps {
  transformComponentRef: React.RefObject<ReactZoomPanPinchRef>;
  visible: boolean;
  selectedGlitch: SelectedGlitch;
  enabledGlitches: string[];
  showSomariaPits: boolean;
  setEnabledGlitches: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedGlitch: React.Dispatch<React.SetStateAction<SelectedGlitch>>;
  setShowSomariaPits: React.Dispatch<React.SetStateAction<boolean>>;
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
  setSelectedMap: (map: "EG1" | "EG2" | "LW" | "DW") => void;
  currentScale: number;
}

function PageSidebar(props: SidebarProps) {
  const {
    selectedMap,
    setSelectedMap,
    transformComponentRef,
    selectedGlitch,
    setSelectedGlitch,
  } = props;

  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const baseURL = window.location.origin;

  const handleClicks = (glitch: string) => {
    if (props.enabledGlitches.includes(glitch)) {
      props.setEnabledGlitches(
        props.enabledGlitches.filter((g) => g !== glitch)
      );
    } else {
      props.setEnabledGlitches([...props.enabledGlitches, glitch]);
    }
  };

  const handleMapChange = (map: "EG1" | "EG2" | "LW" | "DW") => {
    if (selectedMap === map) {
      return;
    }
    const oldMap = selectedMap;
    setSelectedMap(map);
    setSelectedGlitch({ glitch: undefined, id: "" });
    if (
      (map === "LW" || map === "DW") &&
      (oldMap === "LW" || oldMap === "DW")
    ) {
      return;
    }
    const zoom = map === "LW" || map === "DW" ? 0.15 : 0.5;
    const mapHeight = map === "EG2" ? 1536 : 8192;
    transformComponentRef?.current?.setTransform(
      -4096 * zoom + windowSize.current.width / 2 - 154,
      -(mapHeight / 2) * zoom + windowSize.current.height / 2,
      zoom
    );
  };

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
    );
  };

  const makeGlitchButton = (image: string, title: string, id: string) => {
    return (
      <Grid.Column>
        <Image
          circular
          src={image}
          alt={title}
          title={title}
          style={{
            filter: props.enabledGlitches.includes(id)
              ? "grayscale(0%)"
              : "grayscale(100%) blur(2px)",
          }}
          onClick={() => handleClicks(id)}
        />
      </Grid.Column>
    );
  };

  const makeGlitchLink = (glitchData: GlitchData | HookpushLocation) => {
    if (glitchData.link) {
      return (
        <div
          className="side-glitchtext"
          style={{ padding: "0px 0px 10px 0px" }}
        >
          {glitchData.link[0] !== "" && "More Info: "}
          {glitchData.link[0] !== "" &&
            glitchData.link.map((link, i) => {
              return (
                <>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "white",
                      textDecoration: "underline",
                      wordWrap: "break-word",
                    }}
                    key={i}
                  >
                    {link}
                  </a>
                  <br />
                </>
              );
            })}
        </div>
      );
    }
  };

  const getMapGlitchFilters = (map: "EG1" | "EG2" | "LW" | "DW") => {
    switch (map) {
      case "EG1":
      case "EG2":
        return (
          <Grid columns={4} rows={4}>
            <Grid.Row style={{ padding: "10px 0px 4px 0px" }}>
              {makeGlitchButton("images/red_pot.png", "Double YBA", "redYBA")}
              {makeGlitchButton(
                "images/green_pot.png",
                "Subtile YBA",
                "greenYBA"
              )}
              {makeGlitchButton(
                "images/blue_pot.png",
                "Supertile YBA",
                "blueYBA"
              )}
              {makeGlitchButton("images/somaria.png", "Somaria", "somaria")}
            </Grid.Row>
            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/bomb.png", "Bomb Juke", "bomb")}

              {makeGlitchButton("images/boots.png", "Boots Clip", "boots")}

              {makeGlitchButton(
                "images/spin_green_pot_112.png",
                "Spin Subtile YBA",
                "spinGreenYBA"
              )}
              {makeGlitchButton(
                "images/spin_blue_pot_112.png",
                "Spin Supertile YBA",
                "spinBlueYBA"
              )}
            </Grid.Row>

            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton(
                "images/quadrant.png",
                "Quadrant Glitch",
                "quadrant"
              )}
              {makeGlitchButton("images/jingle.png", "Jingle Glitch", "jingle")}
              {makeGlitchButton(
                "images/spin_somaria_112.png",
                "Spin Somaria",
                "spinSomaria"
              )}
              {makeGlitchButton(
                "images/somaria_blue_pot.png",
                "Somaria Supertile YBA",
                "somariaBlueYBA"
              )}
            </Grid.Row>

            <Grid.Row style={{ padding: "4px 0px 4px 0px" }}>
              {" "}
              {makeGlitchButton(
                "images/statue_drag.png",
                "Statue Drag",
                "statueDrag"
              )}
              <Grid.Column>
                <Image
                  src="images/hook_somaria.png"
                  alt="Misslot Hookpush"
                  title="Misslot Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: props.enabledGlitches.includes("hookpush-somaria")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-somaria")}
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="images/hook_boom.png"
                  alt="0A Hookpush"
                  title="0A Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: props.enabledGlitches.includes("hookpush-boom")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-boom")}
                />
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="images/hook_push.png"
                  alt="Hookpush"
                  title="Hookpush"
                  verticalAlign="middle"
                  style={{
                    filter: props.enabledGlitches.includes("hookpush-push")
                      ? "grayscale(0%)"
                      : "grayscale(100%) blur(2px)",
                    padding: "12px 0px 0px 0px",
                  }}
                  onClick={() => handleClicks("hookpush-push")}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
      case "LW":
      case "DW":
        return (
          <Grid columns={4} rows={4}>
            <Grid.Row centered style={{ padding: "10px 0px 4px 0px" }}>
              {makeGlitchButton(
                "images/teleport_up.png",
                "Up Teleport",
                "teleportUp"
              )}
              {makeGlitchButton(
                "images/teleport_down.png",
                "Down Teleport",
                "teleportDown"
              )}

              {makeGlitchButton(
                "images/boots.png",
                "Spinspeed Clip / Clip Through",
                "boots"
              )}
              {makeGlitchButton("images/citrus.png", "Citrus Clip", "citrus")}
            </Grid.Row>
            <Grid.Row centered style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton("images/flippers.png", "Swim Clip", "flippers")}

              {makeGlitchButton("images/owYBA.png", "Overworld YBA", "owYBA")}

              {makeGlitchButton(
                "images/mirror_portal.png",
                "Mirror Clip / Portal Offset",
                "mirrorPortal"
              )}
              {makeGlitchButton("images/bomb.png", "Bomb Clip", "bomb")}
            </Grid.Row>
            <Grid.Row centered style={{ padding: "4px 0px 4px 0px" }}>
              {makeGlitchButton(
                "images/conveyor_up.png",
                "Overworld Conveyor Up",
                "conveyorUp"
              )}
              {makeGlitchButton(
                "images/conveyor_up.png",
                "Overworld Conveyor Down",
                "conveyorDown"
              )}
              {makeGlitchButton(
                "images/mirror_wrap.png",
                "Mirror Wrap",
                "mirrorWrap"
              )}
              {makeGlitchButton(
                "images/mirrorless_wrap.png",
                "Mirrorless Wrap",
                "mirrorlessWrap"
              )}
            </Grid.Row>
            <Grid.Row>
              {makeGlitchButton(
                "images/wallmaster.png",
                "Treewarp",
                "wallmaster"
              )}

            </Grid.Row>
          </Grid>
        );
      default:
        return <Grid columns={4} rows={4}></Grid>;
    }
  };

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
            <Popup
              trigger={
                <Button
                  size="mini"
                  disabled={["LW", "DW"].includes(selectedMap)}
                  active={props.showSomariaPits}
                  color={
                    props.showSomariaPits && !["LW", "DW"].includes(selectedMap)
                      ? "red"
                      : undefined
                  }
                  onClick={() =>
                    props.setShowSomariaPits(!props.showSomariaPits)
                  }
                  style={{ margin: "10px 0px 0px 0px" }}
                >
                  Show Somaria Pits
                </Button>
              }
              content="Pits shown are room load pits. Rooms entered with via a fade are likely not accurate."
              basic
              position="bottom center"
            />
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
                  {selectedGlitch.glitch.glitchName}{" "}
                  <a
                    href={`${baseURL}/?map=${selectedMap}&glitch=${selectedGlitch.id}`}
                  >
                    <Icon name="share alternate" link></Icon>
                  </a>
                </div>
              ) : (
                "Select a Glitch"
              )}
            </Header>

            <div>
              {selectedGlitch.glitch
                ? makeGlitchLink(selectedGlitch.glitch)
                : null}
              <p className="side-glitchtext">
                {selectedGlitch.glitch
                  ? selectedGlitch.glitch.info
                  : "Click a glitch for information..."}
              </p>
            </div>
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
  );
}

export default PageSidebar;
