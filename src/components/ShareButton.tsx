"use client";

import { useState } from "react";
import { TestResult } from "@/types";
import { shareResult, shareToSocialMedia, downloadResult } from "@/lib/share";

interface ShareButtonProps {
  result: TestResult;
}

export default function ShareButton({ result }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const handleShare = async () => {
    const success = await shareResult(result);
    if (success) {
      setCopyMessage("결과가 클립보드에 복사되었습니다!");
      setTimeout(() => setCopyMessage(""), 3000);
    } else {
      setCopyMessage("공유에 실패했습니다.");
      setTimeout(() => setCopyMessage(""), 3000);
    }
  };

  const handleSocialShare = (platform: "twitter" | "facebook" | "kakao") => {
    shareToSocialMedia(platform, result);
    setIsOpen(false);
  };

  const handleDownload = (format: "json" | "txt") => {
    downloadResult(result, format);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 touch-manipulation active:scale-95"
        aria-label="결과 공유하기"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        <span>공유하기</span>
      </button>

      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* 공유 메뉴 */}
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 z-50">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                결과 공유하기
              </h3>

              {/* 기본 공유 */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2V9h-2v2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">클립보드에 복사</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">텍스트로 복사하기</div>
                  </div>
                </button>
              </div>

              {/* 소셜 미디어 공유 */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">소셜 미디어</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSocialShare("twitter")}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">트위터</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare("facebook")}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">페이스북</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare("kakao")}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.442 1.17 4.617 3.078 6.09l-.513 3.777a.5.5 0 00.757.429L9.14 18.59c.93.184 1.907.284 2.86.284 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">카카오</span>
                  </button>
                </div>
              </div>

              {/* 다운로드 */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">다운로드</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDownload("txt")}
                    className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">TXT</span>
                  </button>
                  <button
                    onClick={() => handleDownload("json")}
                    className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700 dark:text-gray-300">JSON</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 복사 메시지 */}
      {copyMessage && (
        <div className="absolute top-full right-0 mt-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg text-sm shadow-lg z-50">
          {copyMessage}
        </div>
      )}
    </div>
  );
}