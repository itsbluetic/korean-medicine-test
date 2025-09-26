import { TestResult, LegacyTestResult } from "@/types";
import { getConstitutionInfo, getLegacyConstitutionInfo } from "@/data/constitutions";

export interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export function generateShareText(result: TestResult | LegacyTestResult): string {
  // 레거시 결과인지 확인
  const isLegacy = 'taeyang' in (result.scores as LegacyTestResult['scores']);
  const constitutionInfo = isLegacy
    ? getLegacyConstitutionInfo((result as LegacyTestResult).constitution)
    : getConstitutionInfo((result as TestResult).constitution);

  return `🔮 한의학적 체질 진단 결과

📊 내 체질: ${constitutionInfo.koreanName}
🎯 신뢰도: ${result.confidence}%

${constitutionInfo.description}

#체질진단 #사상의학 #건강관리`;
}

export function generateShareUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "https://korean-medicine-test.vercel.app"; // fallback URL
}

export async function shareResult(result: TestResult | LegacyTestResult): Promise<boolean> {
  const shareText = generateShareText(result);
  const shareUrl = generateShareUrl();

  const shareData: ShareOptions = {
    title: "한의학적 체질 진단 테스트",
    text: shareText,
    url: shareUrl,
  };

  // Web Share API 지원 여부 확인
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // 사용자가 취소한 경우는 에러가 아님
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing:", error);
      }
      return false;
    }
  }

  // Web Share API를 지원하지 않는 경우 클립보드에 복사
  return copyToClipboard(shareText + "\n\n" + shareUrl);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

export function shareToSocialMedia(
  platform: "twitter" | "facebook" | "kakao",
  result: TestResult | LegacyTestResult
): void {
  const text = generateShareText(result);
  const url = generateShareUrl();
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  let shareUrl = "";

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
      break;
    case "kakao":
      // 카카오톡 공유는 SDK가 필요하므로 여기서는 URL만 생성
      shareUrl = `https://story.kakao.com/share?url=${encodedUrl}&text=${encodedText}`;
      break;
    default:
      console.error("Unsupported social media platform:", platform);
      return;
  }

  if (typeof window !== "undefined") {
    window.open(
      shareUrl,
      "share",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    );
  }
}

export function downloadResult(result: TestResult | LegacyTestResult, format: "json" | "txt" = "txt"): void {
  // 레거시 결과인지 확인
  const isLegacy = 'taeyang' in (result.scores as LegacyTestResult['scores']);
  const constitutionInfo = isLegacy
    ? getLegacyConstitutionInfo((result as LegacyTestResult).constitution)
    : getConstitutionInfo((result as TestResult).constitution);
  const timestamp = new Date().toLocaleString("ko-KR");

  let content = "";
  let filename = "";
  let mimeType = "";

  if (format === "json") {
    content = JSON.stringify({
      결과: constitutionInfo.koreanName,
      신뢰도: `${result.confidence}%`,
      점수분포: result.scores,
      특성: result.characteristics,
      권장사항: result.recommendations,
      진단일시: timestamp,
    }, null, 2);
    filename = `체질진단결과_${constitutionInfo.koreanName}_${new Date().toISOString().split('T')[0]}.json`;
    mimeType = "application/json";
  } else {
    content = `한의학적 체질 진단 결과

📊 진단 결과: ${constitutionInfo.koreanName}
🎯 신뢰도: ${result.confidence}%
📅 진단 일시: ${timestamp}

📝 설명:
${constitutionInfo.description}

🔍 신체적 특성:
${result.characteristics.map((char, i) => `${i + 1}. ${char}`).join('\n')}

💡 건강 관리 권장사항:
${result.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

📈 점수 분포:
- 태양인: ${isLegacy ? (result as LegacyTestResult).scores.taeyang : (result as TestResult).scores.taeyangin}점
- 태음인: ${isLegacy ? (result as LegacyTestResult).scores.taeeum : (result as TestResult).scores.taeumin}점
- 소양인: ${isLegacy ? (result as LegacyTestResult).scores.soyang : (result as TestResult).scores.soyangin}점
- 소음인: ${isLegacy ? (result as LegacyTestResult).scores.soeum : (result as TestResult).scores.soeumin}점

* 이 진단 결과는 참고용이며, 정확한 체질 판정은 한의사의 진료를 받으시기 바랍니다.`;

    filename = `체질진단결과_${constitutionInfo.koreanName}_${new Date().toISOString().split('T')[0]}.txt`;
    mimeType = "text/plain";
  }

  // 파일 다운로드
  if (typeof window !== "undefined") {
    const blob = new Blob([content], { type: mimeType + ";charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }
}