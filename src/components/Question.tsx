import { Question as QuestionType, LegacyQuestion } from "@/types";
import { useSwipe } from "@/hooks/useSwipe";

interface QuestionProps {
  question: QuestionType | LegacyQuestion;
  selectedOptionId?: string;
  onOptionSelect: (optionId: string) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export default function Question({
  question,
  selectedOptionId,
  onOptionSelect,
  onSwipeLeft,
  onSwipeRight,
}: QuestionProps) {
  const swipeRef = useSwipe({
    onSwipeLeft,
    onSwipeRight,
    threshold: 80,
  });

  const handleKeyDown = (event: React.KeyboardEvent, optionId: string, index: number) => {
    const { key } = event;
    const options = question.options;

    switch (key) {
      case "Enter":
      case " ":
        event.preventDefault();
        onOptionSelect(optionId);
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        const nextIndex = index < options.length - 1 ? index + 1 : 0;
        const nextButton = document.querySelector(`[aria-describedby="option-${options[nextIndex].id}-text"]`) as HTMLElement;
        nextButton?.focus();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : options.length - 1;
        const prevButton = document.querySelector(`[aria-describedby="option-${options[prevIndex].id}-text"]`) as HTMLElement;
        prevButton?.focus();
        break;
    }
  };
  return (
    <div
      ref={swipeRef}
      className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md relative"
      role="radiogroup"
      aria-labelledby={`question-${question.id}-title`}
      aria-describedby={`question-${question.id}-description`}
    >
      {/* 스와이프 인디케이터 (모바일만) */}
      <div className="sm:hidden flex justify-center mb-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          좌우로 스와이프하여 이동
        </p>
      </div>

      <div className="mb-6">
        <h2
          id={`question-${question.id}-title`}
          className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2"
        >
          질문 {question.id}
        </h2>
        <p
          id={`question-${question.id}-description`}
          className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          {('text' in question ? question.text : question.question) || 'No question text available'}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onOptionSelect(option.id)}
            onKeyDown={(e) => handleKeyDown(e, option.id, index)}
            role="radio"
            aria-checked={selectedOptionId === option.id}
            aria-describedby={`option-${option.id}-text`}
            tabIndex={selectedOptionId === option.id || (!selectedOptionId && index === 0) ? 0 : -1}
            className={`w-full p-4 sm:p-5 text-left border-2 rounded-xl transition-all duration-200 touch-manipulation active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              selectedOptionId === option.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 shadow-md"
                : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-600"
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                id={`option-${option.id}-text`}
                className="text-sm sm:text-base font-medium flex-1 leading-relaxed pr-4"
              >
                {option.text}
              </span>
              <div className="ml-2 flex-shrink-0 mt-1">
                <div
                  className={`w-5 h-5 sm:w-4 sm:h-4 rounded-full border-2 ${
                    selectedOptionId === option.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 dark:border-gray-500"
                  }`}
                >
                  {selectedOptionId === option.id && (
                    <div className="w-3 h-3 sm:w-2 sm:h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}