import { useSearchParams as useReactSearchParams } from "react-router-dom";

export interface SearchParams {
  map?: "EG1" | "EG2" | "LW" | "DW";
  glitchName?: string;
}

export const useSearchParams = (): SearchParams => {
  const [searchParams] = useReactSearchParams();

  const map = searchParams.get("map") as "EG1" | "EG2" | "LW" | "DW";
  const glitchName = searchParams.get("glitch") ?? "";

  return {
    map,
    glitchName,
  };
};
