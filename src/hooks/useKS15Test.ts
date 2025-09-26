import { useState, useCallback } from 'react';
import { ks15Questions } from '../data/ks15-questions';
import { diagnoseKS15Constitution, validateKS15Test, KS15TestData } from '../lib/ks15-diagnosis';
import { DiagnosisResult } from '../types';

export interface KS15TestState {
  currentQuestionIndex: number;
  answers: { [questionId: number]: string };
  userInfo: {
    height: number;
    weight: number;
    gender: 'male' | 'female' | '';
    age: number;
  };
  isCompleted: boolean;
  result: DiagnosisResult | null;
  startTime: Date;
}

export const useKS15Test = () => {
  const [testState, setTestState] = useState<KS15TestState>({
    currentQuestionIndex: 0,
    answers: {},
    userInfo: {
      height: 0,
      weight: 0,
      gender: '',
      age: 0
    },
    isCompleted: false,
    result: null,
    startTime: new Date()
  });

  const totalQuestions = ks15Questions.length;
  const currentQuestion = ks15Questions[testState.currentQuestionIndex];
  const progress = ((testState.currentQuestionIndex + 1) / totalQuestions) * 100;

  // 답변 선택
  const selectAnswer = useCallback((optionId: string) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: optionId
      }
    }));
  }, [currentQuestion?.id]);

  // 다음 질문으로 이동
  const nextQuestion = useCallback(() => {
    setTestState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1
    }));
  }, []);

  // 이전 질문으로 이동
  const previousQuestion = useCallback(() => {
    setTestState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  }, []);

  // 특정 질문으로 이동
  const goToQuestion = useCallback((index: number) => {
    setTestState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(totalQuestions - 1, index))
    }));
  }, [totalQuestions]);

  // 사용자 정보 업데이트
  const updateUserInfo = useCallback((info: Partial<KS15TestState['userInfo']>) => {
    setTestState(prev => ({
      ...prev,
      userInfo: {
        ...prev.userInfo,
        ...info
      }
    }));
  }, []);

  // BMI 계산
  const calculateBMI = useCallback(() => {
    const { height, weight } = testState.userInfo;
    if (height > 0 && weight > 0) {
      return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
    }
    return 0;
  }, [testState.userInfo]);

  // 테스트 완성도 확인
  const getCompletionStatus = useCallback(() => {
    const testData: Partial<KS15TestData> = {
      answers: testState.answers,
      height: testState.userInfo.height,
      weight: testState.userInfo.weight,
      gender: testState.userInfo.gender as 'male' | 'female',
      age: testState.userInfo.age
    };

    return validateKS15Test(testData);
  }, [testState]);

  // 진단 실행
  const diagnose = useCallback(() => {
    const { userInfo, answers } = testState;

    if (!userInfo.height || !userInfo.weight || !userInfo.gender || !userInfo.age) {
      throw new Error('사용자 정보가 완전하지 않습니다.');
    }

    const testData: KS15TestData = {
      answers,
      height: userInfo.height,
      weight: userInfo.weight,
      gender: userInfo.gender as 'male' | 'female',
      age: userInfo.age
    };

    const result = diagnoseKS15Constitution(testData);

    setTestState(prev => ({
      ...prev,
      result,
      isCompleted: true
    }));

    return result;
  }, [testState]);

  // 테스트 초기화
  const resetTest = useCallback(() => {
    setTestState({
      currentQuestionIndex: 0,
      answers: {},
      userInfo: {
        height: 0,
        weight: 0,
        gender: '',
        age: 0
      },
      isCompleted: false,
      result: null,
      startTime: new Date()
    });
  }, []);

  // 현재 질문의 답변 여부 확인
  const isCurrentQuestionAnswered = useCallback(() => {
    return currentQuestion ? !!testState.answers[currentQuestion.id] : false;
  }, [currentQuestion, testState.answers]);

  // 질문 단계에서 다음으로 진행 가능한지 확인
  const canProceed = useCallback(() => {
    return isCurrentQuestionAnswered();
  }, [isCurrentQuestionAnswered]);

  // 사용자 정보 단계에서 진행 가능한지 확인
  const canCompleteUserInfo = useCallback(() => {
    const { height, weight, gender, age } = testState.userInfo;
    return height > 0 && weight > 0 && gender !== '' && age > 0;
  }, [testState.userInfo]);

  // 테스트 완료 가능 여부 확인
  const canComplete = useCallback(() => {
    const completion = getCompletionStatus();
    return completion.isComplete;
  }, [getCompletionStatus]);

  return {
    // State
    testState,
    currentQuestion,
    totalQuestions,
    progress,
    bmi: calculateBMI(),

    // Status checks
    isCurrentQuestionAnswered: isCurrentQuestionAnswered(),
    canProceed: canProceed(),
    canCompleteUserInfo: canCompleteUserInfo(),
    canComplete: canComplete(),
    completionStatus: getCompletionStatus(),

    // Actions
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    updateUserInfo,
    diagnose,
    resetTest
  };
};