import React, { useState } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Sidebar,
  Image,
} from "semantic-ui-react";
import "./Sidebar.css";
import "../fonts/HyliaSerifBeta-Regular.otf";

interface SidebarProps {
  visible: boolean;
  selectedGlitches: string[];
  setSelectedGlitches: React.Dispatch<React.SetStateAction<string[]>>;
  glitchText: string[];
}

function PageSidebar(props: SidebarProps) {
  const handleClicks = (glitch: string) => {
    if (props.selectedGlitches.includes(glitch)) {
      props.setSelectedGlitches(
        props.selectedGlitches.filter((g) => g !== glitch)
      );
    } else {
      props.setSelectedGlitches([...props.selectedGlitches, glitch]);
    }
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

  return (
    <Sidebar
      as={Segment}
      direction="right"
      animation="overlay"
      visible={props.visible}
      width="wide"
    >
      <Grid columns={1} rows={3} container style={{ height: "99vh" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "5px 0px 25px 0px" }}>
            <Header
              as="h1"
              textAlign="center"
              inverted
              className="sidetext"
              dividing
              style={{ letterSpacing: "0.1em" }}
            >
              ALTTPR UW Glitch Map
            </Header>
          </Grid.Row>
          <Grid.Row style={{ height: "58%" }}>
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
