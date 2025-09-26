import { ConstitutionType, DiagnosisResult } from '../types';
import { ks15Questions, calculateBMIScore, applyGenderWeights } from '../data/ks15-questions';
import { constitutions } from '../data/constitutions';

export interface KS15TestData {
  answers: { [questionId: number]: string };
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female';
  age: number;
}

export function diagnoseKS15Constitution(testData: KS15TestData): DiagnosisResult {
  let scores: { [key in ConstitutionType]: number } = {
    taeyangin: 0,
    taeumin: 0,
    soyangin: 0,
    soeumin: 0
  };

  // 1. 14개 질문 답변 기반 점수 계산
  ks15Questions.forEach(question => {
    const answerId = testData.answers[question.id];
    if (answerId) {
      const selectedOption = question.options.find(option => option.id === answerId);
      if (selectedOption) {
        scores.taeyangin += selectedOption.weights.taeyangin;
        scores.taeumin += selectedOption.weights.taeumin;
        scores.soyangin += selectedOption.weights.soyangin;
        scores.soeumin += selectedOption.weights.soeumin;
      }
    }
  });

  // 2. BMI 기반 체형 점수 추가
  const bmi = testData.weight / Math.pow(testData.height / 100, 2);
  const bmiScores = calculateBMIScore(bmi);
  scores.taeyangin += bmiScores.taeyangin;
  scores.taeumin += bmiScores.taeumin;
  scores.soyangin += bmiScores.soyangin;
  scores.soeumin += bmiScores.soeumin;

  // 3. 성별별 가중치 적용
  scores = applyGenderWeights(scores, testData.gender);

  // 4. 나이별 조정 (선택적)
  if (testData.age > 50) {
    // 50세 이상의 경우 태음인 성향 약간 증가
    scores.taeumin += 1.0;
  } else if (testData.age < 30) {
    // 30세 미만의 경우 소양인 성향 약간 증가
    scores.soyangin += 0.5;
  }

  // 5. 최고 점수의 체질 결정
  const constitutionEntries = Object.entries(scores) as [ConstitutionType, number][];
  const sortedScores = constitutionEntries.sort(([,a], [,b]) => b - a);
  const primaryConstitution = sortedScores[0][0];
  const primaryScore = sortedScores[0][1];
  const secondaryScore = sortedScores[1][1];

  // 6. 신뢰도 계산 (점수 차이 기반)
  const scoreDiff = primaryScore - secondaryScore;
  const totalRange = Math.max(...Object.values(scores)) - Math.min(...Object.values(scores));
  const confidence = totalRange > 0 ? Math.min(100, Math.max(60, 60 + (scoreDiff / totalRange) * 40)) : 75;

  // 7. 상세 분석
  const analysis = generateKS15Analysis(scores, testData, bmi);

  return {
    constitution: primaryConstitution,
    confidence: Math.round(confidence),
    scores: Object.fromEntries(
      constitutionEntries.map(([type, score]) => [
        type,
        Math.round((score + 20) * 2.5) // 정규화 (0-100 스케일)
      ])
    ) as { [key in ConstitutionType]: number },
    details: constitutions[primaryConstitution],
    bmi: Math.round(bmi * 10) / 10,
    analysis
  };
}

function generateKS15Analysis(
  scores: { [key in ConstitutionType]: number },
  testData: KS15TestData,
  bmi: number
): string[] {
  const analysis: string[] = [];
  const sortedScores = Object.entries(scores)
    .sort(([,a], [,b]) => b - a) as [ConstitutionType, number][];

  // BMI 분석
  let bmiCategory = '';
  if (bmi < 18.5) bmiCategory = '저체중';
  else if (bmi < 23) bmiCategory = '정상체중';
  else if (bmi < 25) bmiCategory = '과체중';
  else if (bmi < 30) bmiCategory = '비만';
  else bmiCategory = '고도비만';

  analysis.push(`BMI ${bmi} (${bmiCategory})로 체형적 특성이 진단에 반영되었습니다.`);

  // 성별 분석
  analysis.push(`${testData.gender === 'male' ? '남성' : '여성'}의 체질적 특성을 고려하여 진단하였습니다.`);

  // 점수 분석
  const primaryScore = sortedScores[0][1];
  const secondaryScore = sortedScores[1][1];
  const scoreDiff = primaryScore - secondaryScore;

  if (scoreDiff > 5) {
    analysis.push('뚜렷한 체질적 특징을 보여 진단 신뢰도가 높습니다.');
  } else if (scoreDiff > 2) {
    analysis.push('체질적 특징이 어느 정도 명확하게 나타납니다.');
  } else {
    analysis.push('여러 체질의 특성이 혼재되어 있어 생활습관 개선을 통한 재평가를 권합니다.');
  }

  // 연령대 분석
  if (testData.age < 30) {
    analysis.push('젊은 연령대로서 체질 관리의 골든타임입니다.');
  } else if (testData.age > 50) {
    analysis.push('중년 이후로서 체질에 맞는 건강관리가 특히 중요합니다.');
  }

  // 상위 2개 체질 언급
  const primaryName = getConstitutionKoreanName(sortedScores[0][0]);
  const secondaryName = getConstitutionKoreanName(sortedScores[1][0]);
  analysis.push(`${primaryName}의 특성이 가장 강하며, ${secondaryName}의 특성도 일부 나타납니다.`);

  return analysis;
}

function getConstitutionKoreanName(constitution: ConstitutionType): string {
  const names = {
    taeyangin: '태양인',
    taeumin: '태음인',
    soyangin: '소양인',
    soeumin: '소음인'
  };
  return names[constitution];
}

// KS-15 테스트 완성도 확인
export function validateKS15Test(testData: Partial<KS15TestData>): {
  isComplete: boolean;
  missingFields: string[];
  completionRate: number;
} {
  const requiredFields = ['answers', 'height', 'weight', 'gender', 'age'];
  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    if (!testData[field as keyof KS15TestData]) {
      missingFields.push(field);
    }
  });

  // 답변 완성도 확인
  if (testData.answers) {
    const answeredQuestions = Object.keys(testData.answers).length;
    const totalQuestions = ks15Questions.length;
    if (answeredQuestions < totalQuestions) {
      missingFields.push(`질문 ${totalQuestions - answeredQuestions}개 미완료`);
    }
  }

  const totalRequired = requiredFields.length + ks15Questions.length;
  const completed = totalRequired - missingFields.length;
  const completionRate = Math.round((completed / totalRequired) * 100);

  return {
    isComplete: missingFields.length === 0,
    missingFields,
    completionRate
  };
}