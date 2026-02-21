"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { queryParamsToScores } from "@/lib/face-analysis/face-measurements";
import type { FaceScores } from "@/types/face.types";

const FaceProfileChart = dynamic(
  () => import("@/components/result/FaceProfileChart"),
  { ssr: false }
);

interface MeasurementMetric {
  label: string;
  value: string;
  description: string;
}

function getMeasurementMetrics(scores: FaceScores): MeasurementMetric[] {
  return [
    {
      label: "얼굴 길이",
      value: `${Math.round(scores.faceLength)}점`,
      description: scores.faceLength > 60 ? "긴 편" : "짧은 편",
    },
    {
      label: "얼굴 폭",
      value: `${Math.round(scores.faceWidth)}점`,
      description: scores.faceWidth > 60 ? "넓은 편" : "좁은 편",
    },
    {
      label: "턱선 각도",
      value: `${Math.round(scores.jawDefinition)}점`,
      description: scores.jawDefinition > 60 ? "각진 편" : "부드러운 편",
    },
    {
      label: "이마 발달",
      value: `${Math.round(scores.foreheadProminence)}점`,
      description: scores.foreheadProminence > 60 ? "넓은 이마" : "좁은 이마",
    },
    {
      label: "턱 뾰족함",
      value: `${Math.round(scores.chinPointedness)}점`,
      description: scores.chinPointedness > 60 ? "뾰족한 편" : "둥근 편",
    },
  ];
}

function PersonalizedContent({
  shapeColor,
}: {
  shapeColor: string;
}) {
  const searchParams = useSearchParams();
  const isMeasured = searchParams.get("meas") === "true";

  if (!isMeasured) return null;

  const scores = queryParamsToScores(searchParams);

  if (!scores) return null;

  const metrics = getMeasurementMetrics(scores);

  return (
    <div className="mt-16">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-px bg-canvas-accent/30" />
        <p className="font-sans text-canvas-muted text-sm tracking-wider uppercase">
          나의 분석 리포트
        </p>
        <div className="flex-1 h-px bg-canvas-accent/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Radar chart */}
        <div className="bg-canvas-surface rounded-3xl p-6">
          <h3 className="font-serif text-canvas-text text-xl mb-4">
            얼굴 프로필 차트
          </h3>
          <FaceProfileChart scores={scores} color={shapeColor} />
        </div>

        {/* Measurement cards */}
        <div className="flex flex-col gap-3">
          <h3 className="font-serif text-canvas-text text-xl mb-2">
            측정 수치
          </h3>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-canvas-surface rounded-2xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-sans text-canvas-text text-sm font-medium">
                  {metric.label}
                </p>
                <p className="font-sans text-canvas-muted text-xs mt-0.5">
                  {metric.description}
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-serif text-xl font-medium"
                  style={{ color: shapeColor }}
                >
                  {metric.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResultClient({
  shapeColor,
}: {
  shapeColor: string;
}) {
  return (
    <Suspense fallback={null}>
      <PersonalizedContent shapeColor={shapeColor} />
    </Suspense>
  );
}
