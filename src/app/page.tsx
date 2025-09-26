"use client";

import { useConstitutionTest } from "@/hooks/useConstitutionTest";
import TestStart from "@/components/TestStart";
import Question from "@/components/Question";
import ProgressBar from "@/components/ProgressBar";
import TestResult from "@/components/TestResult";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const {
    testState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    testResult,
    startTest,
    answerQuestion,
    goToNextQuestion,
    goToPreviousQuestion,
    completeTest,
    resetTest,
    getCurrentAnswer,
    isAllQuestionsAnswered,
    canGoNext,
    canGoPrevious,
  } = useConstitutionTest();

  if (testState === "start") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <ThemeToggle />
        <div className="max-w-2xl mx-auto space-y-8">
          {/* 기존 간소화 테스트 */}
          <TestStart onStartTest={startTest} />

          {/* 구분선 */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <span className="px-4 text-gray-500 dark:text-gray-400 text-sm">또는</span>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* KS-15 표준 테스트 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center space-y-4">
              <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                🩺 KS-15 표준 진단
              </h2>

              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                의료급 정확도의 KS-15 표준 평가도구로 더 정밀한 체질 진단을 받아보세요.
                BMI 계산과 성별/연령별 맞춤 분석이 포함됩니다.
              </p>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">14개 질문</span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">BMI 포함</span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">의료 데이터 기반</span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">성별별 가중치</span>
              </div>

              <a
                href="/ks15-test"
                className="inline-flex items-center justify-center w-full max-w-xs mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                KS-15 테스트 시작
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === "completed" && testResult) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <ThemeToggle />
        <TestResult result={testResult} onRetakeTest={resetTest} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <ThemeToggle />
      <div className="max-w-4xl mx-auto">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
        />

        {currentQuestion && (
          <Question
            question={currentQuestion}
            selectedOptionId={getCurrentAnswer()}
            onOptionSelect={answerQuestion}
            onSwipeLeft={canGoNext ? goToNextQuestion : undefined}
            onSwipeRight={canGoPrevious ? goToPreviousQuestion : undefined}
          />
        )}

        <div className="flex justify-between items-center mt-8 max-w-2xl mx-auto px-4">
          <button
            onClick={goToPreviousQuestion}
            disabled={!canGoPrevious}
            aria-label="이전 질문으로 이동"
            className={`px-4 sm:px-6 py-3 sm:py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
              canGoPrevious
                ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm"
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="hidden sm:inline">이전 질문</span>
            <span className="sm:hidden">이전</span>
          </button>

          <div className="text-center px-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>

          {isAllQuestionsAnswered ? (
            <button
              onClick={completeTest}
              aria-label="테스트 완료하고 결과 보기"
              className="bg-green-600 text-white px-4 sm:px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <span className="hidden sm:inline">결과 보기</span>
              <span className="sm:hidden">결과</span>
            </button>
          ) : (
            <button
              onClick={goToNextQuestion}
              disabled={!canGoNext}
              aria-label="다음 질문으로 이동"
              className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                canGoNext
                  ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-md hover:shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }`}
            >
              <span className="hidden sm:inline">다음 질문</span>
              <span className="sm:hidden">다음</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
