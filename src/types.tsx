import { BlocksContent } from "@strapi/blocks-react-renderer";

type Direction = "No" | "Up" | "Ea" | "So" | "Do" | "We";
type Map = "EG1" | "EG2" | "LW" | "DW";

interface TileData {
  TileID: string;
  DropTarget: TileData;
}

interface DoorData {
  tile: TileData;
  x: number;
  y: number;
  Name: string;
  Direction: Direction;
  Map: Map;
  door_glitches?: DoorGlitchData[];
}

interface GlitchData {
  Title: string;
  Description: string;
  Map: Map;
  Guide: BlocksContent;
  Type: string;
}

interface NonDoorGlitchData extends GlitchData {
  x: number;
  y: number;
  Direction: Direction;
  tile?: TileData;
}

interface DoorGlitchData extends GlitchData {
  door: DoorData;
}

interface HookpushData extends NonDoorGlitchData {
  Distance: number;
}

type Glitch = DoorGlitchData | NonDoorGlitchData | HookpushData;

interface SelectedGlitch {
  glitch?: Glitch | undefined;
  id?: string;
}

export type {
  DoorData,
  GlitchData,
  Glitch,
  DoorGlitchData,
  HookpushData,
  NonDoorGlitchData,
  SelectedGlitch,
  TileData,
};
