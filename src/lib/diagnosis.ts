import {
  LegacyConstitutionType,
  LegacyConstitutionWeights,
  LegacyTestResult,
  UserAnswer,
} from "@/types";
import { questions } from "@/data/questions";
import { getLegacyConstitutionInfo } from "@/data/constitutions";

export function calculateConstitutionScores(
  answers: UserAnswer[]
): LegacyConstitutionWeights {
  const scores: LegacyConstitutionWeights = {
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

    // 각 체질별 점수 누적
    scores.taeyang += selectedOption.weights.taeyang;
    scores.taeeum += selectedOption.weights.taeeum;
    scores.soyang += selectedOption.weights.soyang;
    scores.soeum += selectedOption.weights.soeum;
  });

  return scores;
}

export function determineConstitution(
  scores: LegacyConstitutionWeights
): LegacyConstitutionType {
  const constitutions: LegacyConstitutionType[] = [
    "taeyang",
    "taeeum",
    "soyang",
    "soeum",
  ];

  return constitutions.reduce((prev, current) =>
    scores[current] > scores[prev] ? current : prev
  );
}

export function calculateConfidence(scores: LegacyConstitutionWeights): number {
  const totalScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );
  const maxScore = Math.max(...Object.values(scores));

  if (totalScore === 0) return 0;

  // 최고 점수의 비율을 백분율로 계산
  const confidence = (maxScore / totalScore) * 100;
  return Math.round(confidence);
}

export function generateTestResult(answers: UserAnswer[]): LegacyTestResult {
  const scores = calculateConstitutionScores(answers);
  const constitution = determineConstitution(scores);
  const confidence = calculateConfidence(scores);
  const constitutionInfo = getLegacyConstitutionInfo(constitution);

  return {
    constitution,
    scores,
    confidence,
    characteristics: constitutionInfo.characteristics,
    recommendations: [
      ...constitutionInfo.healthAdvice.slice(0, 3),
      ...constitutionInfo.dietRecommendations.slice(0, 2),
    ],
  };
}

// 테스트 결과의 신뢰도에 따른 메시지
export function getConfidenceMessage(confidence: number): string {
  if (confidence >= 80) {
    return "매우 높은 신뢰도의 결과입니다.";
  } else if (confidence >= 70) {
    return "높은 신뢰도의 결과입니다.";
  } else if (confidence >= 60) {
    return "보통 신뢰도의 결과입니다.";
  } else if (confidence >= 50) {
    return "낮은 신뢰도의 결과입니다. 재검사를 권장합니다.";
  } else {
    return "매우 낮은 신뢰도의 결과입니다. 재검사가 필요합니다.";
  }
}

// 점수 분포를 백분율로 변환
export function getScoreDistribution(
  scores: LegacyConstitutionWeights
): LegacyConstitutionWeights {
  const totalScore = Object.values(scores).reduce(
    (sum, score) => sum + score,
    0
  );

  if (totalScore === 0) {
    return { taeyang: 25, taeeum: 25, soyang: 25, soeum: 25 };
  }

  return {
    taeyang: Math.round((scores.taeyang / totalScore) * 100),
    taeeum: Math.round((scores.taeeum / totalScore) * 100),
    soyang: Math.round((scores.soyang / totalScore) * 100),
    soeum: Math.round((scores.soeum / totalScore) * 100),
  };
}
