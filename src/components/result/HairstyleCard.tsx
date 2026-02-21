import type { HairstyleRecommendation } from "@/types/face.types";

interface HairstyleCardProps {
  recommendation: HairstyleRecommendation;
  index: number;
}

const HAIRSTYLE_ICONS = ["✂️", "💇", "🌊"];

export default function HairstyleCard({
  recommendation,
  index,
}: HairstyleCardProps) {
  return (
    <div
      className="bg-canvas-surface rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-canvas-accent/30 flex items-center justify-center text-xl flex-shrink-0">
          {HAIRSTYLE_ICONS[index % HAIRSTYLE_ICONS.length]}
        </div>
        <div>
          <h3 className="font-serif text-canvas-text text-lg leading-tight">
            {recommendation.name}
          </h3>
          <p className="font-sans text-canvas-muted text-xs mt-0.5">
            {recommendation.gender === "female"
              ? "여성 추천"
              : recommendation.gender === "male"
              ? "남성 추천"
              : "공통 추천"}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="font-sans text-canvas-text/80 text-sm leading-relaxed">
        {recommendation.description}
      </p>

      {/* Reason */}
      <div className="bg-canvas-bg rounded-2xl p-4">
        <p className="font-sans text-canvas-primary text-xs font-medium mb-1">
          추천 이유
        </p>
        <p className="font-sans text-canvas-muted text-sm leading-relaxed">
          {recommendation.reason}
        </p>
      </div>

      {/* Avoid tip */}
      {recommendation.avoid && (
        <div className="border-l-2 border-canvas-accent pl-3">
          <p className="font-sans text-canvas-muted text-xs">
            <span className="text-canvas-primary font-medium">주의: </span>
            {recommendation.avoid}
          </p>
        </div>
      )}
    </div>
  );
}
