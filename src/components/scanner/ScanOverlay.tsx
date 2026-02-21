"use client";

interface ScanOverlayProps {
  isVisible: boolean;
  stage: "scanning" | "analyzing" | "complete";
}

export default function ScanOverlay({ isVisible, stage }: ScanOverlayProps) {
  if (!isVisible) return null;

  const stageText = {
    scanning: "얼굴을 인식하는 중...",
    analyzing: "얼굴형을 분석하는 중...",
    complete: "분석 완료!",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas-text/80 backdrop-blur-sm">
      {/* Scanner frame */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Main scanner circle */}
        <div className="relative">
          {/* Outer pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-canvas-accent/40 animate-pulse-ring scale-110" />

          {/* Scanner circle container */}
          <div
            className="relative rounded-full overflow-hidden border border-canvas-accent/60"
            style={{ width: 280, height: 340 }}
          >
            {/* Face guide silhouette */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <svg viewBox="0 0 100 120" className="w-48 h-48 fill-canvas-accent">
                <ellipse cx="50" cy="55" rx="32" ry="45" />
              </svg>
            </div>

            {/* Scan line animation */}
            {stage === "scanning" && (
              <div
                className="absolute left-0 right-0 h-0.5 animate-scan"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #A77E70 20%, #D3BBA8 50%, #A77E70 80%, transparent 100%)",
                  boxShadow: "0 0 12px 3px rgba(167, 126, 112, 0.6)",
                }}
              />
            )}

            {/* Corner brackets */}
            {[
              "top-2 left-2 border-t-2 border-l-2 rounded-tl",
              "top-2 right-2 border-t-2 border-r-2 rounded-tr",
              "bottom-2 left-2 border-b-2 border-l-2 rounded-bl",
              "bottom-2 right-2 border-b-2 border-r-2 rounded-br",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 border-canvas-primary ${cls}`}
              />
            ))}

            {/* Landmark dots (decorative) */}
            {stage === "analyzing" && (
              <div className="absolute inset-0">
                {[
                  { top: "20%", left: "30%" },
                  { top: "20%", left: "70%" },
                  { top: "35%", left: "22%" },
                  { top: "35%", left: "78%" },
                  { top: "48%", left: "35%" },
                  { top: "48%", left: "65%" },
                  { top: "48%", left: "50%" },
                  { top: "60%", left: "50%" },
                  { top: "72%", left: "40%" },
                  { top: "72%", left: "60%" },
                  { top: "82%", left: "50%" },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-canvas-primary"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${i * 0.08}s`,
                      animation: "pulse 1.2s ease-in-out infinite",
                      opacity: 0.8,
                    }}
                  />
                ))}
                {/* Connecting lines (simplified) */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  style={{ strokeDasharray: "3 3" }}
                >
                  <line
                    x1="30%"
                    y1="20%"
                    x2="70%"
                    y2="20%"
                    stroke="#A77E70"
                    strokeWidth="1"
                  />
                  <line
                    x1="30%"
                    y1="20%"
                    x2="22%"
                    y2="35%"
                    stroke="#A77E70"
                    strokeWidth="1"
                  />
                  <line
                    x1="70%"
                    y1="20%"
                    x2="78%"
                    y2="35%"
                    stroke="#A77E70"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Progress indicator dots */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {["scanning", "analyzing", "complete"].map((s) => (
              <div
                key={s}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  s === stage
                    ? "bg-canvas-primary scale-125"
                    : "bg-canvas-accent/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Status text */}
        <div className="text-center mt-4">
          <p className="font-serif text-canvas-surface text-xl tracking-wide">
            {stageText[stage]}
          </p>
          <p className="font-sans text-canvas-accent/70 text-sm mt-2">
            이미지는 서버로 전송되지 않습니다
          </p>
        </div>

        {/* Loading dots */}
        {stage !== "complete" && (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-canvas-accent/60"
                style={{
                  animation: "pulse 1.4s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
