// KS-15 표준 질문 (실제 DBF 데이터에서 추출)
export interface KS15Question {
  id: number;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
  }[];
}

export const ks15Questions: KS15Question[] = [
  {
    id: 1,
    question: "질문 1",
    category: "other",
    options: [
      { id: "n", text: "판정/재해석 버튼으로 판정해야함" },
    ],
  },
  {
    id: 3,
    question: "질문 3",
    category: "other",
    options: [
      { id: "n", text: "50 (0~99)" },
    ],
  },
  {
    id: 4,
    question: "질문 4",
    category: "other",
    options: [
      { id: "c", text: "남,여" },
    ],
  },
  {
    id: 5,
    question: "질문 5",
    category: "other",
    options: [
      { id: "d", text: "ks15q %1 %성별 *변수5" },
    ],
  },
  {
    id: 6,
    question: "질문 6",
    category: "other",
    options: [
      { id: "c", text: "유방,위식도,폐,간,갑상,대장,담췌장,신장,자궁,난소,방광,전립,혈액,기타" },
    ],
  },
  {
    id: 7,
    question: "질문 7",
    category: "other",
    options: [
      { id: "c", text: "A,B,C,D" },
    ],
  },
  {
    id: 8,
    question: "질문 8",
    category: "other",
    options: [
      { id: "c", text: "얘1,예2,예3,예4,예5" },
    ],
  },
  {
    id: 9,
    question: "질문 9",
    category: "other",
    options: [
      { id: "c", text: "예,아니오,모름" },
    ],
  },
  {
    id: 10,
    question: "질문 10",
    category: "other",
    options: [
      { id: "c", text: "소양,태음,소음,태양" },
    ],
  },
  {
    id: 11,
    question: "질문 11",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 12,
    question: "질문 12",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 13,
    question: "질문 13",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 14,
    question: "질문 14",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 15,
    question: "질문 15",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 16,
    question: "질문 16",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 17,
    question: "질문 17",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 18,
    question: "질문 18",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 19,
    question: "질문 19",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 20,
    question: "질문 20",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 21,
    question: "질문 21",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 22,
    question: "질문 22",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 23,
    question: "질문 23",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 24,
    question: "질문 24",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 25,
    question: "질문 25",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 26,
    question: "질문 26",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 27,
    question: "질문 27",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 28,
    question: "질문 28",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 29,
    question: "질문 29",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 30,
    question: "질문 30",
    category: "other",
    options: [
      { id: "n", text: "1~6 성격,7~14 증상중간/보통,15.BMI" },
    ],
  },
  {
    id: 31,
    question: "질문 31",
    category: "other",
    options: [
      { id: "n", text: "40 (0~80)" },
    ],
  },
  {
    id: 32,
    question: "질문 32",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 33,
    question: "질문 33",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 34,
    question: "질문 34",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 35,
    question: "질문 35",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 36,
    question: "질문 36",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 37,
    question: "질문 37",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 38,
    question: "질문 38",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 39,
    question: "질문 39",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 40,
    question: "질문 40",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 41,
    question: "질문 41",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
  {
    id: 42,
    question: "질문 42",
    category: "other",
    options: [
      { id: "n", text: "50 (0~100)" },
    ],
  },
];

export default ks15Questions;
