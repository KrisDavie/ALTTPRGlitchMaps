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
              : "grayscale(100%)",
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
          <Grid.Row style={{ height: "65%" }}>
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
            <Grid columns={5} rows={3}>
              <Grid.Row>
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
                {makeGlitchButton("images/bomb.png", "Bomb Juke", "bomb")}
              </Grid.Row>
              <Grid.Row>
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
              </Grid.Row>
              <Grid.Row>
                {makeGlitchButton(
                  "images/spin_somaria.png",
                  "Spin Somaria",
                  "spinSomaria"
                )}
                {makeGlitchButton(
                  "images/statue_drag.png",
                  "Statue Drag",
                  "statueDrag"
                )}
                {makeGlitchButton(
                  "images/somaria_blue_pot.png",
                  "Somaria Supertile YBA",
                  "somariaBlueYBA"
                )}
              </Grid.Row>
            </Grid>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Sidebar>
  );
}

export default PageSidebar;
