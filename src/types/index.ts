// 사상체질 타입
export type ConstitutionType = "taeyang" | "taeeum" | "soyang" | "soeum";

// 질문 타입
export interface Question {
  id: number;
  category: QuestionCategory;
  text: string;
  options: QuestionOption[];
}

// 질문 카테고리
export type QuestionCategory =
  | "physique" // 체형
  | "personality" // 성격
  | "digestion" // 소화
  | "sleep" // 수면
  | "emotion" // 감정
  | "temperature" // 체온
  | "behavior"; // 행동

// 질문 옵션
export interface QuestionOption {
  id: string;
  text: string;
  weights: ConstitutionWeights;
}

// 각 체질별 가중치
export interface ConstitutionWeights {
  taeyang: number;
  taeeum: number;
  soyang: number;
  soeum: number;
}

// 테스트 결과
export interface TestResult {
  constitution: ConstitutionType;
  scores: ConstitutionWeights;
  confidence: number;
  characteristics: string[];
  recommendations: string[];
}

// 사용자 답변
export interface UserAnswer {
  questionId: number;
  selectedOptionId: string;
}

// 테스트 진행 상태
export interface TestProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  answers: UserAnswer[];
  startTime: Date;
  isCompleted: boolean;
}

// 체질별 특성 정보
export interface ConstitutionInfo {
  name: string;
  koreanName: string;
  description: string;
  characteristics: string[];
  strengths: string[];
  weaknesses: string[];
  healthAdvice: string[];
  dietRecommendations: string[];
  exerciseRecommendations: string[];
}
