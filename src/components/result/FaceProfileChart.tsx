"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { FaceScores } from "@/types/face.types";

interface FaceProfileChartProps {
  scores: FaceScores;
  color?: string;
}

const AXIS_LABELS: Record<keyof FaceScores, string> = {
  faceLength: "얼굴 길이",
  faceWidth: "얼굴 폭",
  jawDefinition: "턱선 각도",
  foreheadProminence: "이마 발달",
  chinPointedness: "턱 뾰족함",
};

export default function FaceProfileChart({
  scores,
  color = "#A77E70",
}: FaceProfileChartProps) {
  const data = (Object.keys(scores) as Array<keyof FaceScores>).map((key) => ({
    subject: AXIS_LABELS[key],
    value: Math.round(scores[key]),
    fullMark: 100,
  }));

  return (
    <div className="w-full" style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid
            gridType="polygon"
            stroke="#D3BBA8"
            strokeOpacity={0.5}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#4F3B43",
              fontSize: 12,
              fontFamily: "Pretendard, sans-serif",
            }}
          />
          <Radar
            name="얼굴 프로필"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FDFBF7",
              border: "1px solid #D3BBA8",
              borderRadius: "12px",
              fontFamily: "Pretendard, sans-serif",
              color: "#4F3B43",
            }}
            formatter={(value: number) => [`${value}점`, "측정값"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
