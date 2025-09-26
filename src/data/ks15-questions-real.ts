// KS-15 실제 질문 (k_15_wt.dbf에서 추출)
export interface KS15Question {
  id: number;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    weights?: {
      male: number[];
      female: number[];
    };
    is_default?: boolean;
  }[];
}

export const ks15Questions: KS15Question[] = [
  {
    id: 1,
    question: "당신의 성격은 어떻습니까?",
    category: "personality",
    options: [
      { id: "a", text: "Broad-m", weights: { male: [1.621, -5.496, 1.444], female: [4.496, -9.484, 0.0] }, is_default: true },
      { id: "b", text: "Moderat", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] } },
      { id: "c", text: "Narrow-", weights: { male: [0.0, 3.507, 0.0], female: [-3.576, 7.991, 0.0] } },
    ],
  },
  {
    id: 2,
    question: "행동이나 일 처리는 어떤 편입니까?",
    category: "behavior",
    options: [
      { id: "a", text: "Quickly", weights: { male: [-6.467, 0.0, 7.432], female: [0.0, -2.687, 3.946] } },
      { id: "b", text: "Moderat", weights: { male: [2.521, 0.0, -2.97], female: [0.0, 0.0, -1.844] }, is_default: true },
      { id: "c", text: "Slowly", weights: { male: [2.829, 0.0, -3.087], female: [0.0, 1.342, -1.495] } },
    ],
  },
  {
    id: 3,
    question: "4 일",
    category: "other",
    options: [
      { id: "a", text: "Active", weights: { male: [0.0, -5.655, 3.969], female: [0.0, -7.163, 2.089] } },
      { id: "b", text: "Modera", weights: { male: [0.0, 1.991, -1.521], female: [0.0, 2.829, 0.0] } },
      { id: "c", text: "Passiv", weights: { male: [0.0, 3.04, -2.04], female: [0.0, 2.711, -1.746] }, is_default: true },
    ],
  },
  {
    id: 4,
    question: "당신의 성격은 어떻습니까?",
    category: "personality",
    options: [
      { id: "a", text: "Extrov", weights: { male: [0.0, -3.274, 3.923], female: [0.0, -7.185, 4.404] } },
      { id: "b", text: "Modera", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] }, is_default: true },
      { id: "c", text: "Introv", weights: { male: [0.0, 2.829, -3.087], female: [0.0, 5.881, -5.836] } },
      { id: "d", text: "Mascul", weights: { male: [2.113, -6.669, 1.419], female: [4.793, -7.32, 0.0] } },
      { id: "e", text: "Modera", weights: { male: [0.0, 3.157, 0.0], female: [0.0, -1.918, 1.419] } },
      { id: "f", text: "Femini", weights: { male: [0.0, 2.282, 0.0], female: [-3.437, 12.0, -2.426] }, is_default: true },
      { id: "g", text: "Irrati", weights: { male: [0.0, -1.77, 1.444], female: [0.0, -5.61, 2.758] } },
      { id: "h", text: "Modera", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 3.04, 0.0] } },
      { id: "i", text: "Ration", weights: { male: [0.0, 0.0, -1.869], female: [0.0, 1.495, -1.795] }, is_default: true },
    ],
  },
  {
    id: 5,
    question: "소화는 어떤 편입니까?",
    category: "digestion",
    options: [
      { id: "a", text: "Yes", weights: { male: [1.721, -4.952, 1.596], female: [2.497, -5.474, 0.0] } },
      { id: "b", text: "No s di", weights: { male: [-3.565, 8.435, -1.596], female: [-2.497, 7.539, 0.0] }, is_default: true },
      { id: "c", text: "No c di", weights: { male: [-1.721, 6.943, -1.596], female: [-3.839, 9.004, 0.0] } },
    ],
  },
  {
    id: 6,
    question: "평소 입맛은 어떻습니까?",
    category: "appetite",
    options: [
      { id: "a", text: "Good", weights: { male: [6.535, -8.747, 0.0], female: [5.056, -8.423, 0.0] } },
      { id: "b", text: "Averag", weights: { male: [-4.975, 6.309, 0.0], female: [-4.838, 4.747, 0.0] }, is_default: true },
      { id: "c", text: "Not go", weights: { male: [-1.342, 1.342, 0.0], female: [0.0, 1.991, -1.342] } },
    ],
  },
  {
    id: 7,
    question: "땀은 어느 정도 납니까?",
    category: "sweat",
    options: [
      { id: "a", text: "A lot", weights: { male: [4.861, -4.587, 0.0], female: [8.259, -5.474, 0.0] }, is_default: true },
      { id: "b", text: "Modera", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] } },
      { id: "c", text: "A litt", weights: { male: [-2.695, 4.493, 0.0], female: [-3.772, 5.043, 0.0] } },
    ],
  },
  {
    id: 8,
    question: "땀은 어느 정도 납니까?",
    category: "sweat",
    options: [
      { id: "a", text: "Refres", weights: { male: [2.186, -3.669, 0.0], female: [6.714, -7.723, 0.0] } },
      { id: "b", text: "Tired", weights: { male: [-4.997, 6.039, 0.0], female: [-2.592, 5.971, 0.0] }, is_default: true },
      { id: "c", text: "No dif", weights: { male: [0.0, 0.0, 0.0], female: [-1.596, 0.0, 0.0] } },
    ],
  },
  {
    id: 9,
    question: "일이 힘들 때 어떻게 반응합니까?",
    category: "stress_response",
    options: [
      { id: "a", text: "Often", weights: { male: [0.0, 0.0, 0.0], female: [0.0, -1.47, 0.0] }, is_default: true },
      { id: "b", text: "Somtim", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 2.354] } },
      { id: "c", text: "Never", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 2.426, -1.546] } },
    ],
  },
  {
    id: 10,
    question: "소변 상태는 어떻습니까?",
    category: "urination",
    options: [
      { id: "a", text: "0", weights: { male: [0.0, 1.894, 0.0], female: [0.0, 0.0, 0.0] } },
      { id: "b", text: "1", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] } },
      { id: "c", text: "≥ 2", weights: { male: [0.0, -2.48, 0.0], female: [0.0, 0.0, 0.0] }, is_default: true },
    ],
  },
  {
    id: 11,
    question: "새로운 환경에 적응하는 것은?",
    category: "adaptation",
    options: [
      { id: "a", text: "Cold", weights: { male: [-6.129, 6.422, 0.0], female: [-1.546, 2.64, 0.0] } },
      { id: "b", text: "Heat", weights: { male: [9.239, -7.655, 0.0], female: [3.599, -4.77, 0.0] }, is_default: true },
      { id: "c", text: "Both n", weights: { male: [0.0, 0.0, 0.0], female: [0.0, 0.0, 0.0] } },
    ],
  },
  {
    id: 12,
    question: "평소 물은 어떻게 드십니까?",
    category: "water_intake",
    options: [
      { id: "a", text: "Hot wa", weights: { male: [-1.967, 3.134, 0.0], female: [-3.064, 4.929, 0.0] } },
      { id: "b", text: "Cold w", weights: { male: [0.0, -1.368, 0.0], female: [0.0, -1.869, 0.0] } },
      { id: "c", text: "Not sp", weights: { male: [0.0, 0.0, 0.0], female: [0.0, -1.316, 0.0] }, is_default: true },
    ],
  },
];

export default ks15Questions;
