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
          <TestStart onStartTest={startTest} />

          {/* 의료급 진단 안내 */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="text-center space-y-3">
              <div className="inline-block p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                더 정밀한 진단이 필요하신가요?
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                의료급 KS-15 표준 진단 시스템이 별도로 제공됩니다.
                BMI와 성별/연령별 맞춤 분석으로 더욱 정확한 결과를 얻으실 수 있습니다.
              </p>

              <a
                href="https://korean-medicine-ks15.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                KS-15 의료급 진단 →
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
