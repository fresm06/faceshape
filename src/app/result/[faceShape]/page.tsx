import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/common/JsonLd";
import HairstyleCard from "@/components/result/HairstyleCard";
import GlassesCard from "@/components/result/GlassesCard";
import ShareButton from "@/components/result/ShareButton";
import ResultClient from "./ResultClient";
import { faceShapeData, faceShapeOrder } from "@/lib/data/face-shape-data";
import { hairstyleData } from "@/lib/data/hairstyle-data";
import { glassesData } from "@/lib/data/glasses-data";
import type { FaceShape } from "@/types/face.types";

interface ResultPageProps {
  params: Promise<{ faceShape: string }>;
}

// ─── SEO metadata per face shape ──────────────────────
const META_DATA: Record<
  string,
  { title: string; description: string }
> = {
  oval: {
    title: "계란형(Oval) 얼굴형 완벽 가이드 - 어울리는 헤어/안경 추천",
    description:
      "계란형 얼굴형의 특징과 가장 잘 어울리는 헤어스타일, 안경테를 전문가 수준으로 분석합니다. 레이어드 컷, 투블럭, 내추럴 웨이브 추천.",
  },
  round: {
    title: "둥근형(Round) 얼굴형 완벽 가이드 - 갸름해 보이는 스타일링",
    description:
      "둥근형 얼굴형의 매력과 갸름해 보이는 헤어스타일, 각진 안경 프레임 추천. 높은 포니테일, 긴 레이어드 컷, 직사각형 프레임 가이드.",
  },
  square: {
    title: "각진형(Square) 얼굴형 완벽 가이드 - 부드러운 스타일링 팁",
    description:
      "각진형 얼굴형의 강인한 매력을 살리는 헤어스타일과 안경테 추천. 사이드 뱅, 웨이브 펌, 오벌 프레임으로 여성스럽게 연출.",
  },
  oblong: {
    title: "긴형(Oblong) 얼굴형 완벽 가이드 - 균형 잡는 스타일링",
    description:
      "긴형 얼굴형의 우아한 매력과 균형을 잡아주는 헤어스타일, 와이드 안경 프레임 추천. 단발 밥, 볼드한 뱅, 오버사이즈 프레임 가이드.",
  },
  heart: {
    title: "하트형(Heart) 얼굴형 완벽 가이드 - 요정 같은 스타일링",
    description:
      "하트형 얼굴형의 사랑스러운 매력과 이마-턱 비율을 균형 잡는 스타일링 팁. 시스루 뱅, 허쉬 컷, 하단 강조 안경 프레임 추천.",
  },
  diamond: {
    title: "다이아몬드형(Diamond) 얼굴형 완벽 가이드 - 희귀한 얼굴형의 스타일링",
    description:
      "가장 희귀한 다이아몬드형 얼굴형의 신비로운 매력과 광대 비율을 보완하는 스타일링. 사이드 뱅, 와이드 업두, 오벌 안경 추천.",
  },
};

const FACE_SVG_PATHS: Record<string, string> = {
  oval: "M50,10 Q80,10 80,60 Q80,110 50,115 Q20,110 20,60 Q20,10 50,10 Z",
  round: "M50,12 Q88,12 88,58 Q88,104 50,104 Q12,104 12,58 Q12,12 50,12 Z",
  square:
    "M22,12 Q22,8 28,8 L72,8 Q78,8 78,12 L78,88 Q78,112 60,115 L50,118 L40,115 Q22,112 22,88 Z",
  oblong:
    "M38,5 Q38,3 50,3 Q62,3 62,5 L62,100 Q62,118 50,120 Q38,118 38,100 Z",
  heart:
    "M50,118 Q12,88 10,50 Q8,15 28,8 Q40,5 50,20 Q60,5 72,8 Q92,15 90,50 Q88,88 50,118 Z",
  diamond:
    "M50,8 Q63,10 78,48 Q86,65 78,82 Q64,112 50,118 Q36,112 22,82 Q14,65 22,48 Q37,10 50,8 Z",
};

// ─── Static params generation ──────────────────────────
export async function generateStaticParams() {
  return faceShapeOrder.map((shape) => ({ faceShape: shape }));
}

// ─── Dynamic metadata ──────────────────────────────────
export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { faceShape } = await params;
  const meta = META_DATA[faceShape];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
    },
    alternates: {
      canonical: `/result/${faceShape}`,
    },
  };
}

// ─── Page Component ────────────────────────────────────
export default async function ResultPage({ params }: ResultPageProps) {
  const { faceShape } = await params;

  if (!faceShapeOrder.includes(faceShape)) {
    notFound();
  }

  const shapeData = faceShapeData[faceShape as FaceShape];
  const hairstyles = hairstyleData[faceShape] ?? [];
  const glasses = glassesData[faceShape];
  const recommended = Array.isArray(glasses)
    ? glasses.slice(0, 3)
    : glasses?.recommended ?? [];
  const avoid = Array.isArray(glasses) ? [] : glasses?.avoid ?? [];
  const svgPath = FACE_SVG_PATHS[faceShape];

  // JSON-LD schemas
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "페이스 캔버스 AI 얼굴형 진단기",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    description:
      "AI가 얼굴 랜드마크를 분석하여 6가지 얼굴형을 진단하고 맞춤 헤어/안경을 추천합니다.",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: META_DATA[faceShape]?.title,
    description: META_DATA[faceShape]?.description,
    author: {
      "@type": "Organization",
      name: "페이스 캔버스 뷰티팀",
    },
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={articleSchema} />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* ─── Face shape header ─────────────────────── */}
        <div className="text-center mb-16">
          {/* Label */}
          <p className="font-sans text-canvas-muted text-sm tracking-[0.2em] uppercase mb-6">
            당신의 얼굴형은
          </p>

          {/* Face shape SVG */}
          <div className="flex justify-center mb-8">
            <div
              className="relative animate-float"
              style={{ width: 160, height: 200 }}
            >
              <svg
                viewBox="0 0 100 125"
                className="w-full h-full face-shape-svg"
              >
                <defs>
                  <linearGradient
                    id={`grad-${faceShape}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={shapeData.color}
                      stopOpacity="0.5"
                    />
                    <stop
                      offset="100%"
                      stopColor={shapeData.color}
                      stopOpacity="0.9"
                    />
                  </linearGradient>
                </defs>
                <path
                  d={svgPath}
                  fill={`url(#grad-${faceShape})`}
                />
              </svg>
            </div>
          </div>

          {/* Shape name */}
          <h1 className="font-serif text-canvas-text mb-3">
            <span
              className="block text-5xl md:text-6xl font-medium"
              style={{ color: shapeData.color }}
            >
              {shapeData.nameKr}
            </span>
            <span className="block text-2xl text-canvas-muted font-light mt-1">
              {shapeData.nameEn}
            </span>
          </h1>

          {/* Tagline */}
          <p className="font-sans text-canvas-muted text-lg mt-4 max-w-md mx-auto">
            {shapeData.tagline}
          </p>

          {/* Characteristics pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {shapeData.characteristics.map((c) => (
              <span
                key={c}
                className="font-sans text-xs px-4 py-1.5 rounded-full bg-canvas-surface text-canvas-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Personalized analysis (client) ────────── */}
        <ResultClient shapeColor={shapeData.color} />

        {/* ─── Description article (SEO) ─────────────── */}
        <article className="mt-16 prose max-w-none">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-canvas-accent/30" />
            <p className="font-sans text-canvas-muted text-sm tracking-wider uppercase">
              {shapeData.nameKr} 얼굴형 가이드
            </p>
            <div className="flex-1 h-px bg-canvas-accent/30" />
          </div>

          <div className="bg-canvas-surface rounded-3xl p-8 md:p-12">
            <div className="font-sans text-canvas-text/80 text-base leading-loose whitespace-pre-line">
              {shapeData.longDescription}
            </div>

            {/* Celebrities */}
            {shapeData.celebrities.length > 0 && (
              <div className="mt-8 pt-6 border-t border-canvas-accent/30">
                <p className="font-sans text-canvas-muted text-sm mb-3">
                  {shapeData.nameKr} 얼굴형의 유명인
                </p>
                <div className="flex flex-wrap gap-2">
                  {shapeData.celebrities.map((celeb) => (
                    <span
                      key={celeb}
                      className="font-sans text-sm px-4 py-1.5 rounded-full border border-canvas-accent text-canvas-muted"
                    >
                      {celeb}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* ─── Hairstyle recommendations ──────────────── */}
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-canvas-accent/30" />
            <p className="font-sans text-canvas-muted text-sm tracking-wider uppercase">
              헤어스타일 추천
            </p>
            <div className="flex-1 h-px bg-canvas-accent/30" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-serif text-canvas-text text-3xl mb-2">
              찰떡 헤어스타일 BEST
            </h2>
            <p className="font-sans text-canvas-muted text-sm">
              {shapeData.nameKr} 얼굴형에 가장 잘 어울리는 헤어스타일을
              소개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hairstyles.slice(0, 6).map((h, i) => (
              <HairstyleCard key={h.id} recommendation={h} index={i} />
            ))}
          </div>
        </section>

        {/* ─── Glasses recommendations ────────────────── */}
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-canvas-accent/30" />
            <p className="font-sans text-canvas-muted text-sm tracking-wider uppercase">
              안경 추천
            </p>
            <div className="flex-1 h-px bg-canvas-accent/30" />
          </div>

          <div className="text-center mb-8">
            <h2 className="font-serif text-canvas-text text-3xl mb-2">
              어울리는 안경 프레임
            </h2>
            <p className="font-sans text-canvas-muted text-sm">
              {shapeData.nameKr} 얼굴형에 최적화된 안경 프레임 스타일
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommended.slice(0, 3).map((g, i) => (
              <GlassesCard key={g.id} recommendation={g} index={i} />
            ))}
          </div>

          {/* Avoid list */}
          {avoid.length > 0 && (
            <div className="mt-6 bg-canvas-surface/60 rounded-2xl p-5">
              <p className="font-sans text-canvas-muted text-sm font-medium mb-2">
                피하면 좋은 프레임
              </p>
              {avoid.map((item) => (
                <p
                  key={item}
                  className="font-sans text-canvas-muted text-sm flex items-start gap-2 mt-1"
                >
                  <span className="text-canvas-primary mt-0.5">✕</span>
                  {item}
                </p>
              ))}
            </div>
          )}
        </section>

        {/* ─── Share & CTA ────────────────────────────── */}
        <div className="mt-20 text-center space-y-8">
          {/* Share */}
          <ShareButton faceShapeKr={shapeData.nameKr} />

          {/* Divider */}
          <div className="h-px bg-canvas-accent/20" />

          {/* Re-diagnose */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scan"
              className="inline-flex items-center justify-center gap-2 bg-canvas-primary text-white px-8 py-4 rounded-2xl font-sans text-base hover:bg-canvas-text transition-all duration-200"
            >
              다시 진단하기 →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-canvas-surface text-canvas-muted px-8 py-4 rounded-2xl font-sans text-base hover:bg-canvas-accent/30 transition-all duration-200 border border-canvas-accent/30"
            >
              다른 얼굴형 보기
            </Link>
          </div>

          {/* Other shapes */}
          <div className="flex flex-wrap justify-center gap-3">
            {faceShapeOrder
              .filter((s) => s !== faceShape)
              .map((s) => (
                <Link
                  key={s}
                  href={`/result/${s}`}
                  className="font-sans text-sm text-canvas-muted hover:text-canvas-primary px-4 py-2 rounded-full hover:bg-canvas-surface transition-all duration-200"
                >
                  {faceShapeData[s].nameKr} →
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
