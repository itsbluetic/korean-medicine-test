import { DiagnosisResult } from '../types';
import { ks15Questions } from '../data/ks15-questions-corrected';
import { ConstitutionType } from '../data/ks15-weight-matrix';
import { constitutions } from '../data/constitutions';

export interface KS15TestData {
  answers: { [questionId: number]: string };
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female';
  age: number;
}

export function diagnoseKS15Constitution(testData: KS15TestData): DiagnosisResult {
  // 3체질 점수 초기화 (태음인, 소양인, 소음인)
  const scores: [number, number, number] = [0, 0, 0]; // [태음인, 소양인, 소음인]

  console.log('🔬 KS-15 진단 시작:', testData);

  // 1. 각 질문 답변 기반 점수 계산 - 질문 데이터에서 직접 가중치 사용
  ks15Questions.forEach(question => {
    const answerId = testData.answers[question.id];
    if (answerId) {
      const selectedOption = question.options.find(option => option.id === answerId);
      if (selectedOption && selectedOption.weights) {
        const weights = testData.gender === 'male'
          ? selectedOption.weights.male
          : selectedOption.weights.female;

        console.log(`질문 ${question.id}, 답변 ${answerId}: ${weights}`);

        scores[0] += weights[0]; // 태음인
        scores[1] += weights[1]; // 소양인
        scores[2] += weights[2]; // 소음인
      } else {
        // 기본값 사용 (질문에서 is_default가 true인 옵션)
        const defaultOption = question.options.find(opt => opt.is_default);
        if (defaultOption && defaultOption.weights) {
          const weights = testData.gender === 'male'
            ? defaultOption.weights.male
            : defaultOption.weights.female;

          console.log(`질문 ${question.id} 기본값 사용: ${weights}`);

          scores[0] += weights[0];
          scores[1] += weights[1];
          scores[2] += weights[2];
        }
      }
    }
  });

  console.log('기본 점수:', scores);

  // 2. BMI 기반 체형 점수 추가
  const bmi = testData.weight / Math.pow(testData.height / 100, 2);
  const bmiAdjustment = calculateBMIAdjustment(bmi);
  scores[0] += bmiAdjustment[0]; // 태음인
  scores[1] += bmiAdjustment[1]; // 소양인
  scores[2] += bmiAdjustment[2]; // 소음인

  console.log('BMI 조정 후 점수:', scores, 'BMI:', bmi);

  // 3. 나이별 조정
  const ageAdjustment = calculateAgeAdjustment(testData.age);
  scores[0] += ageAdjustment[0];
  scores[1] += ageAdjustment[1];
  scores[2] += ageAdjustment[2];

  console.log('나이 조정 후 점수:', scores);

  // 4. 최고 점수의 체질 결정
  const maxScore = Math.max(...scores);
  const primaryIndex = scores.indexOf(maxScore);

  const constitutionTypes: ConstitutionType[] = ['taeumin', 'soyangin', 'soeumin'];
  const primaryConstitution = constitutionTypes[primaryIndex];

  // 5. 신뢰도 계산
  const sortedScores = [...scores].sort((a, b) => b - a);
  const scoreDiff = sortedScores[0] - sortedScores[1];
  const confidence = calculateConfidence(scoreDiff, scores);

  console.log('최종 진단:', primaryConstitution, '신뢰도:', confidence, '%');

  // 6. 결과 정규화 (0-100 스케일)
  const minScore = Math.min(...scores);
  const maxRange = Math.max(...scores) - minScore;

  const normalizedScores = {
    taeyangin: 0, // KS-15에서는 태양인 진단하지 않음
    taeumin: maxRange > 0 ? Math.round(((scores[0] - minScore) / maxRange) * 100) : 33,
    soyangin: maxRange > 0 ? Math.round(((scores[1] - minScore) / maxRange) * 100) : 33,
    soeumin: maxRange > 0 ? Math.round(((scores[2] - minScore) / maxRange) * 100) : 33,
  };

  // 7. 상세 분석 생성
  const analysis = generateKS15Analysis(scores, testData, bmi);

  return {
    constitution: primaryConstitution as ConstitutionType,
    confidence: Math.round(confidence),
    scores: normalizedScores,
    details: constitutions[primaryConstitution === 'taeumin' ? 'taeumin' :
                         primaryConstitution === 'soyangin' ? 'soyangin' : 'soeumin'] || constitutions.taeumin,
    bmi: Math.round(bmi * 10) / 10,
    analysis
  };
}

function calculateBMIAdjustment(bmi: number): [number, number, number] {
  // BMI에 따른 체질 성향 조정
  if (bmi < 18.5) {
    // 저체중 - 소음인 성향 증가
    return [0, 0, 1.0];
  } else if (bmi < 23) {
    // 정상체중 - 균형
    return [0, 0.5, 0];
  } else if (bmi < 25) {
    // 과체중 - 태음인 성향 증가
    return [1.0, 0, 0];
  } else if (bmi < 30) {
    // 비만 - 태음인 성향 강화
    return [2.0, -0.5, -0.5];
  } else {
    // 고도비만 - 태음인 성향 매우 강화
    return [3.0, -1.0, -1.0];
  }
}

function calculateAgeAdjustment(age: number): [number, number, number] {
  if (age < 30) {
    // 젊은 층 - 소양인 성향 증가
    return [0, 0.5, 0];
  } else if (age > 50) {
    // 중년 이후 - 태음인 성향 증가
    return [1.0, 0, 0];
  } else {
    return [0, 0, 0];
  }
}

function calculateConfidence(scoreDiff: number, scores: [number, number, number]): number {
  // 점수 차이가 클수록 신뢰도 높음
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const totalRange = maxScore - minScore;

  if (totalRange === 0) return 70; // 모든 점수가 같으면 70%

  const relativeGap = scoreDiff / totalRange;
  const baseConfidence = 60;
  const confidenceBoost = relativeGap * 35;

  return Math.min(95, Math.max(60, baseConfidence + confidenceBoost));
}

function generateKS15Analysis(
  scores: [number, number, number],
  testData: KS15TestData,
  bmi: number
): string[] {
  const analysis: string[] = [];

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

  // 점수 분포 분석
  const sortedScores = [...scores].sort((a, b) => b - a);
  const scoreDiff = sortedScores[0] - sortedScores[1];

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

  // KS-15 표준 언급
  analysis.push('KS-15 표준 평가도구를 사용한 의료급 진단입니다.');

  return analysis;
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