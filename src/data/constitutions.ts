import { ConstitutionInfo, ConstitutionType, LegacyConstitutionType } from "@/types";

export const constitutions: Record<ConstitutionType, ConstitutionInfo> = {
  taeyangin: {
    name: "Taeyangin",
    koreanName: "태양인",
    description:
      "간대폐소형으로 간 기능이 발달하고 폐 기능이 약한 체질입니다. 진취적이고 창의적이며 리더십이 강합니다.",
    characteristics: [
      "머리가 크고 이마가 넓음",
      "목덜미가 굵고 튼튼함",
      "어깨가 발달하고 가슴이 넓음",
      "하체보다 상체가 발달",
      "체격이 크고 당당함",
    ],
    strengths: [
      "창의력과 독창성이 뛰어남",
      "리더십과 추진력이 강함",
      "정의감이 강하고 의협심이 있음",
      "새로운 것을 추구하는 개척정신",
    ],
    weaknesses: [
      "독선적이고 고집이 셀 수 있음",
      "성급하고 참을성이 부족",
      "폐 기능이 약해 호흡기 질환 주의",
      "과로하기 쉬움",
    ],
    healthAdvice: [
      "충분한 휴식과 수면이 중요",
      "스트레스 관리에 신경 쓰기",
      "규칙적인 생활 패턴 유지",
      "과로 피하고 적당한 운동",
    ],
    dietRecommendations: [
      "서늘한 성질의 음식 (메밀, 냉면, 해산물)",
      "채소와 과일을 충분히 섭취",
      "매운 음식과 기름진 음식 피하기",
      "알코올과 카페인 제한",
    ],
    exerciseRecommendations: [
      "수영, 요가 같은 유연성 운동",
      "산책, 가벼운 조깅",
      "호흡 운동과 명상",
      "과격한 운동은 피하기",
    ],
  },
  taeumin: {
    name: "Taeumin",
    koreanName: "태음인",
    description:
      "폐대간소형으로 폐 기능이 발달하고 간 기능이 약한 체질입니다. 침착하고 신중하며 끈기가 강합니다.",
    characteristics: [
      "체격이 크고 골격이 굵음",
      "허리가 굵고 하체가 발달",
      "피부가 거칠고 털이 많음",
      "목소리가 굵고 우렁참",
      "전체적으로 큰 체구",
    ],
    strengths: [
      "끈기와 인내력이 강함",
      "신중하고 계획적",
      "책임감이 강하고 신뢰할 수 있음",
      "포용력이 크고 인정이 많음",
    ],
    weaknesses: [
      "변화에 대한 적응력이 느림",
      "소극적이고 결단력 부족",
      "간 기능 약화로 소화 장애 가능",
      "비만해지기 쉬움",
    ],
    healthAdvice: [
      "규칙적인 운동으로 체중 관리",
      "금연, 금주 필수",
      "간 건강 관리에 특히 주의",
      "충분한 수면과 규칙적인 생활",
    ],
    dietRecommendations: [
      "담백하고 기름기 없는 음식",
      "현미, 잡곡류 위주 식단",
      "채소와 해조류 충분히 섭취",
      "기름진 음식과 술 피하기",
    ],
    exerciseRecommendations: [
      "유산소 운동 (걷기, 등산, 자전거)",
      "근력 운동으로 신진대사 촉진",
      "수영, 아쿠아로빅",
      "꾸준하고 지속적인 운동",
    ],
  },
  soyangin: {
    name: "Soyangin",
    koreanName: "소양인",
    description:
      "비대신소형으로 비장 기능이 발달하고 신장 기능이 약한 체질입니다. 활발하고 사교적이며 외향적입니다.",
    characteristics: [
      "상체가 발달하고 하체가 약함",
      "어깨가 넓고 가슴이 두터움",
      "엉덩이가 작고 다리가 가늘음",
      "걸음걸이가 빠르고 경쾌함",
      "표정이 밝고 활기참",
    ],
    strengths: [
      "사교적이고 적극적",
      "순발력과 민첩성이 뛰어남",
      "창의적이고 아이디어가 풍부",
      "열정적이고 에너지가 넘침",
    ],
    weaknesses: [
      "성급하고 끈기 부족",
      "감정 기복이 심함",
      "신장 기능 약화로 하체 무력감",
      "열이 많아 상열감 경험",
    ],
    healthAdvice: [
      "하체 근력 강화 운동 중요",
      "충분한 수분 섭취",
      "신장 건강 관리에 주의",
      "과도한 스트레스 피하기",
    ],
    dietRecommendations: [
      "시원한 성질의 음식 (돼지고기, 해산물)",
      "충분한 수분과 과일 섭취",
      "맵고 자극적인 음식 피하기",
      "규칙적인 식사 시간 지키기",
    ],
    exerciseRecommendations: [
      "하체 중심 운동 (스쿼트, 런지)",
      "수영으로 전신 균형 운동",
      "요가, 필라테스로 유연성 향상",
      "과격한 운동보다 꾸준한 운동",
    ],
  },
  soeumin: {
    name: "Soeumin",
    koreanName: "소음인",
    description:
      "신대비소형으로 신장 기능이 발달하고 비장 기능이 약한 체질입니다. 섬세하고 신중하며 내성적입니다.",
    characteristics: [
      "체격이 작고 왜소함",
      "상체보다 하체가 발달",
      "피부가 부드럽고 섬세함",
      "목소리가 가늘고 조용함",
      "전체적으로 단아하고 정적임",
    ],
    strengths: [
      "섬세하고 꼼꼼함",
      "집중력과 지구력이 좋음",
      "신중하고 분석적 사고",
      "예술적 감각과 창의력",
    ],
    weaknesses: [
      "소극적이고 내성적",
      "추위를 많이 타고 체력 부족",
      "소화 기능이 약함",
      "우울하거나 신경질적 경향",
    ],
    healthAdvice: [
      "따뜻하게 보온 유지",
      "소화에 좋은 음식 섭취",
      "충분한 휴식과 영양 공급",
      "스트레스 관리와 긍정적 사고",
    ],
    dietRecommendations: [
      "따뜻하고 소화 잘 되는 음식",
      "생강, 계피 등 몸을 따뜻하게 하는 식품",
      "찹쌀, 닭고기, 양고기 등",
      "차가운 음식과 생식 피하기",
    ],
    exerciseRecommendations: [
      "가벼운 유산소 운동 (산책, 스트레칭)",
      "실내 운동 (요가, 필라테스)",
      "근력 운동으로 체력 보강",
      "무리하지 않는 선에서 꾸준히",
    ],
  },
};

export const getConstitutionInfo = (
  type: ConstitutionType
): ConstitutionInfo => {
  return constitutions[type];
};

// 레거시 타입을 새 타입으로 매핑하는 함수
export const getLegacyConstitutionInfo = (
  type: LegacyConstitutionType
): ConstitutionInfo => {
  const typeMapping: Record<LegacyConstitutionType, ConstitutionType> = {
    taeyang: "taeyangin",
    taeeum: "taeumin",
    soyang: "soyangin",
    soeum: "soeumin",
  };

  return constitutions[typeMapping[type]];
};

// 레거시 호환성을 위한 별칭
export const constitutionInfo = constitutions;
