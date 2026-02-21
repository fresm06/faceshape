import type { FaceShape, FaceMeasurements } from "@/types/face.types";

/**
 * 얼굴형 분류 알고리즘
 *
 * 측정값:
 * - widthToHeightRatio: 광대폭 / 얼굴길이 (0.5~1.0 범위)
 * - foreheadToJawRatio: 이마폭 / 턱선폭 (균형=1.0, >1이면 이마가 더 넓음)
 * - cheekToJawRatio: 광대폭 / 턱선폭 (>1이면 광대가 더 넓음)
 * - foreheadToCheekRatio: 이마폭 / 광대폭 (<1이면 이마가 광대보다 좁음)
 * - chinSharpness: 턱 끝 각도 (작을수록 뾰족, 클수록 둔각/넓음)
 *
 * 분류 우선순위 (겹치는 경우 상위 규칙 우선):
 * 1. 긴형(Oblong): 세로가 가로보다 매우 길고 이마≈턱
 * 2. 둥근형(Round): 가로≈세로이고 턱이 둥글고 넓음
 * 3. 각진형(Square): 가로≈세로이고 턱이 각지고 이마≈턱
 * 4. 하트형(Heart): 이마 >> 턱이고 턱이 뾰족
 * 5. 다이아몬드형(Diamond): 광대 >> 이마, 광대 >> 턱
 * 6. 계란형(Oval): 위 조건 미해당 (이상적인 균형)
 */
export function classifyFaceShape(m: FaceMeasurements): FaceShape {
  const {
    widthToHeightRatio,
    foreheadToJawRatio,
    cheekToJawRatio,
    foreheadToCheekRatio,
    chinSharpness,
  } = m;

  // --- 1. 긴형 (Oblong) ---
  // 세로가 가로의 1.5배 이상, 이마와 턱이 비슷한 너비
  if (
    widthToHeightRatio < 0.67 &&
    Math.abs(foreheadToJawRatio - 1.0) < 0.18
  ) {
    return "oblong";
  }

  // --- 2. 둥근형 (Round) ---
  // 가로와 세로 비율이 크고, 턱이 둔각(넓음/뭉툭)
  if (widthToHeightRatio > 0.84 && chinSharpness < 65) {
    return "round";
  }

  // --- 3. 각진형 (Square) ---
  // 가로/세로 비율이 크고, 이마≈턱이고, 턱이 각짐
  if (
    widthToHeightRatio > 0.78 &&
    Math.abs(foreheadToJawRatio - 1.0) < 0.14 &&
    chinSharpness >= 65
  ) {
    return "square";
  }

  // --- 4. 하트형 (Heart) ---
  // 이마가 턱보다 눈에 띄게 넓고 턱이 뾰족
  if (foreheadToJawRatio > 1.22 && chinSharpness > 55) {
    return "heart";
  }

  // --- 5. 다이아몬드형 (Diamond) ---
  // 광대가 가장 넓고 이마가 광대보다 좁음
  if (cheekToJawRatio > 1.22 && foreheadToCheekRatio < 0.88) {
    return "diamond";
  }

  // --- 6. 계란형 (Oval) ---
  // 위 조건에 해당하지 않는 균형 잡힌 얼굴
  return "oval";
}

/**
 * 분류 신뢰도 계산 (각 얼굴형과의 거리 점수)
 * 각 얼굴형의 대표 특성과의 거리를 계산하여 가장 가까운 얼굴형 반환
 */
export function classifyWithConfidence(
  m: FaceMeasurements
): { shape: FaceShape; confidence: number }[] {
  const primary = classifyFaceShape(m);

  // 각 얼굴형별 대표 파라미터 (widthToHeightRatio, foreheadToJawRatio, cheekToJawRatio, chinSharpness)
  const profiles: Record<
    FaceShape,
    [number, number, number, number]
  > = {
    oval: [0.72, 1.05, 1.1, 75],
    round: [0.90, 1.02, 1.05, 55],
    square: [0.83, 1.00, 1.08, 75],
    oblong: [0.60, 1.00, 1.05, 72],
    heart: [0.74, 1.35, 1.15, 62],
    diamond: [0.75, 0.88, 1.28, 60],
  };

  const actual = [
    m.widthToHeightRatio,
    m.foreheadToJawRatio,
    m.cheekToJawRatio,
    m.chinSharpness / 100, // normalize
  ];

  const scores = Object.entries(profiles).map(([shape, profile]) => {
    const normalizedProfile = [
      profile[0],
      profile[1],
      profile[2],
      profile[3] / 100,
    ];
    const distance = Math.sqrt(
      normalizedProfile.reduce(
        (sum, val, i) => sum + (val - actual[i]) ** 2,
        0
      )
    );
    return { shape: shape as FaceShape, confidence: 1 / (1 + distance * 3) };
  });

  scores.sort((a, b) => b.confidence - a.confidence);

  // Ensure primary classification is first
  const primaryIndex = scores.findIndex((s) => s.shape === primary);
  if (primaryIndex > 0) {
    const [primaryScore] = scores.splice(primaryIndex, 1);
    scores.unshift(primaryScore);
  }

  return scores;
}
