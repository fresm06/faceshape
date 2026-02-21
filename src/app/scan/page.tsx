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
            { icon: "🌟", text: "밝은 곳에서 촬영" },
            { icon: "👤", text: "정면 얼굴" },
            { icon: "📐", text: "머리카락 걷어내기" },
          ].map((tip) => (
            <div
              key={tip.text}
              className="bg-canvas-surface rounded-2xl px-3 py-4"
            >
              <div className="text-2xl mb-1.5">{tip.icon}</div>
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
