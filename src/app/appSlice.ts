import { createSlice } from "@reduxjs/toolkit"
import { SelectedGlitch } from "../types"

export interface AppState {
  sidebarVisible: boolean
  selectedGlitch: SelectedGlitch
  enabledGlitches: string[]
  showSomariaPits: boolean
  selectedMap: "EG1" | "EG2" | "LW" | "DW"
  currentScale: number
  mousePosition: { x: number; y: number; tile: string }
  showMousePosition?: boolean
  checkMousePosition?: boolean
}

const initialState: AppState = {
  sidebarVisible: true,
  selectedGlitch: {
    glitch: undefined,
    id: undefined,
  },
  enabledGlitches: [
    "Supertile YBA",
    "Bomb Juke",
    "Stairmaster",
    "Spinspeed Clip/Clip Through",
    "Subtile YBA",
    "Jingle Glitch",
    "Quadrant Glitch",
    "Double YBA",
    "Somaria",
    "Somaria Supertile YBA",
    "Spin Supertile YBA",
    "Spin Subtile YBA",
    "Spin Somaria",
    "Statue Drag",
    "Deathhole/0hp",
    "hookpush-Somaria",
    "hookpush-Boomerang",
    "hookpush-Stuckpush",
  ],
  showSomariaPits: false,
  selectedMap: "EG1",
  currentScale: 1,
  mousePosition: { x: 0, y: 0, tile: "" },
  showMousePosition: false,
  checkMousePosition: false,
}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedMap: (state, action) => {
      state.selectedMap = action.payload
    },
    setShowSomariaPits: (state, action) => {
      state.showSomariaPits = action.payload
    },
    setSelectedGlitch: (state, action) => {
      state.selectedGlitch = action.payload
    },
    setEnabledGlitches: (state, action) => {
      state.enabledGlitches = action.payload
    },
    setMousePosition: (state, action) => {
      state.mousePosition = action.payload
    },
    checkMousePosition: (state, action) => {
      state.checkMousePosition = action.payload
      state.showMousePosition = true
    },
  },
})

export const {
  setSelectedMap,
  setEnabledGlitches,
  setShowSomariaPits,
  setSelectedGlitch,
  setMousePosition,
  checkMousePosition,
} = appSlice.actions

export default appSlice.reducer
export const appActions = appSlice.actions
