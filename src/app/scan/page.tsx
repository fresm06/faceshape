import type { Metadata } from "next";
import FaceScannerWrapper from "@/components/scanner/FaceScannerWrapper";

export const metadata: Metadata = {
  title: "AI 얼굴형 진단 - 사진 업로드 또는 카메라 촬영",
  description:
    "사진을 업로드하거나 카메라로 촬영하면 AI가 즉시 얼굴형을 분석합니다. 계란형, 둥근형, 각진형, 긴형, 하트형, 다이아몬드형 중 내 얼굴형을 무료로 진단받으세요.",
};

export default function ScanPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Page header */}
      <div className="max-w-xl mx-auto px-4 mb-10 text-center">
        <p className="font-sans text-canvas-primary text-sm tracking-[0.2em] uppercase mb-3">
          Face Analysis
        </p>
        <h1 className="font-serif text-canvas-text text-4xl mb-4">
          얼굴형 진단하기
        </h1>
        <p className="font-sans text-canvas-muted text-base leading-relaxed">
          정면을 바라보는 사진을 사용하면
          <br />
          더 정확한 결과를 얻을 수 있습니다
        </p>
      </div>

      {/* Tips */}
      <div className="max-w-xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-canvas-primary mx-auto">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ),
              text: "밝은 곳에서 촬영",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-canvas-primary mx-auto">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
                </svg>
              ),
              text: "정면 얼굴",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-canvas-primary mx-auto">
                  <path d="M9 3c0 3-2 5-2 8h10c0-3-2-5-2-8" />
                  <path d="M7 11v2a5 5 0 0010 0v-2" />
                  <path d="M8 17v2M16 17v2" />
                </svg>
              ),
              text: "머리카락 걷어내기",
            },
          ].map((tip) => (
            <div
              key={tip.text}
              className="bg-canvas-surface rounded-2xl px-3 py-4"
            >
              <div className="mb-1.5">{tip.icon}</div>
              <p className="font-sans text-canvas-muted text-xs">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scanner component (client-side only) */}
      <FaceScannerWrapper />
    </div>
  );
}
