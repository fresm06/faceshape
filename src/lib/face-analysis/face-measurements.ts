import type { FaceMeasurements, FaceScores } from "@/types/face.types";

interface Landmark {
  x: number;
  y: number;
  z: number;
}

function dist(a: Landmark, b: Landmark): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function angleAtVertex(
  vertex: Landmark,
  pointA: Landmark,
  pointB: Landmark
): number {
  const vA = { x: pointA.x - vertex.x, y: pointA.y - vertex.y };
  const vB = { x: pointB.x - vertex.x, y: pointB.y - vertex.y };
  const dot = vA.x * vB.x + vA.y * vB.y;
  const magA = Math.sqrt(vA.x ** 2 + vA.y ** 2);
  const magB = Math.sqrt(vB.x ** 2 + vB.y ** 2);
  if (magA === 0 || magB === 0) return 90;
  const cosAngle = Math.max(-1, Math.min(1, dot / (magA * magB)));
  return Math.acos(cosAngle) * (180 / Math.PI);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * MediaPipe Face Landmarker 478 landmarks (Face Mesh v2)
 *
 * Key indices:
 * 10  - Top of forehead (top of face)
 * 152 - Bottom of chin
 * 234 - Left cheek outer
 * 454 - Right cheek outer
 * 67  - Left forehead temple
 * 297 - Right forehead temple
 * 172 - Left jaw
 * 397 - Right jaw
 * 148 - Left chin side
 * 377 - Right chin side
 */
export function extractMeasurements(
  landmarks: Landmark[]
): FaceMeasurements | null {
  if (!landmarks || landmarks.length < 478) {
    console.warn(
      `Expected 478 landmarks, got ${landmarks?.length ?? 0}. Using fallback.`
    );
    if (!landmarks || landmarks.length < 155) return null;
  }

  const get = (idx: number): Landmark => {
    if (idx < landmarks.length) return landmarks[idx];
    // Fallback: return a neutral position
    return { x: 0.5, y: 0.5, z: 0 };
  };

  const top = get(10);
  const chin = get(152);
  const leftCheek = get(234);
  const rightCheek = get(454);
  const leftForehead = get(67);
  const rightForehead = get(297);
  const leftJaw = get(172);
  const rightJaw = get(397);
  const leftChinSide = get(148);
  const rightChinSide = get(377);

  const faceHeight = dist(top, chin);
  const cheekboneWidth = dist(leftCheek, rightCheek);
  const foreheadWidth = dist(leftForehead, rightForehead);
  const jawlineWidth = dist(leftJaw, rightJaw);

  // Angle at chin point between the two chin-side points
  const chinSharpness = angleAtVertex(chin, leftChinSide, rightChinSide);

  const widthToHeightRatio = cheekboneWidth / Math.max(faceHeight, 0.001);
  const foreheadToJawRatio = foreheadWidth / Math.max(jawlineWidth, 0.001);
  const cheekToJawRatio = cheekboneWidth / Math.max(jawlineWidth, 0.001);
  const foreheadToCheekRatio = foreheadWidth / Math.max(cheekboneWidth, 0.001);

  // Normalize to 0–100 radar chart scores
  const scores: FaceScores = {
    // Long face = high score
    faceLength: clamp((1 / widthToHeightRatio) * 65, 10, 100),
    // Wide face = high score
    faceWidth: clamp(widthToHeightRatio * 120, 10, 100),
    // Angular jaw = high score (180 - chinAngle)
    jawDefinition: clamp((180 - chinSharpness) / 1.3, 10, 100),
    // Prominent forehead (forehead > cheek) = high score
    foreheadProminence: clamp(foreheadToCheekRatio * 95, 10, 100),
    // Pointed chin = high score
    chinPointedness: clamp((chinSharpness / 160) * 100, 10, 100),
  };

  return {
    faceHeight,
    cheekboneWidth,
    foreheadWidth,
    jawlineWidth,
    widthToHeightRatio,
    foreheadToJawRatio,
    cheekToJawRatio,
    foreheadToCheekRatio,
    chinSharpness,
    scores,
  };
}

export function measurementsToQueryParams(m: FaceMeasurements): string {
  const params = new URLSearchParams({
    fw: m.widthToHeightRatio.toFixed(3),
    fj: m.foreheadToJawRatio.toFixed(3),
    cj: m.cheekToJawRatio.toFixed(3),
    fc: m.foreheadToCheekRatio.toFixed(3),
    chin: m.chinSharpness.toFixed(1),
    meas: "true",
  });
  return params.toString();
}

export function queryParamsToScores(
  params: URLSearchParams
): FaceScores | null {
  const fw = parseFloat(params.get("fw") ?? "");
  const fj = parseFloat(params.get("fj") ?? "");
  const cj = parseFloat(params.get("cj") ?? "");
  const fc = parseFloat(params.get("fc") ?? "");
  const chin = parseFloat(params.get("chin") ?? "");

  if ([fw, fj, cj, fc, chin].some(isNaN)) return null;

  return {
    faceLength: clamp((1 / fw) * 65, 10, 100),
    faceWidth: clamp(fw * 120, 10, 100),
    jawDefinition: clamp((180 - chin) / 1.3, 10, 100),
    foreheadProminence: clamp(fc * 95, 10, 100),
    chinPointedness: clamp((chin / 160) * 100, 10, 100),
  };
}
