import Link from "next/link";
import JsonLd from "@/components/common/JsonLd";

const faceShapes = [
  {
    id: "oval",
    nameKr: "계란형",
    emoji: "🥚",
    tagline: "균형과 조화의 황금 비율",
    svgPath: "M50,10 Q80,10 80,60 Q80,110 50,115 Q20,110 20,60 Q20,10 50,10 Z",
    color: "#C8A882",
  },
  {
    id: "round",
    nameKr: "둥근형",
    emoji: "🌕",
    tagline: "사랑스럽고 생기 넘치는 매력",
    svgPath: "M50,12 Q88,12 88,58 Q88,104 50,104 Q12,104 12,58 Q12,12 50,12 Z",
    color: "#E8B4A0",
  },
  {
    id: "square",
    nameKr: "각진형",
    emoji: "⬜",
    tagline: "강인하고 세련된 카리스마",
    svgPath:
      "M22,12 Q22,8 28,8 L72,8 Q78,8 78,12 L78,88 Q78,112 60,115 L50,118 L40,115 Q22,112 22,88 Z",
    color: "#9B8B7A",
  },
  {
    id: "oblong",
    nameKr: "긴형",
    emoji: "🪞",
    tagline: "우아하고 지적인 세련미",
    svgPath:
      "M38,5 Q38,3 50,3 Q62,3 62,5 L62,100 Q62,118 50,120 Q38,118 38,100 Z",
    color: "#B8A090",
  },
  {
    id: "heart",
    nameKr: "하트형",
    emoji: "💝",
    tagline: "사랑스럽고 요정 같은 입체미",
    svgPath:
      "M50,118 Q12,88 10,50 Q8,15 28,8 Q40,5 50,20 Q60,5 72,8 Q92,15 90,50 Q88,88 50,118 Z",
    color: "#D4A0A0",
  },
  {
    id: "diamond",
    nameKr: "다이아몬드형",
    emoji: "💎",
    tagline: "날카롭고 신비로운 고급스러움",
    svgPath:
      "M50,8 Q63,10 78,48 Q86,65 78,82 Q64,112 50,118 Q36,112 22,82 Q14,65 22,48 Q37,10 50,8 Z",
    color: "#8B9CB0",
  },
];

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "페이스 캔버스 AI 얼굴형 진단기",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  description:
    "AI가 얼굴 랜드마크를 분석하여 계란형, 둥근형, 각진형, 긴형, 하트형, 다이아몬드형 중 내 얼굴형을 진단하고 맞춤 헤어/안경을 추천합니다.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareAppSchema} />

      {/* ─── Hero Section ──────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {faceShapes.map((shape, i) => (
            <div
              key={shape.id}
              className={`absolute opacity-5 animate-float${i % 2 === 0 ? "" : "-slow"}`}
              style={{
                top: `${10 + i * 14}%`,
                right: `${-2 + (i % 3) * 8}%`,
                width: `${80 + i * 12}px`,
                height: `${100 + i * 12}px`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              <svg viewBox="0 0 100 125" className="w-full h-full">
                <path d={shape.svgPath} fill={shape.color} />
              </svg>
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-canvas-surface px-4 py-2 rounded-full mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-canvas-primary animate-pulse" />
              <span className="font-sans text-canvas-muted text-sm">
                AI 기반 무료 얼굴형 진단
              </span>
            </div>

            {/* Main headline */}
            <h1 className="font-serif text-canvas-text leading-tight mb-6 animate-slide-up">
              <span className="block text-5xl lg:text-7xl font-light">나의</span>
              <span className="block text-5xl lg:text-7xl font-medium">얼굴형을</span>
              <span className="block text-5xl lg:text-7xl text-canvas-primary">
                발견하세요
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-canvas-muted text-lg leading-relaxed mb-10 max-w-md animate-slide-up-delay">
              AI가 5초 만에 당신의 얼굴형을 정밀 분석하고
              <br />
              꼭 맞는 헤어스타일과 안경 프레임을 추천해드립니다.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-delay2">
              <Link
                href="/scan"
                className="inline-flex items-center justify-center gap-3 bg-canvas-primary text-white px-8 py-5 rounded-2xl font-serif text-lg hover:bg-canvas-text transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>얼굴형 진단 시작하기</span>
                <span>→</span>
              </Link>
              <Link
                href="#shapes"
                className="inline-flex items-center justify-center gap-2 bg-canvas-surface text-canvas-muted px-8 py-5 rounded-2xl font-sans text-base hover:bg-canvas-accent/30 transition-all duration-200"
              >
                얼굴형 둘러보기
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 animate-slide-up-delay2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-canvas-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd"/>
                </svg>
                <span className="font-sans text-canvas-muted text-sm">프라이버시 보호</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-canvas-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="font-sans text-canvas-muted text-sm">5초 즉시 분석</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-canvas-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-sans text-canvas-muted text-sm">무료</span>
              </div>
            </div>
          </div>

          {/* Right: Face shape showcase */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div className="relative w-80 h-96">
              {/* Central featured shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 125" className="w-48 h-56 face-shape-svg animate-float">
                  <defs>
                    <linearGradient id="ovalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D3BBA8" />
                      <stop offset="100%" stopColor="#A77E70" />
                    </linearGradient>
                  </defs>
                  <path d="M50,10 Q80,10 80,60 Q80,110 50,115 Q20,110 20,60 Q20,10 50,10 Z" fill="url(#ovalGrad)" opacity="0.7"/>
                </svg>
              </div>

              {/* Orbiting shape pills */}
              {faceShapes.slice(0, 5).map((shape, i) => {
                const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
                const r = 155;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <Link
                    key={shape.id}
                    href={`/result/${shape.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-canvas-bg/90 backdrop-blur-sm border border-canvas-accent/30 px-3 py-2 rounded-full font-sans text-xs text-canvas-muted hover:text-canvas-primary hover:border-canvas-primary transition-all duration-200 whitespace-nowrap shadow-sm"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {shape.emoji} {shape.nameKr}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
          <span className="font-sans text-canvas-muted text-xs">스크롤</span>
          <div className="w-px h-8 bg-canvas-accent/40" />
        </div>
      </section>

      {/* ─── How it works ──────────────────────────────── */}
      <section className="py-24 px-6 bg-canvas-surface/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-canvas-primary text-sm tracking-[0.2em] uppercase mb-3">
              How it works
            </p>
            <h2 className="font-serif text-canvas-text text-4xl">
              3단계로 완성되는
              <br />
              나만의 스타일 처방전
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "📸",
                title: "사진 업로드",
                desc: "정면 얼굴 사진을 업로드하거나 카메라로 직접 촬영하세요. 이미지는 브라우저를 벗어나지 않습니다.",
              },
              {
                step: "02",
                icon: "🔬",
                title: "AI 랜드마크 분석",
                desc: "MediaPipe AI가 468개의 얼굴 랜드마크를 추출하여 광대폭, 이마, 턱선 등을 정밀 측정합니다.",
              },
              {
                step: "03",
                icon: "✨",
                title: "맞춤 스타일 추천",
                desc: "분석된 얼굴형에 최적화된 헤어스타일 BEST 3와 어울리는 안경 프레임을 추천해드립니다.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-canvas-bg rounded-3xl p-8 relative overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                <div className="absolute top-4 right-6 font-serif text-6xl text-canvas-accent/15 group-hover:text-canvas-accent/25 transition-colors duration-300">
                  {item.step}
                </div>
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-serif text-canvas-text text-xl mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-canvas-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Face shapes gallery ───────────────────────── */}
      <section id="shapes" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-canvas-primary text-sm tracking-[0.2em] uppercase mb-3">
              Face Types
            </p>
            <h2 className="font-serif text-canvas-text text-4xl mb-4">
              6가지 얼굴형
            </h2>
            <p className="font-sans text-canvas-muted text-base max-w-md mx-auto">
              어떤 얼굴형이 당신과 닮았나요?
              <br />
              각 얼굴형을 클릭하면 스타일 가이드를 확인할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {faceShapes.map((shape) => (
              <Link
                key={shape.id}
                href={`/result/${shape.id}`}
                className="group bg-canvas-surface rounded-3xl p-6 flex flex-col items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Face shape SVG */}
                <div className="w-24 h-28 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 125"
                    className="w-full h-full face-shape-svg group-hover:scale-105 transition-transform duration-300"
                  >
                    <path
                      d={shape.svgPath}
                      fill={shape.color}
                      opacity="0.7"
                    />
                  </svg>
                </div>

                {/* Info */}
                <div className="text-center">
                  <p className="font-serif text-canvas-text text-lg mb-1">
                    {shape.nameKr}
                  </p>
                  <p className="font-sans text-canvas-muted text-xs">
                    {shape.tagline}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-auto w-full flex items-center justify-center gap-1 text-canvas-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="font-sans text-xs">자세히 보기</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Privacy guarantee ─────────────────────────── */}
      <section className="py-16 px-6 bg-canvas-text mx-6 rounded-3xl mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-5">🔒</div>
          <h2 className="font-serif text-canvas-bg text-3xl mb-4">
            100% 프라이버시 보장
          </h2>
          <p className="font-sans text-canvas-accent text-base leading-relaxed max-w-lg mx-auto mb-8">
            모든 얼굴 분석은 <strong className="text-canvas-surface">브라우저 내에서만</strong> 처리됩니다.
            이미지는 서버로 전송되지 않으며, 분석이 완료되는 즉시 메모리에서 삭제됩니다.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 bg-canvas-primary text-white px-8 py-4 rounded-2xl font-sans text-base hover:bg-canvas-accent hover:text-canvas-text transition-all duration-200"
          >
            안전하게 진단받기 →
          </Link>
        </div>
      </section>
    </>
  );
}
