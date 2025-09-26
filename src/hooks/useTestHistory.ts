"use client";

import { useState, useEffect, useCallback } from "react";
import { TestResult, LegacyTestResult } from "@/types";

interface SavedTestResult extends TestResult {
  id: string;
  timestamp: number;
  userAgent?: string;
}

const STORAGE_KEY = "constitution-test-history";
const MAX_HISTORY = 10; // 최대 10개까지 저장

export function useTestHistory() {
  const [history, setHistory] = useState<SavedTestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 로컬스토리지에서 히스토리 로드
  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem(STORAGE_KEY);
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory) as SavedTestResult[];
          // 날짜순으로 정렬 (최신순)
          const sortedHistory = parsed.sort((a, b) => b.timestamp - a.timestamp);
          setHistory(sortedHistory);
        }
      } catch (error) {
        console.error("Failed to load test history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  // 새로운 테스트 결과 저장
  const saveResult = useCallback((result: TestResult | LegacyTestResult): string => {
    // 레거시 타입을 새 타입으로 변환
    const convertLegacyToNew = (legacyResult: LegacyTestResult): TestResult => {
      const typeMapping = {
        taeyang: "taeyangin" as const,
        taeeum: "taeumin" as const,
        soyang: "soyangin" as const,
        soeum: "soeumin" as const,
      };

      const newScores = {
        taeyangin: legacyResult.scores.taeyang,
        taeumin: legacyResult.scores.taeeum,
        soyangin: legacyResult.scores.soyang,
        soeumin: legacyResult.scores.soeum,
      };

      return {
        constitution: typeMapping[legacyResult.constitution],
        scores: newScores,
        confidence: legacyResult.confidence,
        characteristics: legacyResult.characteristics,
        recommendations: legacyResult.recommendations,
      };
    };

    // 타입 변환 여부 확인 (LegacyConstitutionWeights has taeyang property)
    const isLegacy = 'taeyang' in (result.scores as LegacyTestResult['scores']);
    const normalizedResult: TestResult = isLegacy
      ? convertLegacyToNew(result as LegacyTestResult)
      : result as TestResult;

    const savedResult: SavedTestResult = {
      ...normalizedResult,
      id: generateId(),
      timestamp: Date.now(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    };

    setHistory((prevHistory) => {
      const newHistory = [savedResult, ...prevHistory];
      // 최대 개수 제한
      const limitedHistory = newHistory.slice(0, MAX_HISTORY);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
      } catch (error) {
        console.error("Failed to save test result:", error);
      }

      return limitedHistory;
    });

    return savedResult.id;
  }, []);

  // 특정 결과 삭제
  const deleteResult = useCallback((id: string) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter((result) => result.id !== id);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error("Failed to delete test result:", error);
      }

      return newHistory;
    });
  }, []);

  // 전체 히스토리 삭제
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear test history:", error);
    }
  }, []);

  // 특정 결과 조회
  const getResult = useCallback((id: string): SavedTestResult | undefined => {
    return history.find((result) => result.id === id);
  }, [history]);

  return {
    history,
    isLoading,
    saveResult,
    deleteResult,
    clearHistory,
    getResult,
    count: history.length,
  };
}

// 간단한 ID 생성기
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}