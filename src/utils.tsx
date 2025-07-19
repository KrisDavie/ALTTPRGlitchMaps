const glitchToImage = (glitch: string) => {
  switch (glitch) {
    case "Double YBA":
      return "images/red_pot.png";
    case "Subtile YBA":
      return "images/green_pot.png";
    case "Supertile YBA":
      return "images/blue_pot.png";
    case "Somaria":
      return "images/somaria.png";
    case "Bomb Juke":
    case "Bomb Clip":	
      return "images/bomb.png";
    case "Stairmaster":
      return "images/stairmaster.png"
    case "Spinspeed Clip/Clip Through":
      return "images/boots.png";
    case "Spin Subtile YBA":
      return "images/spin_green_pot_112.png";
    case "Spin Supertile YBA":
      return "images/spin_blue_pot_112.png";
    case "Spin Somaria":
      return "images/spin_somaria_112.png";
    case "Quadrant Glitch":
      return "images/quadrant.png";
    case "Jingle Glitch":
      return "images/jingle.png";
    case "Statue Drag":
      return "images/statue_drag.png";
    case "Somaria Supertile YBA":
      return "images/somaria_blue_pot.png";
    case "Up Teleport":
      return "images/teleport_up.png";
    case "Down Teleport":
      return "images/teleport_down.png";
    case "Swim Clip":
      return "images/flippers.png";
    case "Citrus Clip":
      return "images/citrus.png";
    case "Mirror Clip/Portal Offset":
      return "images/mirror_portal.png";
    case "Overworld Conveyor Up":
      return "images/conveyor_up.png";
    case "Overworld Conveyor Down":
      return "images/conveyor_down.png";
    case "Mirror Wrap":
      return "images/mirror_wrap.png";
    case "Mirrorless Wrap":
      return "images/mirrorless_wrap.png";
    case "Overworld YBA":
      return "images/owYBA.png";
    case "Treewarp":
      return "images/wallmaster.png";
    case "Deathhole/0hp":
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
