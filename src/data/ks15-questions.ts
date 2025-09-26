// KS-15 실제 질문 (k_15_wt.dbf 데이터 기반, 한국어로 정리)
export interface KS15Question {
  id: number;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    weights: {
      male: number[];
      female: number[];
    };
    is_default?: boolean;
  }[];
}

export const ks15Questions: KS15Question[] = [
  {
    id: 1,
    question: "당신의 성격은?",
    category: "personality",
    options: [
      { id: "a", text: "대범하고 진취적", weights: { male: [1.621, -5.496, 1.444], female: [4.496, -9.484, 0.0] }, is_default: true },
      { id: "b", text: "보통", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "섬세하고 신중함", weights: { male: [0, 3.507, 0], female: [-3.576, 7.991, 0] } },
    ],
  },
  {
    id: 2,
    question: "행동이나 일 처리는?",
    category: "behavior",
    options: [
      { id: "a", text: "빠르게 처리함", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "보통", weights: { male: [2.521, 0, -2.97], female: [2.521, 0, -2.97] }, is_default: true },
      { id: "c", text: "천천히 신중하게", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 3,
    question: "일할 때의 자세는?",
    category: "work_attitude",
    options: [
      { id: "a", text: "적극적", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "보통", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "소극적", weights: { male: [0, 3.04, -2.04], female: [0, 3.04, -2.04] }, is_default: true },
    ],
  },
  {
    id: 4,
    question: "성격 유형은?",
    category: "personality_type",
    options: [
      { id: "a", text: "외향적", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "보통 (외향/내향)", weights: { male: [0, 0, 0], female: [0, 0, 0] }, is_default: true },
      { id: "c", text: "내향적", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "d", text: "남성적 성향", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "e", text: "보통 (남성/여성)", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "f", text: "여성적 성향", weights: { male: [0, 2.282, 0], female: [0, 2.282, 0] }, is_default: true },
      { id: "g", text: "감정적", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "h", text: "보통 (감정/이성)", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "i", text: "이성적", weights: { male: [0, 0, -1.869], female: [0, 0, -1.869] }, is_default: true },
    ],
  },
  {
    id: 5,
    question: "소화는 어떻습니까?",
    category: "digestion",
    options: [
      { id: "a", text: "잘 됨", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "잘 안되지만 불편하지 않음", weights: { male: [-3.565, -2.413, 5.126], female: [-3.565, -2.413, 5.126] }, is_default: true },
      { id: "c", text: "잘 안되고 불편함", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 6,
    question: "평소 입맛은?",
    category: "appetite",
    options: [
      { id: "a", text: "좋음", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "보통", weights: { male: [2.782, -2.325, 1.595], female: [2.782, -2.325, 1.595] }, is_default: true },
      { id: "c", text: "좋지 않음", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 7,
    question: "땀은 어느 정도 납니까?",
    category: "sweat",
    options: [
      { id: "a", text: "많이 남", weights: { male: [-0.781, 1.708, -1.195], female: [-0.781, 1.708, -1.195] }, is_default: true },
      { id: "b", text: "보통", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "조금 남", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 8,
    question: "땀을 흘린 후 기분은?",
    category: "sweat_feeling",
    options: [
      { id: "a", text: "상쾌함", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "피곤함", weights: { male: [1.95, -1.667, 0.774], female: [1.95, -1.667, 0.774] }, is_default: true },
      { id: "c", text: "별 차이 없음", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 9,
    question: "변비로 고생하시나요?",
    category: "bowel",
    options: [
      { id: "a", text: "자주", weights: { male: [2.623, 1.389, -4.236], female: [2.623, 1.389, -4.236] }, is_default: true },
      { id: "b", text: "가끔", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "거의 없음", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 10,
    question: "밤에 소변 보러 일어나는 횟수는?",
    category: "urination",
    options: [
      { id: "a", text: "0번", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "1번", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "2번 이상", weights: { male: [1.831, 0.775, -2.879], female: [1.831, 0.775, -2.879] }, is_default: true },
    ],
  },
  {
    id: 11,
    question: "온도 적응력은?",
    category: "temperature_adaptation",
    options: [
      { id: "a", text: "추위를 못참음", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "더위를 못참음", weights: { male: [-2.468, 2.468, 1.423], female: [-2.468, 2.468, 1.423] }, is_default: true },
      { id: "c", text: "둘 다 잘 견딤", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
    ],
  },
  {
    id: 12,
    question: "평소 물은 어떻게 드십니까?",
    category: "water_preference",
    options: [
      { id: "a", text: "뜨거운 물", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "b", text: "차가운 물", weights: { male: [0, 0, 0], female: [0, 0, 0] } },
      { id: "c", text: "상관없음", weights: { male: [1.155, -0.543, -0.832], female: [1.155, -0.543, -0.832] }, is_default: true },
    ],
  },
];

export default ks15Questions;