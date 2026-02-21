import type { GlassesRecommendation } from "@/types/face.types";

interface GlassesCardProps {
  recommendation: GlassesRecommendation;
  index: number;
}

const GLASSES_SHAPES = [
  // Oval
  <svg key="oval" viewBox="0 0 80 40" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
    <ellipse cx="40" cy="20" rx="32" ry="14" />
    <line x1="0" y1="20" x2="8" y2="20" />
    <line x1="72" y1="20" x2="80" y2="20" />
  </svg>,
  // Rectangle
  <svg key="rect" viewBox="0 0 90 40" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
    <rect x="5" y="8" width="35" height="24" rx="4" />
    <rect x="50" y="8" width="35" height="24" rx="4" />
    <line x1="40" y1="20" x2="50" y2="20" />
    <line x1="0" y1="20" x2="5" y2="20" />
    <line x1="85" y1="20" x2="90" y2="20" />
  </svg>,
  // Round
  <svg key="round" viewBox="0 0 90 40" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
    <circle cx="22" cy="20" r="16" />
    <circle cx="68" cy="20" r="16" />
    <line x1="38" y1="20" x2="52" y2="20" />
    <line x1="0" y1="20" x2="6" y2="20" />
    <line x1="84" y1="20" x2="90" y2="20" />
  </svg>,
];

export default function GlassesCard({
  recommendation,
  index,
}: GlassesCardProps) {
  return (
    <div className="bg-canvas-surface rounded-3xl p-6 flex flex-col gap-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Glasses illustration */}
      <div className="h-16 flex items-center justify-center text-canvas-primary opacity-70">
        {GLASSES_SHAPES[index % GLASSES_SHAPES.length]}
      </div>

      {/* Divider */}
      <div className="h-px bg-canvas-accent/30" />

      {/* Content */}
      <div>
        <h3 className="font-serif text-canvas-text text-lg mb-2">
          {recommendation.type}
        </h3>
        <p className="font-sans text-canvas-muted text-sm leading-relaxed">
          {recommendation.description}
        </p>
      </div>

      {/* Reason */}
      <div className="bg-canvas-bg rounded-2xl p-3">
        <p className="font-sans text-canvas-muted text-sm leading-relaxed">
          {recommendation.reason}
        </p>
      </div>

      {/* Shop link */}
      {recommendation.shopLink && recommendation.shopLink !== "#" && (
        <a
          href={recommendation.shopLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto py-3 rounded-2xl border border-canvas-primary text-canvas-primary font-sans text-sm text-center hover:bg-canvas-primary hover:text-white transition-all duration-200"
        >
          쇼핑몰 바로가기 →
        </a>
      )}
    </div>
  );
}
