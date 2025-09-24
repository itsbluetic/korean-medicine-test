import { TestResult as TestResultType } from "@/types";
import { getConstitutionInfo } from "@/data/constitutions";
import { getConfidenceMessage, getScoreDistribution } from "@/lib/diagnosis";
import { useTestHistory } from "@/hooks/useTestHistory";
import ShareButton from "./ShareButton";
import { useEffect, useState } from "react";

interface TestResultProps {
  result: TestResultType;
  onRetakeTest: () => void;
}

const constitutionNames: Record<string, string> = {
  taeyang: "태양인",
  taeeum: "태음인",
  soyang: "소양인",
  soeum: "소음인",
};

export default function TestResult({ result, onRetakeTest }: TestResultProps) {
  const constitutionInfo = getConstitutionInfo(result.constitution);
  const confidenceMessage = getConfidenceMessage(result.confidence);
  const scoreDistribution = getScoreDistribution(result.scores);
  const { saveResult } = useTestHistory();
  const [isSaved, setIsSaved] = useState(false);

  // 결과를 자동으로 저장
  useEffect(() => {
    if (!isSaved) {
      const savedId = saveResult(result);
      setIsSaved(true);
      console.log("Test result saved with ID:", savedId);
    }
  }, [result, saveResult, isSaved]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* 메인 결과 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          진단 결과
        </h1>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
          <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-2">
            {constitutionInfo.koreanName}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{constitutionInfo.description}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            신뢰도: {result.confidence}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{confidenceMessage}</p>
          {isSaved && (
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-xs">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>결과가 저장되었습니다</span>
            </div>
          )}
        </div>
      </div>

      {/* 점수 분포 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          체질별 점수 분포
        </h3>
        <div className="space-y-3">
          {Object.entries(scoreDistribution).map(([constitution, percentage]) => (
            <div key={constitution} className="flex items-center">
              <div className="w-20 text-sm font-medium text-gray-600 dark:text-gray-400">
                {constitutionNames[constitution]}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 mr-3">
                <div
                  className={`h-6 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                    constitution === result.constitution
                      ? "bg-blue-600 dark:bg-blue-500"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 10 ? `${percentage}%` : ""}
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                {percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 체질별 특성 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            신체적 특성
          </h3>
          <ul className="space-y-2">
            {constitutionInfo.characteristics.map((characteristic, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">{characteristic}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            성격적 강점
          </h3>
          <ul className="space-y-2">
            {constitutionInfo.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700 dark:text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 건강 관리 권장사항 */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            건강 관리법
          </h3>
          <ul className="space-y-2">
            {constitutionInfo.healthAdvice.map((advice, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{advice}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            식단 권장사항
          </h3>
          <ul className="space-y-2">
            {constitutionInfo.dietRecommendations.map((diet, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{diet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            운동 권장사항
          </h3>
          <ul className="space-y-2">
            {constitutionInfo.exerciseRecommendations.map((exercise, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{exercise}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 주의사항 및 재검사 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          주의사항
        </h3>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 mb-4">
          <ul className="space-y-2">
            {constitutionInfo.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <ShareButton result={result} />
          <button
            onClick={onRetakeTest}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 touch-manipulation active:scale-95"
          >
            테스트 다시 하기
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-6">
        <p>
          * 이 진단 결과는 참고용이며, 정확한 체질 판정은 한의사의 진료를 받으시기 바랍니다.
        </p>
      </div>
    </div>
  );
}