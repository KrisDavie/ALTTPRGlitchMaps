import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  DoorData,
  DoorGlitchData,
  HookpushData,
  NonDoorGlitchData,
  TileData,
} from "../types"

const baseUrl = import.meta.env.API_BASE_URL

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: "api",
  endpoints: builder => ({
    getTilesData: builder.query<TileData[], string>({
      query: selectedMap =>
        `tiles?filters[Map][$eq]=${selectedMap}&pagination[limit]=256&populate=DropTarget`,
      transformResponse: (response: { data: TileData[]; meta: object }) => {
        return response.data
      },
    }),
    getDoors: builder.query<DoorData[], string>({
      query: selectedMap =>
        `doors?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=*`,
      transformResponse: (response: { data: DoorData[]; meta: object }) => {
        return response.data
      },
    }),
    getDoorGlitches: builder.query<DoorGlitchData[], string>({
      query: selectedMap =>
        `door-glitches?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=door`,
      transformResponse: (response: {
        data: DoorGlitchData[]
        meta: object
      }) => {
        return response.data
      },
    }),
    getNonDoorGlitches: builder.query<NonDoorGlitchData[], string>({
      query: selectedMap =>
        `non-door-glitches?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=tile`,
      transformResponse: (response: {
        data: NonDoorGlitchData[]
        meta: object
      }) => {
        return response.data
      },
    }),
    getHookPushes: builder.query<HookpushData[], string>({
      query: selectedMap =>
        `hookpushes?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=tile`,
      transformResponse: (response: { data: HookpushData[]; meta: object }) => {
        return response.data
      },
    }),
  }),
})

export const {
  useGetTilesDataQuery,
  useGetDoorsQuery,
  useGetDoorGlitchesQuery,
  useGetNonDoorGlitchesQuery,
  useGetHookPushesQuery,
} = apiSlice
