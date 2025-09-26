'use client';

import { useState } from 'react';
import { ks15Questions } from '@/data/ks15-questions';
import { diagnoseKS15Constitution, KS15TestData } from '@/lib/ks15-diagnosis';
import { DiagnosisResult } from '@/types';

export default function KS15TestPage() {
  const [currentStep, setCurrentStep] = useState<'userInfo' | 'questions' | 'results'>('userInfo');
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [userInfo, setUserInfo] = useState({
    height: 170,
    weight: 65,
    gender: 'male' as 'male' | 'female',
    age: 30
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const bmi = userInfo.height && userInfo.weight
    ? Math.round((userInfo.weight / Math.pow(userInfo.height / 100, 2)) * 10) / 10
    : 0;

  const handleUserInfoSubmit = () => {
    if (userInfo.height && userInfo.weight && userInfo.gender && userInfo.age) {
      setCurrentStep('questions');
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    const currentQuestion = ks15Questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < ks15Questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 모든 질문 완료 - 진단 실행
      const testData: KS15TestData = {
        answers,
        height: userInfo.height,
        weight: userInfo.weight,
        gender: userInfo.gender,
        age: userInfo.age
      };

      try {
        const diagnosisResult = diagnoseKS15Constitution(testData);
        setResult(diagnosisResult);
        setCurrentStep('results');
      } catch (error) {
        console.error('진단 실패:', error);
        alert('진단 중 오류가 발생했습니다: ' + error);
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = ks15Questions[currentQuestionIndex];
  const isCurrentAnswered = currentQuestion && answers[currentQuestion.id];
  const progress = ((currentQuestionIndex + 1) / ks15Questions.length) * 100;

  const resetTest = () => {
    setCurrentStep('userInfo');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            🩺 KS-15 표준 체질 진단 (3체질 시스템)
          </h1>

          {/* 사용자 정보 입력 */}
          {currentStep === 'userInfo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">기본 정보를 입력해주세요</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">키 (cm)</label>
                  <input
                    type="number"
                    value={userInfo.height}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, height: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: 170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">몸무게 (kg)</label>
                  <input
                    type="number"
                    value={userInfo.weight}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, weight: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: 65"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">성별</label>
                  <select
                    value={userInfo.gender}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">나이</label>
                  <input
                    type="number"
                    value={userInfo.age}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, age: Number(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: 30"
                  />
                </div>
              </div>

              {bmi > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-center text-lg">
                    <span className="font-medium">BMI: {bmi}</span>
                    <span className="ml-2 text-gray-600">
                      ({bmi < 18.5 ? '저체중' : bmi < 23 ? '정상' : bmi < 25 ? '과체중' : bmi < 30 ? '비만' : '고도비만'})
                    </span>
                  </p>
                </div>
              )}

              <button
                onClick={handleUserInfoSubmit}
                disabled={!userInfo.height || !userInfo.weight || !userInfo.gender || !userInfo.age}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                테스트 시작하기
              </button>
            </div>
          )}

          {/* 질문 단계 */}
          {currentStep === 'questions' && currentQuestion && (
            <div className="space-y-6">
              {/* 진행률 */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>질문 {currentQuestionIndex + 1} / {ks15Questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* 질문 */}
              <div className="text-center">
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {currentQuestion.category === 'personality' ? '성격' :
                   currentQuestion.category === 'digestion' ? '소화' :
                   currentQuestion.category === 'temperature' ? '체온' :
                   currentQuestion.category === 'bowel' ? '배변' :
                   currentQuestion.category === 'urination' ? '소변' : '기타'}
                </div>
                <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* 선택지 */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      answers[currentQuestion.id] === option.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>

              {/* 네비게이션 */}
              <div className="flex justify-between pt-6">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  이전
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={!isCurrentAnswered}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  {currentQuestionIndex === ks15Questions.length - 1 ? '진단하기' : '다음'}
                </button>
              </div>
            </div>
          )}

          {/* 결과 */}
          {currentStep === 'results' && result && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">🎯 진단 결과</h2>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-6">
                  <h3 className="text-2xl font-bold">{result.details.koreanName}</h3>
                  <p className="text-blue-100 mt-2">신뢰도: {result.confidence}%</p>
                  <p className="text-blue-100">BMI: {result.bmi}</p>
                </div>
              </div>

              {/* 점수 분포 */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">체질별 점수</h4>
                <div className="space-y-2">
                  {Object.entries(result.scores).map(([constitution, score]) => {
                    const names = {
                      taeumin: '태음인',
                      soyangin: '소양인',
                      soeumin: '소음인'
                    };
                    return (
                      <div key={constitution} className="flex justify-between items-center">
                        <span>{names[constitution as keyof typeof names]}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${constitution === result.constitution ? 'bg-blue-600' : 'bg-gray-400'}`}
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{score}점</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 상세 분석 */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">📊 상세 분석</h4>
                <ul className="space-y-2">
                  {result.analysis.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 체질 설명 */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">🏥 체질 특성</h4>
                <p className="text-gray-700 mb-4">{result.details.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-green-700">강점</h5>
                    <ul className="text-sm space-y-1">
                      {result.details.strengths.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2 text-red-700">주의사항</h5>
                    <ul className="text-sm space-y-1">
                      {result.details.weaknesses.slice(0, 3).map((item, index) => (
                        <li key={index} className="text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={resetTest}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                다시 테스트하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}