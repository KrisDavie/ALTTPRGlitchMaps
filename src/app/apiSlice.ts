import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  DoorData,
  DoorGlitchData,
  HookpushData,
  NonDoorGlitchData,
  TileData,
  GuideData,
} from "../types"

const baseUrl = '/cms/api'

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
    getReusableGuide: builder.query<GuideData, string>({
      query: title =>
        `reusable-guides?filters[Title][$eq]=${title}&pagination[limit]=1&populate=*`,
      transformResponse: (response: { data: GuideData[]; meta: object }) => {
        return response.data[0]
      },
    }),
    getDoorGlitch: builder.query<DoorGlitchData, string>({
      query: title =>
        `door-glitches?filters[Title][$eq]=${title}&pagination[limit]=1&populate=door&populate=ReusableGuides`,
      transformResponse: (response: { data: DoorGlitchData[]; meta: object }) => {
        return response.data[0]
      },
    }),
    getNonDoorGlitch: builder.query<NonDoorGlitchData, string>({
      query: title =>
        `non-door-glitches?filters[Title][$eq]=${title}&pagination[limit]=1&populate=tile&populate=ReusableGuides`,
      transformResponse: (response: { data: NonDoorGlitchData[]; meta: object }) => {
        return response.data[0]
      },
    }),
    getHookPush: builder.query<HookpushData, string>({
      query: title =>
        `hookpushes?filters[Title][$eq]=${title}&pagination[limit]=1&populate=tile&populate=ReusableGuides`,
      transformResponse: (response: { data: HookpushData[]; meta: object }) => {
        return response.data[0]
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
        `door-glitches?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=door&populate=ReusableGuides`,
      transformResponse: (response: {
        data: DoorGlitchData[]
        meta: object
      }) => {
        return response.data
      },
    }),
    getNonDoorGlitches: builder.query<NonDoorGlitchData[], string>({
      query: selectedMap =>
        `non-door-glitches?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=tile&populate=ReusableGuides`,
      transformResponse: (response: {
        data: NonDoorGlitchData[]
        meta: object
      }) => {
        return response.data
      },
    }),
    getHookPushes: builder.query<HookpushData[], string>({
      query: selectedMap =>
        `hookpushes?filters[Map][$eq]=${selectedMap}&pagination[limit]=1000&populate=tile&populate=ReusableGuides`,
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
  useGetReusableGuideQuery,
  useGetDoorGlitchQuery,
  useGetNonDoorGlitchQuery,
  useGetHookPushQuery
} = apiSlice
