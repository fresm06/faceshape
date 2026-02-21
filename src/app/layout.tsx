import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "무료 AI 얼굴형 진단 테스트 - 내 얼굴형에 맞는 헤어/안경 추천 | 페이스 캔버스",
    template: "%s | 페이스 캔버스",
  },
  description:
    "AI가 5초 만에 내 얼굴형을 분석합니다. 계란형, 둥근형, 각진형, 하트형, 다이아몬드형, 긴형 얼굴에 딱 맞는 헤어스타일과 안경테를 무료로 추천받으세요.",
  keywords: [
    "얼굴형 진단",
    "AI 얼굴형",
    "얼굴형 테스트",
    "헤어스타일 추천",
    "안경 추천",
    "계란형 얼굴",
    "둥근형 얼굴",
    "각진형 얼굴",
    "하트형 얼굴",
    "다이아몬드형 얼굴",
    "긴형 얼굴",
  ],
  authors: [{ name: "페이스 캔버스" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "페이스 캔버스",
    title: "무료 AI 얼굴형 진단 테스트 | 페이스 캔버스",
    description:
      "AI가 내 얼굴형을 분석하고 맞춤 헤어/안경 스타일을 추천해드립니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
        />
      </head>
      <body className="grain-overlay min-h-screen bg-canvas-bg">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-canvas-bg/80 backdrop-blur-md border-b border-canvas-accent/20">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" className="font-serif text-canvas-text text-xl tracking-widest">
              FACE CANVAS
            </a>
            <a
              href="/scan"
              className="font-sans text-sm bg-canvas-primary text-white px-5 py-2.5 rounded-full hover:bg-canvas-text transition-colors duration-200"
            >
              진단 시작
            </a>
          </div>
        </nav>

        {/* Main content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="mt-24 border-t border-canvas-accent/20 bg-canvas-surface/30">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <p className="font-serif text-canvas-text text-lg tracking-widest mb-2">
                  FACE CANVAS
                </p>
                <p className="font-sans text-canvas-muted text-sm max-w-xs leading-relaxed">
                  AI가 분석하는 퍼스널 뷰티 컨설팅.
                  <br />
                  당신만의 얼굴형을 발견하세요.
                </p>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="font-sans text-canvas-text text-sm font-medium mb-3">
                    얼굴형 가이드
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      ["계란형", "/result/oval"],
                      ["둥근형", "/result/round"],
                      ["각진형", "/result/square"],
                      ["긴형", "/result/oblong"],
                      ["하트형", "/result/heart"],
                      ["다이아몬드형", "/result/diamond"],
                    ].map(([name, href]) => (
                      <a
                        key={href}
                        href={href}
                        className="font-sans text-canvas-muted text-sm hover:text-canvas-primary transition-colors"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-canvas-accent/20">
              <p className="font-sans text-canvas-muted text-xs text-center">
                © 2025 Face Canvas. 모든 분석은 브라우저에서만 처리됩니다.
                이미지는 서버로 전송되지 않습니다.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
