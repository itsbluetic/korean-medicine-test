"use client";

import { useState, useCallback } from "react";
import { UserAnswer, LegacyTestResult } from "@/types";
import { questions } from "@/data/questions";
import { generateTestResult } from "@/lib/diagnosis";

export type TestState = "start" | "testing" | "completed";

export function useConstitutionTest() {
  const [testState, setTestState] = useState<TestState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [testResult, setTestResult] = useState<LegacyTestResult | null>(null);

  const startTest = useCallback(() => {
    setTestState("testing");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestResult(null);
  }, []);

  const answerQuestion = useCallback(
    (optionId: string) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return;

      const newAnswer: UserAnswer = {
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
      };

      // 기존 답변이 있다면 교체, 없다면 추가
      const updatedAnswers = answers.filter(
        (answer) => answer.questionId !== currentQuestion.id
      );
      updatedAnswers.push(newAnswer);
      setAnswers(updatedAnswers);
    },
    [currentQuestionIndex, answers]
  );

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const completeTest = useCallback(() => {
    if (answers.length === questions.length) {
      const result = generateTestResult(answers);
      setTestResult(result);
      setTestState("completed");
    }
  }, [answers]);

  const resetTest = useCallback(() => {
    setTestState("start");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestResult(null);
  }, []);

  // 현재 질문에 대한 답변 가져오기
  const getCurrentAnswer = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return undefined;

    return answers.find(
      (answer) => answer.questionId === currentQuestion.id
    )?.selectedOptionId;
  }, [currentQuestionIndex, answers]);

  // 모든 질문에 답변했는지 확인
  const isAllQuestionsAnswered = answers.length === questions.length;

  // 현재 질문에 답변했는지 확인
  const isCurrentQuestionAnswered = getCurrentAnswer() !== undefined;

  // 다음 질문으로 이동 가능한지 확인
  const canGoNext =
    isCurrentQuestionAnswered && currentQuestionIndex < questions.length - 1;

  // 이전 질문으로 이동 가능한지 확인
  const canGoPrevious = currentQuestionIndex > 0;

  return {
    // 상태
    testState,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    answers,
    testResult,
    totalQuestions: questions.length,

    // 액션
    startTest,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    completeTest,
    resetTest,

    // 도우미 함수
    getCurrentAnswer,
    isAllQuestionsAnswered,
    isCurrentQuestionAnswered,
    canGoNext,
    canGoPrevious,
  };
}