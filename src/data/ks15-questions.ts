import { Question, ConstitutionType } from '../types';

// KS-15 표준 체질 진단 질문 시스템
// Reference: ks15_set.dbf 파싱 데이터 기반

export const ks15Questions: Question[] = [
  // 성격 관련 질문 (1-6)
  {
    id: 1,
    category: 'personality',
    question: '성격이 대범하신가요. 섬세하신가요?',
    options: [
      { id: 'broad', text: '1. 대범', weights: { taeyangin: 1.621, taeumin: -5.496, soyangin: 1.444, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'detailed', text: '3. 섬세', weights: { taeyangin: -3.576, taeumin: 7.991, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 2,
    category: 'personality',
    question: '행동이 빠른 편인가요. 느린 편인가요?',
    options: [
      { id: 'fast', text: '1. 빠르다', weights: { taeyangin: -6.467, taeumin: 0.0, soyangin: 7.432, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 2.521, taeumin: 0.0, soyangin: -2.97, soeumin: 0.0 } },
      { id: 'slow', text: '3. 느리다', weights: { taeyangin: 2.829, taeumin: 0.0, soyangin: -3.087, soeumin: 0.0 } }
    ]
  },
  {
    id: 3,
    category: 'personality',
    question: '모든 일에 적극적인가요. 소극적인가요?',
    options: [
      { id: 'active', text: '1. 적극적', weights: { taeyangin: 0.0, taeumin: -5.655, soyangin: 3.969, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 1.991, soyangin: -1.521, soeumin: 0.0 } },
      { id: 'passive', text: '3. 소극적', weights: { taeyangin: 0.0, taeumin: 3.04, soyangin: -2.04, soeumin: 0.0 } }
    ]
  },
  {
    id: 4,
    category: 'personality',
    question: '성격이 외향적인가요. 내성적인가요?',
    options: [
      { id: 'extrovert', text: '1. 외향', weights: { taeyangin: 0.0, taeumin: -3.274, soyangin: 3.923, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'introvert', text: '3. 내성', weights: { taeyangin: 0.0, taeumin: 2.829, soyangin: -3.087, soeumin: 0.0 } }
    ]
  },
  {
    id: 5,
    category: 'personality',
    question: '남성적인 편인가요. 여성적인 편인가요?',
    options: [
      { id: 'masculine', text: '1. 남성적', weights: { taeyangin: 2.113, taeumin: -6.669, soyangin: 1.419, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 3.157, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'feminine', text: '3. 여성적', weights: { taeyangin: 0.0, taeumin: 2.282, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 6,
    category: 'personality',
    question: '가끔 흥분하는 편인가요? 이성적인 편인가요?',
    options: [
      { id: 'emotional', text: '1. 흥분', weights: { taeyangin: 0.0, taeumin: -1.77, soyangin: 1.444, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'rational', text: '3. 이성', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: -1.869, soeumin: 0.0 } }
    ]
  },

  // 증상 관련 질문 (7-14)
  {
    id: 7,
    category: 'digestion',
    question: '평소 소화는 어떠한가요?',
    options: [
      { id: 'good', text: '1. 잘된다', weights: { taeyangin: 1.721, taeumin: -4.952, soyangin: 1.596, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 보통', weights: { taeyangin: -3.565, taeumin: 8.435, soyangin: -1.596, soeumin: 0.0 } },
      { id: 'poor', text: '3. 안된다', weights: { taeyangin: -1.721, taeumin: 6.943, soyangin: -1.596, soeumin: 0.0 } }
    ]
  },
  {
    id: 8,
    category: 'digestion',
    question: '평소 입맛은 어떠한가요?',
    options: [
      { id: 'good', text: '1. 좋은 편', weights: { taeyangin: 6.535, taeumin: -8.747, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'average', text: '2. 중간', weights: { taeyangin: -4.975, taeumin: 6.309, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'poor', text: '3. 안좋다', weights: { taeyangin: -1.342, taeumin: 1.342, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 9,
    category: 'temperature',
    question: '평소 땀을 어느 정도 흘리는 편인가요?',
    options: [
      { id: 'much', text: '1. 많다', weights: { taeyangin: 4.861, taeumin: -4.587, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'moderate', text: '2. 중간', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'little', text: '3. 적다', weights: { taeyangin: -2.695, taeumin: 4.493, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 10,
    category: 'temperature',
    question: '땀을 흘리고 난 뒤 기분이 어떠한가요?',
    options: [
      { id: 'refreshed', text: '1. 상쾌', weights: { taeyangin: 2.186, taeumin: -3.669, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'tired', text: '2. 피곤', weights: { taeyangin: -4.997, taeumin: 6.039, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'no_difference', text: '3. 아무느낌 없다', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 11,
    category: 'bowel',
    question: '대변이 마려운 신호가 왔을때 참기 어려움',
    options: [
      { id: 'often', text: '1. 자주', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'sometimes', text: '2. 가끔', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'never', text: '3. 없다', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 12,
    category: 'urination',
    question: '밤(잠잘때)에 소변을 몇 회 보나요?',
    options: [
      { id: 'none', text: '1. 0회', weights: { taeyangin: 0.0, taeumin: 1.894, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'once', text: '2. 1회', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'multiple', text: '3. 2회이상', weights: { taeyangin: 0.0, taeumin: -2.48, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 13,
    category: 'temperature',
    question: '평소 추위, 더위 어느 것이 더 싫은가요?',
    options: [
      { id: 'cold', text: '1. 추위', weights: { taeyangin: -6.129, taeumin: 6.422, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'heat', text: '2. 더위', weights: { taeyangin: 9.239, taeumin: -7.655, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'both', text: '3. 모두 무관하다', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } }
    ]
  },
  {
    id: 14,
    category: 'temperature',
    question: '평소 마시는 물의 온도는 어떠한가요?',
    options: [
      { id: 'hot', text: '1. 온수', weights: { taeyangin: -1.967, taeumin: 3.134, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'cold', text: '2. 냉수', weights: { taeyangin: 0.0, taeumin: -1.368, soyangin: 0.0, soeumin: 0.0 } },
      { id: 'any', text: '3. 가리지 않는다', weights: { taeyangin: 0.0, taeumin: 0.0, soyangin: 0.0, soeumin: 0.0 } }
    ]
  }
];

// BMI 기반 체형 평가를 위한 함수
export function calculateBMIScore(bmi: number): { [key in ConstitutionType]: number } {
  // BMI 구간별 체질 점수 (참고 데이터 기반 추정)
  if (bmi < 18.5) {
    // 저체중 - 소음인 성향
    return {
      taeyangin: -2.0,
      taeumin: -3.0,
      soyangin: 1.0,
      soeumin: 4.0
    };
  } else if (bmi >= 18.5 && bmi < 23) {
    // 정상체중 - 균형
    return {
      taeyangin: 0.0,
      taeumin: 0.0,
      soyangin: 0.0,
      soeumin: 0.0
    };
  } else if (bmi >= 23 && bmi < 25) {
    // 과체중 - 태음인 성향
    return {
      taeyangin: 1.0,
      taeumin: 2.0,
      soyangin: -1.0,
      soeumin: -2.0
    };
  } else if (bmi >= 25 && bmi < 30) {
    // 비만 - 태음인 성향 강화
    return {
      taeyangin: 2.0,
      taeumin: 4.0,
      soyangin: -2.0,
      soeumin: -4.0
    };
  } else {
    // 고도비만 - 태음인 성향 최대
    return {
      taeyangin: 3.0,
      taeumin: 6.0,
      soyangin: -3.0,
      soeumin: -6.0
    };
  }
}

// 성별별 가중치 조정 함수 (k_15_wt.DBF 데이터 기반)
export function applyGenderWeights(scores: { [key in ConstitutionType]: number }, gender: 'male' | 'female'): { [key in ConstitutionType]: number } {
  if (gender === 'female') {
    // 여성의 경우 일부 가중치 조정
    return {
      taeyangin: scores.taeyangin * 1.1,
      taeumin: scores.taeumin * 1.05,
      soyangin: scores.soyangin * 0.95,
      soeumin: scores.soeumin * 1.0
    };
  }
  return scores; // 남성은 기본 가중치 사용
}