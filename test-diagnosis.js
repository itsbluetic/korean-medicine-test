// 간단한 진단 알고리즘 테스트 스크립트
const fs = require('fs');
const path = require('path');

// 테스트용 가중치 계산 함수
function calculateConstitutionScores(answers, questions) {
  const scores = {
    taeyang: 0,
    taeeum: 0,
    soyang: 0,
    soeum: 0,
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const selectedOption = question.options.find(
      (option) => option.id === answer.selectedOptionId
    );
    if (!selectedOption) return;

    scores.taeyang += selectedOption.weights.taeyang;
    scores.taeeum += selectedOption.weights.taeeum;
    scores.soyang += selectedOption.weights.soyang;
    scores.soeum += selectedOption.weights.soeum;
  });

  return scores;
}

function determineConstitution(scores) {
  const constitutions = ["taeyang", "taeeum", "soyang", "soeum"];
  return constitutions.reduce((prev, current) =>
    scores[current] > scores[prev] ? current : prev
  );
}

function calculateConfidence(scores) {
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const maxScore = Math.max(...Object.values(scores));

  if (totalScore === 0) return 0;
  const confidence = (maxScore / totalScore) * 100;
  return Math.round(confidence);
}

// 테스트 케이스 1: 태양인 성향
const testAnswers1 = [
  { questionId: 1, selectedOptionId: "1b" }, // 상체 발달
  { questionId: 2, selectedOptionId: "2a" }, // 목덜미 굵고 어깨 발달
  { questionId: 3, selectedOptionId: "3a" }, // 진취적, 리더십
  { questionId: 4, selectedOptionId: "4a" }, // 적극적 대응
  { questionId: 5, selectedOptionId: "5c" }, // 급하게 먹음
  { questionId: 6, selectedOptionId: "6a" }, // 시원하고 담백한 음식
  { questionId: 7, selectedOptionId: "7a" }, // 깊은 잠
  { questionId: 8, selectedOptionId: "8a" }, // 솔직한 감정 표현
  { questionId: 9, selectedOptionId: "9a" }, // 열이 많고 더위 탐
  { questionId: 10, selectedOptionId: "10a" }, // 빠르고 당당한 걸음
];

// 테스트 케이스 2: 소음인 성향
const testAnswers2 = [
  { questionId: 1, selectedOptionId: "1d" }, // 왜소하고 하체 발달
  { questionId: 2, selectedOptionId: "2d" }, // 목과 어깨 가늘고 작음
  { questionId: 3, selectedOptionId: "3d" }, // 섬세하고 내성적
  { questionId: 4, selectedOptionId: "4d" }, // 걱정하며 신중하게
  { questionId: 5, selectedOptionId: "5d" }, // 소화 약하고 적게 먹음
  { questionId: 6, selectedOptionId: "6d" }, // 따뜻하고 자극적이지 않은 음식
  { questionId: 7, selectedOptionId: "7d" }, // 잠들기 어렵고 숙면 힘듦
  { questionId: 8, selectedOptionId: "8d" }, // 감정을 내면에 숨김
  { questionId: 9, selectedOptionId: "9d" }, // 몸이 차갑고 추위 탐
  { questionId: 10, selectedOptionId: "10d" }, // 조심스럽고 차분한 걸음
];

// 질문 데이터 (간단화)
const questions = [
  {
    id: 1,
    options: [
      { id: "1a", weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 0 } },
      { id: "1b", weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 } },
      { id: "1c", weights: { taeyang: 0, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "1d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 2,
    options: [
      { id: "2a", weights: { taeyang: 4, taeeum: 1, soyang: 1, soeum: 0 } },
      { id: "2b", weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 0 } },
      { id: "2c", weights: { taeyang: 0, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "2d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 3,
    options: [
      { id: "3a", weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 } },
      { id: "3b", weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 2 } },
      { id: "3c", weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "3d", weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 } },
    ],
  },
  // 나머지 질문들도 동일한 패턴...
  {
    id: 4,
    options: [
      { id: "4a", weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 } },
      { id: "4b", weights: { taeyang: 0, taeeum: 4, soyang: 1, soeum: 2 } },
      { id: "4c", weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "4d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 5,
    options: [
      { id: "5a", weights: { taeyang: 2, taeeum: 1, soyang: 4, soeum: 0 } },
      { id: "5b", weights: { taeyang: 0, taeeum: 4, soyang: 1, soeum: 0 } },
      { id: "5c", weights: { taeyang: 3, taeeum: 0, soyang: 3, soeum: 0 } },
      { id: "5d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 6,
    options: [
      { id: "6a", weights: { taeyang: 4, taeeum: 2, soyang: 1, soeum: 0 } },
      { id: "6b", weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 2 } },
      { id: "6c", weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "6d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 7,
    options: [
      { id: "7a", weights: { taeyang: 4, taeeum: 2, soyang: 0, soeum: 0 } },
      { id: "7b", weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 1 } },
      { id: "7c", weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 1 } },
      { id: "7d", weights: { taeyang: 0, taeeum: 0, soyang: 1, soeum: 4 } },
    ],
  },
  {
    id: 8,
    options: [
      { id: "8a", weights: { taeyang: 4, taeeum: 1, soyang: 2, soeum: 0 } },
      { id: "8b", weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 2 } },
      { id: "8c", weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "8d", weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 9,
    options: [
      { id: "9a", weights: { taeyang: 4, taeeum: 1, soyang: 3, soeum: 0 } },
      { id: "9b", weights: { taeyang: 1, taeeum: 4, soyang: 1, soeum: 0 } },
      { id: "9c", weights: { taeyang: 2, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "9d", weights: { taeyang: 0, taeeum: 0, soyang: 0, soeum: 4 } },
    ],
  },
  {
    id: 10,
    options: [
      { id: "10a", weights: { taeyang: 4, taeeum: 0, soyang: 2, soeum: 0 } },
      { id: "10b", weights: { taeyang: 0, taeeum: 4, soyang: 0, soeum: 1 } },
      { id: "10c", weights: { taeyang: 1, taeeum: 0, soyang: 4, soeum: 0 } },
      { id: "10d", weights: { taeyang: 0, taeeum: 1, soyang: 0, soeum: 4 } },
    ],
  },
];

// 테스트 실행
console.log("=== 한의학적 체질 진단 알고리즘 테스트 ===\n");

console.log("테스트 케이스 1: 태양인 성향 답변");
const scores1 = calculateConstitutionScores(testAnswers1, questions);
const result1 = determineConstitution(scores1);
const confidence1 = calculateConfidence(scores1);

console.log("점수:", scores1);
console.log("진단 결과:", result1);
console.log("신뢰도:", confidence1 + "%");
console.log();

console.log("테스트 케이스 2: 소음인 성향 답변");
const scores2 = calculateConstitutionScores(testAnswers2, questions);
const result2 = determineConstitution(scores2);
const confidence2 = calculateConfidence(scores2);

console.log("점수:", scores2);
console.log("진단 결과:", result2);
console.log("신뢰도:", confidence2 + "%");
console.log();

console.log("=== 테스트 완료 ===");