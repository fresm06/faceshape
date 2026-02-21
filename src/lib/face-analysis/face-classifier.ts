import type { FaceShape, FaceMeasurements } from "@/types/face.types";

/**
 * 얼굴형 분류 알고리즘 (보정된 랜드마크 + 비율 기반)
 *
 * 측정값 예상 범위 (이미지 비율 보정 후):
 * - widthToHeightRatio:   0.55~0.90  (세로/가로 비율; 커질수록 넓적한 얼굴)
 * - foreheadToJawRatio:   0.85~1.30  (이마/턱선 폭 비율; >1이면 이마 넓음)
 * - cheekToJawRatio:      0.95~1.35  (광대/턱선 비율; >1이면 광대 넓음)
 * - foreheadToCheekRatio: 0.70~1.05  (이마/광대 비율; <1이면 이마 좁음)
 * - chinSharpness:        35~100°    (작을수록 뾰족한 턱)
 *
 * 분류 우선순위:
 * 1. 긴형(Oblong)    - 세로가 매우 길고 이마≈턱
 * 2. 둥근형(Round)   - 가로≈세로, 둔각 턱
 * 3. 각진형(Square)  - 가로≈세로, 각진 턱, 이마≈턱
 * 4. 하트형(Heart)   - 이마 >> 턱, 뾰족한 턱
 * 5. 다이아몬드형    - 광대 >> 이마, 광대 >> 턱
 * 6. 계란형(Oval)    - 위 조건 미해당 (기본값)
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
  // 세로가 가로의 1.5배 이상 (widthToHeightRatio < 0.67), 이마≈턱
  if (
    widthToHeightRatio < 0.67 &&
    Math.abs(foreheadToJawRatio - 1.0) < 0.22
  ) {
    return "oblong";
  }

  // --- 2. 둥근형 (Round) ---
  // 넓적한 얼굴 (widthToHeightRatio > 0.84) + 부드러운 턱 (chinSharpness < 68)
  if (widthToHeightRatio > 0.84 && chinSharpness < 68) {
    return "round";
  }

  // --- 3. 각진형 (Square) ---
  // 넓적 + 이마≈턱 + 각진 턱
  if (
    widthToHeightRatio > 0.78 &&
    Math.abs(foreheadToJawRatio - 1.0) < 0.18 &&
    chinSharpness >= 68
  ) {
    return "square";
  }

  // --- 4. 하트형 (Heart) ---
  // 이마가 턱보다 확연히 넓고 (foreheadToJawRatio > 1.15), 뾰족한 턱
  if (foreheadToJawRatio > 1.15 && chinSharpness > 50) {
    return "heart";
  }

  // --- 5. 다이아몬드형 (Diamond) ---
  // 광대가 턱보다 확연히 넓고 (새 랜드마크로 측정; 이제 threshold가 현실적)
  // AND 이마가 광대보다 좁음
  if (cheekToJawRatio > 1.18 && foreheadToCheekRatio < 0.82) {
    return "diamond";
  }

  // --- 6. 계란형 (Oval) ---
  return "oval";
}

/**
 * 분류 신뢰도 계산 (각 얼굴형 이상형과의 거리 기반)
 */
export function classifyWithConfidence(
  m: FaceMeasurements
): { shape: FaceShape; confidence: number }[] {
  const primary = classifyFaceShape(m);

  // 각 얼굴형 이상형 파라미터 [widthToHeightRatio, foreheadToJawRatio, cheekToJawRatio, chinSharpness]
  const profiles: Record<FaceShape, [number, number, number, number]> = {
    oval:    [0.72, 1.02, 1.08, 72],
    round:   [0.88, 1.00, 1.06, 55],
    square:  [0.82, 1.00, 1.05, 82],
    oblong:  [0.58, 1.02, 1.05, 70],
    heart:   [0.72, 1.22, 1.08, 62],
    diamond: [0.73, 0.94, 1.25, 58],
  };

  const actual = [
    m.widthToHeightRatio,
    m.foreheadToJawRatio,
    m.cheekToJawRatio,
    m.chinSharpness / 100,
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

  // 규칙 기반 결과를 최상위로
  const primaryIndex = scores.findIndex((s) => s.shape === primary);
  if (primaryIndex > 0) {
    const [primaryScore] = scores.splice(primaryIndex, 1);
    scores.unshift(primaryScore);
  }

  return scores;
}
