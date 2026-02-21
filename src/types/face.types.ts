export type FaceShape =
  | "oval"
  | "round"
  | "square"
  | "oblong"
  | "heart"
  | "diamond";

export type Gender = "female" | "male" | "unspecified";

export interface FaceMeasurements {
  faceHeight: number;
  cheekboneWidth: number;
  foreheadWidth: number;
  jawlineWidth: number;
  widthToHeightRatio: number;
  foreheadToJawRatio: number;
  cheekToJawRatio: number;
  foreheadToCheekRatio: number;
  chinSharpness: number;
  scores: FaceScores;
}

export interface FaceScores {
  faceLength: number;
  faceWidth: number;
  jawDefinition: number;
  foreheadProminence: number;
  chinPointedness: number;
}

export interface HairstyleRecommendation {
  id: string;
  name: string;
  description: string;
  reason: string;
  gender: Gender | "all";
  avoid?: string;
}

export interface GlassesRecommendation {
  id: string;
  type: string;
  description: string;
  reason: string;
  shopLink?: string;
}

export interface FaceShapeData {
  shape: FaceShape;
  nameKr: string;
  nameEn: string;
  emoji: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  characteristics: string[];
  celebrities: string[];
  defaultScores: FaceScores;
  color: string;
}

export interface ScanResult {
  shape: FaceShape;
  measurements: FaceMeasurements;
  gender: Gender;
}
