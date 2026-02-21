import Link from "next/link";
import JsonLd from "@/components/common/JsonLd";

// 각 얼굴형 SVG: 머리 윤곽 + 귀 + 눈 요소
const faceShapes = [
  {
    id: "oval",
    nameKr: "계란형",
    tagline: "균형과 조화의 황금 비율",
    color: "#C8A882",
    // 계란형: 이마~광대 완만히 넓어졌다가 턱으로 자연스럽게 좁아짐
    head: "M50,6 C30,6 15,20 15,48 C15,76 28,106 50,112 C72,106 85,76 85,48 C85,20 70,6 50,6 Z",
    earL: "M15,50 C10,50 8,55 8,62 C8,69 10,74 15,74",
    earR: "M85,50 C90,50 92,55 92,62 C92,69 90,74 85,74",
    eyeLX: 35, eyeRX: 65, eyeY: 48,
  },
  {
    id: "round",
    nameKr: "둥근형",
    tagline: "사랑스럽고 생기 넘치는 매력",
    color: "#E8B4A0",
    // 둥근형: 폭과 높이 비율이 거의 같은 원형에 가까운 윤곽
    head: "M50,8 C28,8 10,24 10,55 C10,86 26,108 50,108 C74,108 90,86 90,55 C90,24 72,8 50,8 Z",
    earL: "M10,55 C5,55 3,61 3,68 C3,75 5,80 10,80",
    earR: "M90,55 C95,55 97,61 97,68 C97,75 95,80 90,80",
    eyeLX: 34, eyeRX: 66, eyeY: 55,
  },
  {
    id: "square",
    nameKr: "각진형",
    tagline: "강인하고 세련된 카리스마",
    color: "#9B8B7A",
    // 각진형: 이마 위 모서리 완만히 다듬고, 측면 직선, 턱 각도 뚜렷
    head: "M20,14 Q20,6 50,6 Q80,6 80,14 L80,72 Q80,80 74,92 Q62,108 50,108 Q38,108 26,92 Q20,80 20,72 Z",
    earL: "M18,52 C13,52 11,58 11,65 C11,72 13,78 18,78",
    earR: "M82,52 C87,52 89,58 89,65 C89,72 87,78 82,78",
    eyeLX: 35, eyeRX: 65, eyeY: 46,
  },
  {
    id: "oblong",
    nameKr: "긴형",
    tagline: "우아하고 지적인 세련미",
    color: "#B8A090",
    // 긴형: 적당히 길고 조금 넓어진 타원형 윤곽
    head: "M50,12 C37,12 22,22 22,38 L22,82 C22,102 37,112 50,112 C63,112 78,102 78,82 L78,38 C78,22 63,12 50,12 Z",
    earL: "M22,58 C17,58 15,64 15,70 C15,76 17,82 22,82",
    earR: "M78,58 C83,58 85,64 85,70 C85,76 83,82 78,82",
    eyeLX: 37, eyeRX: 63, eyeY: 52,
  },
  {
    id: "heart",
    nameKr: "하트형",
    tagline: "사랑스럽고 요정 같은 입체미",
    color: "#D4A0A0",
    // 하트형: 이마/광대가 넓고 아래로 갈수록 좁아져 뾰족한 턱으로 마무리
    head: "M50,112 C38,96 14,76 10,52 C6,28 18,10 32,8 C40,6 46,10 50,22 C54,10 60,6 68,8 C82,10 94,28 90,52 C86,76 62,96 50,112 Z",
    earL: "M10,52 C5,52 3,57 3,64 C3,71 5,76 10,76",
    earR: "M90,52 C95,52 97,57 97,64 C97,71 95,76 90,76",
    eyeLX: 33, eyeRX: 67, eyeY: 54,
  },
  {
    id: "diamond",
    nameKr: "다이아몬드형",
    tagline: "날카롭고 신비로운 고급스러움",
    color: "#8B9CB0",
    // 다이아몬드형: 광대가 가장 넓고 이마/턱이 좁은 마름모형 윤곽
    head: "M50,6 C58,6 66,14 74,32 C84,52 84,70 76,90 C68,108 60,116 50,116 C40,116 32,108 24,90 C16,70 16,52 26,32 C34,14 42,6 50,6 Z",
    earL: "M16,60 C11,60 9,66 9,72 C9,78 11,84 16,84",
    earR: "M84,60 C89,60 91,66 91,72 C91,78 89,84 84,84",
    eyeLX: 36, eyeRX: 64, eyeY: 54,
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
                <path d={shape.head} fill={shape.color} />
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

          {/* Right: Face shape showcase grid */}
          <div className="hidden lg:grid grid-cols-3 gap-4 items-start">
            {faceShapes.map((shape, i) => (
              <Link
                key={shape.id}
                href={`/result/${shape.id}`}
                className="group flex flex-col items-center gap-2 bg-canvas-surface/60 rounded-2xl p-4 hover:bg-canvas-surface hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <svg viewBox="0 0 100 125" className="w-16 h-20 group-hover:scale-105 transition-transform duration-300">
                  <path d={shape.head} fill={shape.color} opacity="0.75" />
                </svg>
                <p className="font-sans text-canvas-text text-xs text-center">{shape.nameKr}</p>
              </Link>
            ))}
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
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-canvas-primary">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <circle cx="12" cy="14" r="3" />
                    <path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7" />
                  </svg>
                ),
                title: "사진 업로드",
                desc: "정면 얼굴 사진을 업로드하거나 카메라로 직접 촬영하세요. 이미지는 브라우저를 벗어나지 않습니다.",
              },
              {
                step: "02",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-canvas-primary">
                    <circle cx="12" cy="10" r="6" />
                    <path d="M9 10h.01M12 10h.01M15 10h.01" />
                    <path d="M6 17l-2 4M18 17l2 4" />
                    <path d="M9 16.5c0 1.5 1.343 2.5 3 2.5s3-1 3-2.5" />
                  </svg>
                ),
                title: "AI 랜드마크 분석",
                desc: "MediaPipe AI가 468개의 얼굴 랜드마크를 추출하여 광대폭, 이마, 턱선 등을 정밀 측정합니다.",
              },
              {
                step: "03",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-canvas-primary">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                  </svg>
                ),
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
                <div className="mb-5">{item.icon}</div>
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
                    <path d={shape.head} fill={shape.color} opacity="0.7" />
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
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-canvas-accent">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>
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
