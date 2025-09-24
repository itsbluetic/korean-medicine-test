interface TestStartProps {
  onStartTest: () => void;
}

export default function TestStart({ onStartTest }: TestStartProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            한의학적 체질 진단 테스트
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            사상의학 기반의 체질 진단을 통해 자신의 체질을 알아보세요
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-blue-300">
            테스트 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">총 10개 질문</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">소요시간 약 5분</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">4가지 체질 분류</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
              <span className="text-gray-700 dark:text-gray-300">맞춤형 건강조언</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            진단 가능한 체질
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">태양인</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                진취적이고 창의적이며 리더십이 강한 체질
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">태음인</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                침착하고 신중하며 끈기가 강한 체질
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">소양인</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                활발하고 사교적이며 외향적인 체질
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">소음인</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                섬세하고 신중하며 내성적인 체질
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
          <button
            onClick={onStartTest}
            aria-label="체질 진단 테스트 시작하기"
            className="bg-blue-600 text-white px-8 sm:px-12 py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg touch-manipulation active:scale-95 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            테스트 시작하기
          </button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p>
            * 이 진단 결과는 참고용이며, 정확한 체질 판정은 한의사의 진료를 받으시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}