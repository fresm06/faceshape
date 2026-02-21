import type { HairstyleRecommendation } from "@/types/face.types";

export const hairstyleData: Record<string, HairstyleRecommendation[]> = {
  oval: [
    {
      id: "oval-f1",
      name: "레이어드 컷",
      description:
        "자연스럽게 층을 내어 움직임과 볼륨을 살린 스타일로, 계란형 얼굴의 균형미를 더욱 빛내줍니다.",
      reason:
        "계란형의 부드러운 곡선과 자연스럽게 어울리며, 어떤 길이에서도 소화 가능합니다.",
      gender: "female",
    },
    {
      id: "oval-f2",
      name: "내추럴 웨이브",
      description:
        "고정되지 않고 자연스럽게 흘러내리는 웨이브로, 여성스럽고 세련된 인상을 만들어줍니다.",
      reason:
        "균형 잡힌 계란형 얼굴에 자연스러운 곡선의 웨이브가 더해져 완벽한 조화를 이룹니다.",
      gender: "female",
    },
    {
      id: "oval-f3",
      name: "쇼트 밥",
      description:
        "귀밑을 따라 깔끔하게 정리된 짧은 밥컷으로, 세련되고 모던한 이미지를 연출합니다.",
      reason:
        "계란형 얼굴의 황금 비율이 짧은 헤어와 만나 얼굴 자체의 아름다움을 더욱 부각시킵니다.",
      gender: "female",
    },
    {
      id: "oval-m1",
      name: "투블럭 컷",
      description:
        "옆과 뒤를 짧게 치고 위쪽에 볼륨을 남기는 스타일로, 세련되고 깔끔한 인상을 만듭니다.",
      reason:
        "균형 잡힌 계란형 얼굴에 투블럭의 단정한 선이 더해져 전문적이고 세련된 이미지를 완성합니다.",
      gender: "male",
    },
    {
      id: "oval-m2",
      name: "올백 스타일",
      description:
        "앞머리를 모두 뒤로 넘겨 이마를 드러내는 클래식한 스타일입니다.",
      reason:
        "계란형 얼굴의 완성도 높은 비율이 넓은 이마와 함께 당당하고 카리스마 있는 인상을 만듭니다.",
      gender: "male",
    },
    {
      id: "oval-m3",
      name: "자연스러운 웨이브",
      description:
        "약한 웨이브 펌으로 자연스러운 텍스처를 더한 캐주얼한 스타일입니다.",
      reason:
        "계란형 얼굴의 부드러운 선에 잘 어우러지며 편안하고 친근한 이미지를 만들어냅니다.",
      gender: "male",
    },
  ],

  round: [
    {
      id: "round-f1",
      name: "높은 포니테일",
      description:
        "머리카락을 높은 위치에 묶어 올리는 스타일로, 얼굴 위쪽에 수직적 시선을 유도합니다.",
      reason:
        "위쪽으로 볼륨을 만들어 시각적으로 얼굴을 길고 갸름하게 보이게 합니다.",
      gender: "female",
      avoid: "낮은 포니테일, 귀 높이의 양 갈래는 피해주세요.",
    },
    {
      id: "round-f2",
      name: "긴 레이어드 컷",
      description:
        "쇄골 아래까지 내려오는 층층이 레이어드로 얼굴 주변에 세로 방향의 흐름을 만들어줍니다.",
      reason:
        "얼굴 옆으로 길게 내려오는 헤어가 둥근 얼굴형을 갸름하게 보이게 하는 착시 효과가 있습니다.",
      gender: "female",
      avoid: "턱선에서 끊기는 단발이나 볼을 덮는 헤어는 피해주세요.",
    },
    {
      id: "round-f3",
      name: "사이드 파트 스트레이트",
      description:
        "가르마를 옆으로 나눠 비대칭적인 라인을 만드는 스타일입니다.",
      reason:
        "비대칭 가르마가 얼굴의 동그란 인상을 깨고 날카롭고 세련된 인상을 만들어줍니다.",
      gender: "female",
      avoid: "정중앙 가르마는 동그란 얼굴이 더욱 강조됩니다.",
    },
    {
      id: "round-m1",
      name: "볼륨 탑 스타일",
      description:
        "위쪽 볼륨을 살리고 옆과 뒤를 깔끔하게 유지하는 스타일입니다.",
      reason:
        "위로 올라간 볼륨이 얼굴을 시각적으로 길어 보이게 하여 둥근 얼굴의 단점을 보완합니다.",
      gender: "male",
    },
    {
      id: "round-m2",
      name: "언더컷",
      description:
        "옆과 뒤를 짧게 치고 위를 길게 남겨 강한 대비를 만드는 스타일입니다.",
      reason:
        "위아래 볼륨의 강한 대비가 시선을 위쪽으로 끌어올려 얼굴이 갸름해 보입니다.",
      gender: "male",
      avoid: "옆으로 볼륨이 퍼지는 스타일은 얼굴이 더 넓어 보입니다.",
    },
    {
      id: "round-m3",
      name: "프린지 업스타일",
      description:
        "앞머리를 올려 이마를 드러내고 전체를 위로 세운 스타일입니다.",
      reason: "이마가 드러나면 얼굴이 더 길어 보이는 착시 효과를 만들어냅니다.",
      gender: "male",
    },
  ],

  square: [
    {
      id: "square-f1",
      name: "사이드 뱅",
      description:
        "이마 한쪽을 자연스럽게 덮는 앞머리 스타일로, 각진 이마 선을 부드럽게 가려줍니다.",
      reason:
        "이마의 각진 선을 자연스럽게 가리고 얼굴에 부드러운 곡선감을 더해 여성스럽게 만들어줍니다.",
      gender: "female",
      avoid: "블런트한 일자 뱅은 각진 이마를 더 강조합니다.",
    },
    {
      id: "square-f2",
      name: "소프트 레이어드",
      description:
        "끝부분을 부드럽게 층 내어 자연스럽게 흘러내리도록 만든 레이어드 컷입니다.",
      reason:
        "부드러운 레이어가 각진 얼굴의 딱딱한 선을 중화시켜 자연스럽고 여성스러운 인상을 만들어줍니다.",
      gender: "female",
    },
    {
      id: "square-f3",
      name: "웨이브 미디엄",
      description:
        "어깨 길이에서 자연스러운 웨이브를 연출하는 중간 길이의 스타일입니다.",
      reason:
        "곡선적인 웨이브 텍스처가 각진 얼굴형의 강한 선을 부드럽게 감싸 여성스러운 인상을 만들어냅니다.",
      gender: "female",
    },
    {
      id: "square-m1",
      name: "자연스러운 웨이브",
      description:
        "고정된 느낌 없이 자연스럽게 흘러내리는 약한 웨이브 스타일입니다.",
      reason:
        "부드러운 웨이브 텍스처가 각진 얼굴의 강인함에 부드러움을 더해 세련된 균형을 만들어냅니다.",
      gender: "male",
      avoid: "딱딱하게 고정된 스타일은 각진 인상을 더 강조합니다.",
    },
    {
      id: "square-m2",
      name: "레이어드 사이드 파트",
      description:
        "옆으로 가르마를 나누고 층을 내어 자연스럽게 흘러내리도록 한 스타일입니다.",
      reason:
        "비대칭적인 흐름이 각진 얼굴의 선을 중화시키고 세련된 인상을 만들어냅니다.",
      gender: "male",
    },
    {
      id: "square-m3",
      name: "텍스처드 크롭",
      description:
        "짧지만 텍스처가 살아있는 크롭 스타일로 세련되고 모던한 인상을 줍니다.",
      reason:
        "위쪽에 자연스러운 텍스처를 더하여 각진 얼굴에 생동감과 부드러운 인상을 더해줍니다.",
      gender: "male",
    },
  ],

  oblong: [
    {
      id: "oblong-f1",
      name: "단발 밥",
      description:
        "턱선이나 그보다 약간 위에서 끊기는 단발로, 얼굴의 세로감을 줄여줍니다.",
      reason:
        "턱선 부근에서 끊기는 헤어가 얼굴의 긴 느낌을 시각적으로 줄여주고 균형 있는 인상을 만들어냅니다.",
      gender: "female",
      avoid: "긴 스트레이트 헤어는 얼굴이 더 길어 보입니다.",
    },
    {
      id: "oblong-f2",
      name: "볼드한 사이드 뱅",
      description:
        "이마를 확실하게 가리는 두꺼운 앞머리로 얼굴의 세로 비율을 줄여줍니다.",
      reason:
        "이마를 가리는 앞머리가 얼굴의 세로 길이를 시각적으로 단축시켜 균형 있는 인상을 만들어줍니다.",
      gender: "female",
    },
    {
      id: "oblong-f3",
      name: "레이어드 컷 + 볼륨 사이드",
      description:
        "양쪽 볼 부분에 볼륨을 더한 레이어드 스타일로 얼굴의 폭을 시각적으로 넓혀줍니다.",
      reason:
        "가로 방향의 볼륨이 긴 얼굴형의 세로감을 중화시켜 균형 있고 여성스러운 인상을 만들어줍니다.",
      gender: "female",
    },
    {
      id: "oblong-m1",
      name: "짧은 사이드 볼륨 스타일",
      description:
        "옆을 짧게 유지하되 위쪽의 볼륨을 양옆으로 퍼지도록 스타일링합니다.",
      reason:
        "가로 방향으로 퍼지는 볼륨이 긴 얼굴을 시각적으로 넓어 보이게 합니다.",
      gender: "male",
      avoid: "위로 세운 스타일은 얼굴이 더 길어 보입니다.",
    },
    {
      id: "oblong-m2",
      name: "텍스처 크롭 + 가로 볼륨",
      description:
        "상단의 볼륨을 양옆으로 퍼뜨려 가로감을 강조한 짧은 스타일입니다.",
      reason:
        "시선이 가로로 분산되어 얼굴의 긴 비율을 시각적으로 보완합니다.",
      gender: "male",
    },
    {
      id: "oblong-m3",
      name: "두꺼운 앞머리 스타일",
      description:
        "앞머리를 내려 이마를 가리고 얼굴의 세로 길이를 단축시키는 스타일입니다.",
      reason: "이마를 가리는 것만으로도 얼굴의 세로 비율이 짧아 보이는 효과가 있습니다.",
      gender: "male",
    },
  ],

  heart: [
    {
      id: "heart-f1",
      name: "시스루 뱅",
      description:
        "가볍고 투명하게 비치는 앞머리로 이마를 자연스럽게 덮어주는 스타일입니다.",
      reason:
        "넓은 이마를 자연스럽게 가리면서도 무거운 느낌 없이 가벼운 이마 비율을 만들어줍니다.",
      gender: "female",
      avoid: "볼드한 올백은 넓은 이마를 더욱 강조합니다.",
    },
    {
      id: "heart-f2",
      name: "허쉬 컷",
      description:
        "턱선 아래에서 레이어드가 풍성해지는 스타일로 좁은 턱을 보완해줍니다.",
      reason:
        "턱 부분에 볼륨을 더해 넓은 이마와 좁은 턱의 비율 차이를 자연스럽게 줄여줍니다.",
      gender: "female",
    },
    {
      id: "heart-f3",
      name: "턱선 레이어드",
      description:
        "턱선 부근에서 레이어드가 시작되어 아래로 퍼지는 볼륨 있는 스타일입니다.",
      reason:
        "턱 부분의 볼륨이 좁은 턱을 시각적으로 채워주어 얼굴형의 균형을 맞춰줍니다.",
      gender: "female",
    },
    {
      id: "heart-m1",
      name: "사이드 파트 내추럴",
      description:
        "자연스럽게 옆으로 흘러내리는 헤어로 이마의 비중을 줄여주는 스타일입니다.",
      reason:
        "사이드로 흘러내리는 헤어가 이마의 넓이를 시각적으로 좁혀주고 균형 있는 인상을 만들어줍니다.",
      gender: "male",
      avoid: "올백이나 업스타일은 넓은 이마를 강조합니다.",
    },
    {
      id: "heart-m2",
      name: "이마 살짝 가리는 앞머리",
      description:
        "이마를 살짝 덮어주는 앞머리로 자연스럽게 이마의 비율을 줄여줍니다.",
      reason:
        "이마를 부분적으로 가리는 것만으로도 이마-턱의 비율 차이가 줄어들어 균형 있는 인상이 됩니다.",
      gender: "male",
    },
    {
      id: "heart-m3",
      name: "소프트 웨이브 미디엄",
      description:
        "귀 아래까지 오는 길이에 부드러운 웨이브를 더한 스타일입니다.",
      reason:
        "턱 아래 볼륨이 좁은 턱선을 채워주고 전체적인 균형을 맞춰줍니다.",
      gender: "male",
    },
  ],

  diamond: [
    {
      id: "diamond-f1",
      name: "사이드 뱅 + 레이어드",
      description:
        "이마 한쪽을 덮는 뱅과 자연스러운 레이어드의 조합으로 좁은 이마를 보완합니다.",
      reason:
        "사이드 뱅이 좁은 이마를 풍성하게 채워주고 레이어드가 전체적인 균형을 잡아줍니다.",
      gender: "female",
    },
    {
      id: "diamond-f2",
      name: "와이드 업두",
      description:
        "이마 양쪽으로 볼륨을 내어 묶는 업두 스타일로 좁은 이마를 넓어 보이게 합니다.",
      reason:
        "이마 위쪽으로 가로 볼륨이 생겨 좁은 이마를 넓게 보이게 하고 균형 있는 인상을 만들어줍니다.",
      gender: "female",
      avoid: "이마를 완전히 드러내는 올백은 좁은 이마를 강조합니다.",
    },
    {
      id: "diamond-f3",
      name: "풀어내린 중단 밥",
      description:
        "턱선 근처 길이에서 자연스럽게 내린 밥으로 턱선을 부드럽게 감싸줍니다.",
      reason:
        "턱 부분을 감싸는 헤어가 좁은 턱선을 채워주고 전체적인 균형을 맞춰줍니다.",
      gender: "female",
    },
    {
      id: "diamond-m1",
      name: "사이드 볼륨 업 스타일",
      description:
        "옆쪽으로 볼륨을 더한 스타일로 좁은 이마의 비율을 보완합니다.",
      reason:
        "가로 방향의 볼륨이 이마를 시각적으로 넓혀주고 광대의 돌출감을 줄여줍니다.",
      gender: "male",
      avoid: "센터 파트나 슬릭백은 좁은 이마를 더 강조합니다.",
    },
    {
      id: "diamond-m2",
      name: "앞머리 내린 텍스처 스타일",
      description:
        "앞머리를 자연스럽게 내려 이마를 가리고 텍스처를 살린 스타일입니다.",
      reason:
        "앞머리로 이마를 부분적으로 가리면 좁은 이마의 단점이 줄어들고 균형 있는 인상이 됩니다.",
      gender: "male",
    },
    {
      id: "diamond-m3",
      name: "소프트 웨이브 크롭",
      description:
        "부드러운 웨이브 텍스처의 짧은 스타일로 이마 주변에 자연스러운 볼륨을 만들어줍니다.",
      reason:
        "이마 주변의 자연스러운 볼륨이 좁은 이마를 채워주고 광대와의 비율 차이를 줄여줍니다.",
      gender: "male",
    },
  ],
};

export const getHairstylesByShape = (
  shape: string,
  gender: "female" | "male" | "unspecified"
): HairstyleRecommendation[] => {
  const all = hairstyleData[shape] || [];
  if (gender === "unspecified") return all.slice(0, 4);
  return all.filter((h) => h.gender === gender || h.gender === "all");
};
