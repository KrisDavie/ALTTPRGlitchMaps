const glitchToImage = (glitch: string) => {
  switch (glitch) {
    case "redYBA":
      return "images/red_pot.png";
    case "greenYBA":
      return "images/green_pot.png";
    case "blueYBA":
      return "images/blue_pot.png";
    case "somaria":
      return "images/somaria.png";
    case "bomb":
      return "images/bomb.png";
    case "boots":
      return "images/boots.png";
    case "spinGreenYBA":
      return "images/spin_green_pot_112.png";
    case "spinBlueYBA":
      return "images/spin_blue_pot_112.png";
    case "spinSomaria":
      return "images/spin_somaria_112.png";
    case "quadrant":
      return "images/quadrant.png";
    case "jingle":
      return "images/jingle.png";
    case "statueDrag":
      return "images/statue_drag.png";
    case "somariaBlueYBA":
      return "images/somaria_blue_pot.png";
    case "teleportUp":
      return "images/teleport_up.png";
    case "teleportDown":
      return "images/teleport_down.png";
    case "flippers":
      return "images/flippers.png";
    case "citrus":
      return "images/citrus.png";
    case "mirrorPortal":
      return "images/mirror_portal.png";
    case "conveyorUp":
      return "images/conveyor_up.png";
    case "conveyorDown":
      return "images/conveyor_down.png";
    case "mirrorWrap":
      return "images/mirror_wrap.png";
    case "mirrorlessWrap":
      return "images/mirrorless_wrap.png";
    case "owYBA":
      return "images/owYBA.png";
    case "wallmaster":
      return "images/wallmaster.png";
    case "deadLink":
      return "images/dead_link.png";
    default:
      return "images/somaria.png";
  }
};

const directionToRotation = (direction: string) => {
  switch (direction) {
    case "No":
      return 0;
    case "So":
      return 180;
    case "We":
      return 270;
    case "Ea":
      return 90;
    case "Up":
      return 0;
    case "Down":
      return 180;
    default:
      return 0;
  }
};

export { glitchToImage, directionToRotation };
