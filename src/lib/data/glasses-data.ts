import type { GlassesRecommendation } from "@/types/face.types";

export const glassesData: Record<
  string,
  { recommended: GlassesRecommendation[]; avoid: string[] }
> = {
  oval: {
    recommended: [
      {
        id: "oval-g1",
        type: "오벌 프레임",
        description: "부드러운 곡선의 타원형 프레임으로 클래식하고 우아한 인상을 줍니다.",
        reason:
          "계란형 얼굴의 부드러운 선과 자연스럽게 어우러져 세련된 조화를 이룹니다.",
        shopLink: "#",
      },
      {
        id: "oval-g2",
        type: "캣아이 프레임",
        description: "바깥 끝이 살짝 올라간 고양이 눈 형태의 세련된 프레임입니다.",
        reason:
          "계란형의 균형 잡힌 비율이 캣아이의 개성 있는 선을 완벽하게 소화합니다.",
        shopLink: "#",
      },
      {
        id: "oval-g3",
        type: "웨이파러 프레임",
        description: "클래식한 직사각형의 약간 굵은 프레임으로 강한 인상을 줍니다.",
        reason:
          "계란형 얼굴은 대부분의 안경을 소화할 수 있어 트렌디한 웨이파러도 잘 어울립니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "너무 크거나 작은 극단적인 사이즈는 균형감을 해칠 수 있습니다.",
    ],
  },

  round: {
    recommended: [
      {
        id: "round-g1",
        type: "직사각형 프레임",
        description:
          "가로로 넓고 각진 사각형 프레임으로 둥근 얼굴에 선명한 인상을 더합니다.",
        reason:
          "각진 프레임이 둥근 얼굴형의 곡선을 중화시키고 얼굴이 갸름하고 선명해 보이는 효과를 줍니다.",
        shopLink: "#",
      },
      {
        id: "round-g2",
        type: "브로우라인 프레임",
        description:
          "프레임 위쪽이 두껍고 아래쪽이 얇거나 리믈리스인 반무테 스타일입니다.",
        reason:
          "눈 위쪽에 강한 선이 생겨 시선이 위로 집중되고 얼굴이 갸름하고 세련되어 보입니다.",
        shopLink: "#",
      },
      {
        id: "round-g3",
        type: "좁고 긴 직사각형",
        description:
          "가로로 넓고 세로로 좁은 스포티한 직사각형 프레임입니다.",
        reason:
          "수평적인 선이 얼굴의 세로 방향으로 시선을 유도하여 얼굴이 더 길고 갸름해 보입니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "라운드 프레임: 둥근 얼굴을 더 강조합니다.",
      "작은 원형 프레임: 얼굴이 더 넓어 보일 수 있습니다.",
    ],
  },

  square: {
    recommended: [
      {
        id: "square-g1",
        type: "오벌 프레임",
        description:
          "부드러운 타원형 곡선의 프레임으로 각진 얼굴에 여성스러운 부드러움을 더합니다.",
        reason:
          "오벌의 부드러운 곡선이 각진 얼굴의 딱딱한 선을 중화시켜 여성스럽고 조화로운 인상을 만들어줍니다.",
        shopLink: "#",
      },
      {
        id: "square-g2",
        type: "라운드 프레임",
        description: "완전한 원형에 가까운 둥근 프레임으로 빈티지한 느낌을 줍니다.",
        reason:
          "원형 프레임의 곡선이 각진 얼굴의 선을 부드럽게 만들어줍니다.",
        shopLink: "#",
      },
      {
        id: "square-g3",
        type: "리믈리스 (무테)",
        description:
          "프레임이 없거나 최소화된 안경으로 얼굴의 윤곽을 자연스럽게 드러냅니다.",
        reason:
          "테가 없어 얼굴에 추가적인 선이 생기지 않아 각진 인상이 자연스럽게 중화됩니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "사각형 프레임: 같은 선이 반복되어 얼굴이 더 각져 보입니다.",
      "직사각형 프레임: 각진 인상이 더욱 강해질 수 있습니다.",
    ],
  },

  oblong: {
    recommended: [
      {
        id: "oblong-g1",
        type: "와이드 오버사이즈",
        description:
          "얼굴보다 넓고 큰 오버사이즈 프레임으로 시선을 가로로 분산시킵니다.",
        reason:
          "가로로 넓은 프레임이 긴 얼굴의 세로감을 줄이고 균형 있는 인상을 만들어줍니다.",
        shopLink: "#",
      },
      {
        id: "oblong-g2",
        type: "어비에이터 (보잉) 프레임",
        description: "아래로 살짝 넓어지는 형태의 클래식 파일럿 스타일 프레임입니다.",
        reason:
          "독특한 형태가 시선을 가로로 분산시키고 긴 얼굴에 균형감을 더해줍니다.",
        shopLink: "#",
      },
      {
        id: "oblong-g3",
        type: "클럽마스터 프레임",
        description: "위쪽이 두꺼운 클래식한 반뿔테 스타일의 프레임입니다.",
        reason:
          "위쪽의 두꺼운 프레임이 시선을 가로 방향으로 분산시켜 얼굴이 덜 길어 보이게 합니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "좁고 작은 프레임: 얼굴이 더 길고 가늘어 보입니다.",
      "높이가 긴 직사각형 프레임: 세로감이 강화됩니다.",
    ],
  },

  heart: {
    recommended: [
      {
        id: "heart-g1",
        type: "하단 강조 프레임",
        description:
          "아래쪽이 두껍고 위쪽이 가벼운 구조로 시선을 아래로 유도하는 프레임입니다.",
        reason:
          "넓은 이마에서 시선을 아래로 분산시켜 이마-턱의 비율 차이를 줄여줍니다.",
        shopLink: "#",
      },
      {
        id: "heart-g2",
        type: "오벌 or 라운드 리믈리스",
        description:
          "테가 없거나 최소화된 둥근 형태의 안경으로 가벼운 인상을 줍니다.",
        reason:
          "무거운 프레임을 피하고 가벼운 테로 이마 위쪽의 시각적 부담을 줄여줍니다.",
        shopLink: "#",
      },
      {
        id: "heart-g3",
        type: "넓은 보텀 프레임",
        description:
          "아래쪽 프레임이 넓게 처리된 독특한 디자인의 안경입니다.",
        reason:
          "시선이 안경 아래쪽으로 향해 넓은 이마보다 좁은 턱 쪽에 무게감을 더해줍니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "캣아이 프레임: 위쪽 이마를 더욱 강조합니다.",
      "탑 헤비 프레임: 넓은 이마가 더 부각됩니다.",
    ],
  },

  diamond: {
    recommended: [
      {
        id: "diamond-g1",
        type: "오벌 프레임",
        description:
          "부드러운 타원형으로 돌출된 광대를 부드럽게 중화시키는 프레임입니다.",
        reason:
          "부드러운 선이 광대의 각진 느낌을 완화시키고 전체적인 인상을 부드럽게 만들어줍니다.",
        shopLink: "#",
      },
      {
        id: "diamond-g2",
        type: "캣아이 프레임",
        description:
          "바깥 끝이 올라가는 캣아이 프레임으로 광대의 가로폭을 시각적으로 커버합니다.",
        reason:
          "프레임의 위쪽 선이 광대 위치를 지나 올라가므로 광대의 돌출감을 줄여줍니다.",
        shopLink: "#",
      },
      {
        id: "diamond-g3",
        type: "리믈리스 상단 뷰티라인",
        description:
          "상단에만 테가 있는 브로우라인 스타일로 가벼운 인상을 줍니다.",
        reason:
          "광대 부분에 프레임이 없어 시각적으로 광대의 폭이 줄어드는 효과가 있습니다.",
        shopLink: "#",
      },
    ],
    avoid: [
      "좁고 작은 프레임: 광대가 더 돌출되어 보입니다.",
      "광대 높이에서 가장 넓은 프레임: 광대를 더 강조합니다.",
    ],
  },
};

export const getGlassesData = (shape: string) =>
  glassesData[shape] || glassesData["oval"];
