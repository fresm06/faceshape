"use client";

import { useState } from "react";

interface ShareButtonProps {
  faceShapeKr: string;
  url?: string;
}

export default function ShareButton({ faceShapeKr, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `나의 얼굴형은 "${faceShapeKr}"! 페이스 캔버스에서 내 얼굴형을 진단받고 맞춤 헤어/안경 스타일을 추천받았어요 ✨`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `내 얼굴형은 ${faceShapeKr}!`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-sans text-canvas-muted text-sm">결과 공유하기</p>
      <div className="flex gap-3">
        {/* Copy link */}
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-sans text-sm transition-all duration-200 ${
            copied
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-canvas-surface text-canvas-muted hover:bg-canvas-accent/30 border border-canvas-accent/30"
          }`}
        >
          {copied ? "✓ 복사됨!" : "🔗 링크 복사"}
        </button>

        {/* Twitter/X */}
        <button
          onClick={shareToTwitter}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-canvas-surface text-canvas-muted font-sans text-sm hover:bg-canvas-accent/30 border border-canvas-accent/30 transition-all duration-200"
        >
          𝕏 공유
        </button>

        {/* Native share (mobile) */}
        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={shareNative}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-canvas-primary text-white font-sans text-sm hover:bg-canvas-text transition-all duration-200"
          >
            ↑ 공유
          </button>
        )}
      </div>
    </div>
  );
}
