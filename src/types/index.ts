// 사상체질 타입 (KS-15 표준 명명법)
export type ConstitutionType = "taeyangin" | "taeumin" | "soyangin" | "soeumin";

// 레거시 호환성을 위한 타입 매핑
export type LegacyConstitutionType = "taeyang" | "taeeum" | "soyang" | "soeum";

// 질문 타입
export interface Question {
  id: number;
  category: QuestionCategory;
  question?: string; // KS-15에서 사용
  text?: string; // 기존 시스템에서 사용
  options: QuestionOption[];
}

// 질문 카테고리 (KS-15 표준)
export type QuestionCategory =
  | "physique" // 체형/BMI
  | "personality" // 성격 (심성)
  | "digestion" // 소화
  | "sleep" // 수면
  | "emotion" // 감정
  | "temperature" // 체온/온도반응
  | "behavior" // 행동
  | "bowel" // 대변
  | "urination"; // 소변

// 레거시 질문 옵션 (기존 시스템)
export interface LegacyQuestionOption {
  id: string;
  text: string;
  weights: LegacyConstitutionWeights;
}

// 질문 옵션 (KS-15)
export interface QuestionOption {
  id: string;
  text: string;
  weights: ConstitutionWeights;
}

// 레거시 질문 (기존 시스템)
export interface LegacyQuestion {
  id: number;
  category: QuestionCategory;
  text: string;
  options: LegacyQuestionOption[];
}

// 레거시 체질별 가중치 (기존 시스템)
export interface LegacyConstitutionWeights {
  taeyang: number;
  taeeum: number;
  soyang: number;
  soeum: number;
}

// 각 체질별 가중치 (KS-15 표준)
export interface ConstitutionWeights {
  taeyangin: number;
  taeumin: number;
  soyangin: number;
  soeumin: number;
}

// KS-15 진단 결과
export interface DiagnosisResult {
  constitution: ConstitutionType;
  confidence: number;
  scores: { [key in ConstitutionType]: number };
  details: ConstitutionInfo;
  bmi: number;
  analysis: string[];
}

// 기존 테스트 결과 (레거시 호환)
export interface TestResult {
  constitution: ConstitutionType;
  scores: ConstitutionWeights;
  confidence: number;
  characteristics: string[];
  recommendations: string[];
}

// 레거시 테스트 결과
export interface LegacyTestResult {
  constitution: LegacyConstitutionType;
  scores: LegacyConstitutionWeights;
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
