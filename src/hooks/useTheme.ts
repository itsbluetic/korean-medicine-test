"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 시스템 테마 감지
  const getSystemTheme = useCallback((): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  // 로컬스토리지에서 테마 읽기
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // 테마 변경 시 resolvedTheme 업데이트
  useEffect(() => {
    const updateResolvedTheme = () => {
      const newResolvedTheme = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(newResolvedTheme);

      // HTML 클래스 업데이트
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newResolvedTheme);
      }
    };

    updateResolvedTheme();

    // 시스템 테마 변경 감지
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addEventListener("change", updateResolvedTheme);
      return () => mediaQuery.removeEventListener("change", updateResolvedTheme);
    }
  }, [theme, getSystemTheme]);

  // 테마 변경 함수
  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  }, []);

  return {
    theme,
    resolvedTheme,
    changeTheme,
    systemTheme: getSystemTheme(),
  };
}