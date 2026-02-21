import type { FaceMeasurements, FaceScores } from "@/types/face.types";

interface Landmark {
  x: number;
  y: number;
  z: number;
}

/**
 * 픽셀 공간에서 각도 계산 (이미지 비율 적용)
 * 정규화된 좌표를 그대로 쓰면 세로 사진에서 각도가 왜곡됨
 */
function pixelAngleAtVertex(
  vertex: Landmark,
  pointA: Landmark,
  pointB: Landmark,
  imageWidth: number,
  imageHeight: number
): number {
  const vA = {
    x: (pointA.x - vertex.x) * imageWidth,
    y: (pointA.y - vertex.y) * imageHeight,
  };
  const vB = {
    x: (pointB.x - vertex.x) * imageWidth,
    y: (pointB.y - vertex.y) * imageHeight,
  };
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
 * MediaPipe FaceLandmarker 478 landmarks
 *
 * 사용 랜드마크:
 * 10   - 이마 상단 (얼굴 높이 시작)
 * 152  - 턱 끝 (얼굴 높이 끝)
 * 234  - 좌측 외곽 (가장 넓은 폭, 귀 근처) → widthToHeightRatio 전용
 * 454  - 우측 외곽
 * 54   - 좌측 눈썹 외측 (이마 폭)
 * 284  - 우측 눈썹 외측
 * 116  - 좌측 광대뼈 (실제 颧骨 수준)
 * 345  - 우측 광대뼈
 * 58   - 좌측 하악각 (턱선 폭)
 * 288  - 우측 하악각
 * 148  - 좌측 턱 옆 (chin sharpness)
 * 377  - 우측 턱 옆
 */
export function extractMeasurements(
  landmarks: Landmark[],
  imageWidth = 400,
  imageHeight = 533,
): FaceMeasurements | null {
  if (!landmarks || landmarks.length < 100) {
    console.warn(`랜드마크 부족: ${landmarks?.length ?? 0}개`);
    return null;
  }

  const get = (idx: number): Landmark => {
    if (idx < landmarks.length) return landmarks[idx];
    return { x: 0.5, y: 0.5, z: 0 };
  };

  const top           = get(10);   // 이마 상단
  const chin          = get(152);  // 턱 끝
  const leftOuter     = get(234);  // 좌측 최대폭 (귀 레벨)
  const rightOuter    = get(454);  // 우측 최대폭
  const leftForehead  = get(54);   // 좌측 눈썹 외측 (이마)
  const rightForehead = get(284);  // 우측 눈썹 외측
  const leftCheek     = get(116);  // 좌측 광대
  const rightCheek    = get(345);  // 우측 광대
  const leftJaw       = get(58);   // 좌측 하악각
  const rightJaw      = get(288);  // 우측 하악각
  const leftChinSide  = get(148);  // 좌측 턱선
  const rightChinSide = get(377);  // 우측 턱선

  // ── 1. widthToHeightRatio: 이미지 비율 보정 (핵심 버그 수정) ──
  // 정규화 좌표: x는 이미지 너비 기준, y는 이미지 높이 기준
  // 세로 사진(portrait)에서 보정 없이 계산하면 1.0 이상이 나와서 항상 round/square로 분류됨
  const faceHeightNorm  = chin.y - top.y;
  const faceWidthNorm   = rightOuter.x - leftOuter.x;
  const aspectRatio     = imageWidth / imageHeight;
  const widthToHeightRatio = (faceWidthNorm / Math.max(faceHeightNorm, 0.001)) * aspectRatio;

  // ── 2. 폭 비율: x좌표 차이만 사용 (imageWidth로 서로 상쇄됨, 비율에 불필요) ──
  const foreheadWidth  = rightForehead.x - leftForehead.x;
  const cheekboneWidth = rightCheek.x - leftCheek.x;
  const jawlineWidth   = rightJaw.x - leftJaw.x;

  const foreheadToJawRatio   = foreheadWidth  / Math.max(jawlineWidth, 0.001);
  const cheekToJawRatio      = cheekboneWidth / Math.max(jawlineWidth, 0.001);
  const foreheadToCheekRatio = foreheadWidth  / Math.max(cheekboneWidth, 0.001);

  // ── 3. 턱 날카로움: 픽셀 공간 각도 계산 ──
  const chinSharpness = pixelAngleAtVertex(
    chin, leftChinSide, rightChinSide, imageWidth, imageHeight
  );

  // 디버깅용 로그
  console.debug("[FaceShape] 측정값:", {
    widthToHeightRatio: widthToHeightRatio.toFixed(3),
    foreheadToJawRatio: foreheadToJawRatio.toFixed(3),
    cheekToJawRatio: cheekToJawRatio.toFixed(3),
    foreheadToCheekRatio: foreheadToCheekRatio.toFixed(3),
    chinSharpness: chinSharpness.toFixed(1),
    aspectRatio: aspectRatio.toFixed(3),
  });

  // Radar 차트용 점수 (0~100 정규화)
  const scores: FaceScores = {
    faceLength:         clamp((1 / widthToHeightRatio) * 55, 10, 100),
    faceWidth:          clamp(widthToHeightRatio * 110, 10, 100),
    jawDefinition:      clamp((180 - chinSharpness) / 1.3, 10, 100),
    foreheadProminence: clamp(foreheadToCheekRatio * 95, 10, 100),
    chinPointedness:    clamp((chinSharpness / 160) * 100, 10, 100),
  };

  return {
    faceHeight:          faceHeightNorm,
    cheekboneWidth:      cheekboneWidth,
    foreheadWidth:       foreheadWidth,
    jawlineWidth:        jawlineWidth,
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
    fw:   m.widthToHeightRatio.toFixed(3),
    fj:   m.foreheadToJawRatio.toFixed(3),
    cj:   m.cheekToJawRatio.toFixed(3),
    fc:   m.foreheadToCheekRatio.toFixed(3),
    chin: m.chinSharpness.toFixed(1),
    meas: "true",
  });
  return params.toString();
}

export function queryParamsToScores(
  params: URLSearchParams
): FaceScores | null {
  const fw   = parseFloat(params.get("fw")   ?? "");
  const fc   = parseFloat(params.get("fc")   ?? "");
  const chin = parseFloat(params.get("chin") ?? "");

  if ([fw, fc, chin].some(isNaN)) return null;

  return {
    faceLength:         clamp((1 / fw) * 55,          10, 100),
    faceWidth:          clamp(fw * 110,                10, 100),
    jawDefinition:      clamp((180 - chin) / 1.3,     10, 100),
    foreheadProminence: clamp(fc * 95,                 10, 100),
    chinPointedness:    clamp((chin / 160) * 100,      10, 100),
  };
}
