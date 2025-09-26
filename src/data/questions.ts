import { LegacyQuestion } from "@/types";

export const questions: LegacyQuestion[] = [
  // 체형 관련 질문
  {
    id: 1,
    category: "physique",
    text: "전체적인 체격과 골격은 어떠신가요?",
    options: [
      {
        id: "1a",
        text: "체격이 크고 골격이 굵으며 하체가 발달했다",
        weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 0 },
      },
      {
        id: "1b",
        text: "상체가 발달하고 어깨가 넓으며 당당하다",
        weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 },
      },
      {
        id: "1c",
        text: "상체가 발달했지만 하체가 약하고 가늘다",
        weights: { taeyang: 0, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "1d",
        text: "전체적으로 왜소하고 하체가 상대적으로 발달했다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },
  {
    id: 2,
    category: "physique",
    text: "목과 어깨 부분의 특징은?",
    options: [
      {
        id: "2a",
        text: "목덜미가 굵고 어깨가 잘 발달되어 있다",
        weights: { taeyang: 4, taeeum: 1, soyang: 1, soeum: 0 },
      },
      {
        id: "2b",
        text: "목이 굵고 어깨가 넓으며 전체적으로 크다",
        weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 0 },
      },
      {
        id: "2c",
        text: "어깨는 넓지만 목이 상대적으로 가늘다",
        weights: { taeyang: 0, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "2d",
        text: "목과 어깨 모두 가늘고 작다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },

  // 성격 관련 질문
  {
    id: 3,
    category: "personality",
    text: "평소 성격과 행동 패턴은?",
    options: [
      {
        id: "3a",
        text: "진취적이고 창의적이며 리더십이 강하다",
        weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 },
      },
      {
        id: "3b",
        text: "신중하고 끈기 있으며 계획적이다",
        weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 2 },
      },
      {
        id: "3c",
        text: "활발하고 사교적이며 적극적이다",
        weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "3d",
        text: "섬세하고 조심스러우며 내성적이다",
        weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 },
      },
    ],
  },
  {
    id: 4,
    category: "personality",
    text: "스트레스 상황에서의 반응은?",
    options: [
      {
        id: "4a",
        text: "즉시 해결책을 찾아 적극적으로 대응한다",
        weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 },
      },
      {
        id: "4b",
        text: "신중하게 생각한 후 체계적으로 대응한다",
        weights: { taeyang: 0, taeeum: 4, soyang: 1, soeum: 2 },
      },
      {
        id: "4c",
        text: "빠르게 반응하지만 때로는 성급하다",
        weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "4d",
        text: "걱정하며 신중하게 대응하거나 피하려 한다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },

  // 소화 관련 질문
  {
    id: 5,
    category: "digestion",
    text: "평소 소화 상태와 식욕은?",
    options: [
      {
        id: "5a",
        text: "소화가 빠르고 식욕이 왕성하다",
        weights: { taeyang: 2, taeeum: 1, soyang: 4, soeum: 0 },
      },
      {
        id: "5b",
        text: "소화가 느리지만 많이 먹는다",
        weights: { taeyang: 0, taeeum: 4, soyang: 1, soeum: 0 },
      },
      {
        id: "5c",
        text: "소화는 괜찮지만 급하게 먹는다",
        weights: { taeyang: 3, taeeum: 0, soyang: 3, soeum: 0 },
      },
      {
        id: "5d",
        text: "소화가 약하고 적게 먹는다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },
  {
    id: 6,
    category: "digestion",
    text: "선호하는 음식의 성질은?",
    options: [
      {
        id: "6a",
        text: "시원하고 담백한 음식을 좋아한다",
        weights: { taeyang: 4, taeeum: 2, soyang: 1, soeum: 0 },
      },
      {
        id: "6b",
        text: "기름진 음식보다 담백한 음식을 선호한다",
        weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 2 },
      },
      {
        id: "6c",
        text: "시원한 음료와 과일을 즐긴다",
        weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "6d",
        text: "따뜻하고 자극적이지 않은 음식을 선호한다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },

  // 수면 관련 질문
  {
    id: 7,
    category: "sleep",
    text: "수면 패턴과 특징은?",
    options: [
      {
        id: "7a",
        text: "잠이 깊고 충분히 자야 컨디션이 좋다",
        weights: { taeyang: 4, taeeum: 2, soyang: 0, soeum: 0 },
      },
      {
        id: "7b",
        text: "잠은 많이 자지만 일어나기 어렵다",
        weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 1 },
      },
      {
        id: "7c",
        text: "잠들기 쉽지만 얕게 자는 편이다",
        weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 1 },
      },
      {
        id: "7d",
        text: "잠들기 어렵고 숙면을 취하기 힘들다",
        weights: { taeyang: 0, taeeum: 0, soyang: 1, soeum: 4 },
      },
    ],
  },

  // 감정 관련 질문
  {
    id: 8,
    category: "emotion",
    text: "감정 표현과 조절은?",
    options: [
      {
        id: "8a",
        text: "감정을 솔직하게 표현하며 시원시원하다",
        weights: { taeyang: 4, taeeum: 1, soyang: 2, soeum: 0 },
      },
      {
        id: "8b",
        text: "감정을 잘 드러내지 않고 참을성이 있다",
        weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 2 },
      },
      {
        id: "8c",
        text: "감정 기복이 있고 표현이 다양하다",
        weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "8d",
        text: "감정을 내면에 숨기고 조심스럽다",
        weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 },
      },
    ],
  },

  // 체온 관련 질문
  {
    id: 9,
    category: "temperature",
    text: "평소 체온과 더위/추위에 대한 반응은?",
    options: [
      {
        id: "9a",
        text: "열이 많고 더위를 많이 탄다",
        weights: { taeyang: 4, taeeum: 1, soyang: 3, soeum: 0 },
      },
      {
        id: "9b",
        text: "보통 체온이지만 땀을 많이 흘린다",
        weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 0 },
      },
      {
        id: "9c",
        text: "상열감이 있고 얼굴이 자주 달아오른다",
        weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "9d",
        text: "몸이 차갑고 추위를 많이 탄다",
        weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 },
      },
    ],
  },

  // 행동 관련 질문
  {
    id: 10,
    category: "behavior",
    text: "일상생활에서의 행동 패턴은?",
    options: [
      {
        id: "10a",
        text: "걸음이 빠르고 행동이 당당하다",
        weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 },
      },
      {
        id: "10b",
        text: "걸음이 느리고 안정적이며 묵직하다",
        weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 1 },
      },
      {
        id: "10c",
        text: "걸음이 빠르고 경쾌하며 활동적이다",
        weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 },
      },
      {
        id: "10d",
        text: "걸음이 조심스럽고 차분하다",
        weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 },
      },
    ],
  },
];

export const getQuestionsByCategory = (category: string) => {
  return questions.filter((q) => q.category === category);
};

export const getTotalQuestions = () => questions.length;
