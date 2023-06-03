interface DoorData {
  tile: string;
  doors: {
    x: number;
    y: number;
    name: string;
    direction: string;
  }[];
}

interface SelectedGlitch {
  glitch?: GlitchData | HookpushLocation | undefined;
  id?: string;
}

interface GlitchData {
  glitch: string;
  glitchName: string;
  info?: string;
  link?: string;
}

interface DoorGlitchData {
  door: string;
  glitches: GlitchData[];
}

interface GlitchLocation {
  x: number;
  y: number;
  direction: string;
  glitches: GlitchData[];
}

interface NonDoorGlitchData {
  tile: string;
  locations: GlitchLocation[];
}

interface HookpushLocation {
  x: number;
  y: number;
  direction: string;
  pushType: string;
  distance: number;
  glitchName: string;
  info?: string;
  link?: string;
}

interface HookpushData {
  tile: string;
  locations: HookpushLocation[];
}

export type {
  DoorData,
  GlitchData,
  DoorGlitchData,
  HookpushData,
  HookpushLocation,
  NonDoorGlitchData,
  SelectedGlitch,
};
