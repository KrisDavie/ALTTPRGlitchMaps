import React, { useRef, useState } from "react";
import {
  Grid,
  Header,
  Segment,
  Sidebar,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import "./Sidebar.css";
import "../fonts/HyliaSerifBeta-Regular.otf";
import { ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

interface SidebarProps {
  transformComponentRef: React.RefObject<ReactZoomPanPinchRef>;
  visible: boolean;
  selectedGlitches: string[];
  setSelectedGlitches: React.Dispatch<React.SetStateAction<string[]>>;
  glitchText: string[];
  selectedMap: "EG1" | "EG2" | "LW" | "DW";
  setSelectedMap: React.Dispatch<
    React.SetStateAction<"EG1" | "EG2" | "LW" | "DW">
  >;
}

function PageSidebar(props: SidebarProps) {
  const { selectedMap, setSelectedMap, transformComponentRef } = props;

  const windowSize = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleClicks = (glitch: string) => {
    if (props.selectedGlitches.includes(glitch)) {
      props.setSelectedGlitches(
        props.selectedGlitches.filter((g) => g !== glitch)
      );
    } else {
      props.setSelectedGlitches([...props.selectedGlitches, glitch]);
    }
  };

  const handleMapChange = (map: "EG1" | "EG2" | "LW" | "DW") => {
    setSelectedMap(map);
    const zoom = map === "LW" || map === "DW" ? 0.15 : 0.5;
    transformComponentRef?.current?.setTransform(
      -4096 * zoom + windowSize.current.width / 2,
      -4096 * zoom + windowSize.current.height / 2,
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
            filter: props.selectedGlitches.includes(id)
              ? "grayscale(0%)"
              : "grayscale(100%) blur(2px)",
          }}
          onClick={() => handleClicks(id)}
        />
      </Grid.Column>
    );
  };

  const makeGlitchLink = (glitchText: string[]) => {
    if (glitchText[2]) {
      console.log(glitchText[2]);
      return (
        <div
          className="side-glitchtext"
          style={{ padding: "0px 0px 10px 0px" }}
        >
          {"More Info: "}
          <a
            href={glitchText[2]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "white",
              textDecoration: "underline",
              wordWrap: "break-word",
            }}
          >
            {glitchText[2]}
          </a>
        </div>
      );
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
      <Grid columns={1} rows={4} container style={{ height: "99vh" }}>
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
          </Grid.Row>
          <Divider />
          <Grid.Row style={{ height: "58%", padding: "5px 0px 0px 0px" }}>
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
              {props.glitchText[0] ? props.glitchText[0] : "Select a Glitch"}
            </Header>

            <div>
              {makeGlitchLink(props.glitchText)}
              <p className="side-glitchtext">{props.glitchText[1]}</p>
            </div>
          </Grid.Row>
          <Grid.Row>
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
                  "images/spin_green_pot.png",
                  "Spin Subtile YBA",
                  "spinGreenYBA"
                )}
                {makeGlitchButton(
                  "images/spin_blue_pot.png",
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
                {makeGlitchButton(
                  "images/jingle.png",
                  "Jingle Glitch",
                  "jingle"
                )}
                {makeGlitchButton(
                  "images/spin_somaria.png",
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
                      filter: props.selectedGlitches.includes(
                        "hookpush-somaria"
                      )
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
                      filter: props.selectedGlitches.includes("hookpush-boom")
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
                      filter: props.selectedGlitches.includes("hookpush-push")
                        ? "grayscale(0%)"
                        : "grayscale(100%) blur(2px)",
                      padding: "12px 0px 0px 0px",
                    }}
                    onClick={() => handleClicks("hookpush-push")}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Sidebar>
  );
}

export default PageSidebar;
