import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서비스 소개",
  description:
    "페이스 캔버스는 AI 기술로 얼굴형을 분석하고 맞춤형 헤어스타일과 안경을 추천하는 무료 뷰티 서비스입니다.",
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="mb-14">
        <h1 className="font-serif text-3xl text-canvas-text mb-4 tracking-wide">
          페이스 캔버스에 대하여
        </h1>
        <p className="font-sans text-canvas-muted text-base leading-relaxed max-w-xl">
          누구나 자신만의 얼굴형을 알고, 그에 맞는 스타일을 찾을 수 있도록
          돕는 AI 뷰티 진단 서비스입니다.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-canvas-text mb-4">
          우리의 미션
        </h2>
        <div className="bg-canvas-surface rounded-2xl p-8">
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            뷰티 전문가에게 상담받기 어려운 분들을 위해, 페이스 캔버스는 최신
            AI 기술을 활용하여 누구나 쉽고 빠르게 자신의 얼굴형을 파악하고
            최적의 헤어스타일과 안경 프레임을 추천받을 수 있도록 합니다.
          </p>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed mt-4">
            모든 분석은 브라우저에서만 처리됩니다. 사진은 절대 서버로
            전송되지 않습니다.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-canvas-text mb-6">
          서비스 특징
        </h2>
        <div className="grid gap-4">
          {[
            {
              title: "100% 브라우저 내 분석",
              desc: "Google MediaPipe AI 기술을 사용하여 모든 얼굴 분석을 사용자의 기기에서 직접 처리합니다. 사진은 서버로 전송되지 않으며 분석 즉시 삭제됩니다.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-canvas-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              ),
            },
            {
              title: "6가지 정밀 얼굴형 분류",
              desc: "계란형, 둥근형, 각진형, 긴형, 하트형, 다이아몬드형 — 478개의 얼굴 랜드마크를 분석하여 정확한 얼굴형을 판별합니다.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-canvas-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                  />
                </svg>
              ),
            },
            {
              title: "맞춤 스타일 추천",
              desc: "얼굴형별로 가장 잘 어울리는 헤어스타일과 안경 프레임을 성별에 맞게 추천합니다. 뷰티 전문가의 조언을 AI로 구현했습니다.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-canvas-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              ),
            },
            {
              title: "완전 무료",
              desc: "회원가입 없이 누구나 무료로 이용할 수 있습니다. 광고를 통해 서비스 운영 비용을 충당합니다.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-canvas-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              ),
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 bg-canvas-surface rounded-2xl p-5"
            >
              <div className="w-10 h-10 rounded-full bg-canvas-accent/30 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-sans text-canvas-text text-sm font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="font-sans text-canvas-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="mb-12">
        <h2 className="font-serif text-xl text-canvas-text mb-4">사용 기술</h2>
        <div className="bg-canvas-surface rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-4 text-sm font-sans">
            {[
              ["AI 엔진", "Google MediaPipe Face Landmarker"],
              ["프레임워크", "Next.js 15 (App Router)"],
              ["분석 방식", "클라이언트 사이드 (브라우저 내)"],
              ["얼굴 랜드마크", "478개 포인트 분석"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-canvas-muted">{label}</p>
                <p className="text-canvas-text font-medium mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="font-serif text-xl text-canvas-text mb-4">문의하기</h2>
        <div className="bg-canvas-surface rounded-2xl p-6">
          <p className="font-sans text-canvas-muted text-sm leading-relaxed mb-6">
            서비스 이용 중 불편한 점이나 개선 의견이 있으시면 아래 양식을 통해
            알려주세요. 소중한 의견을 반영하여 더 나은 서비스를 만들겠습니다.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/ajax/facecanvas.inquiry@gmail.com"
      method="POST"
      className="space-y-4"
    >
      <div>
        <label className="font-sans text-canvas-text text-xs font-medium block mb-1.5">
          제목
        </label>
        <input
          type="text"
          name="subject"
          required
          placeholder="문의 제목을 입력해주세요"
          className="w-full px-4 py-3 rounded-xl border border-canvas-accent bg-white font-sans text-sm text-canvas-text placeholder-canvas-muted/50 focus:outline-none focus:border-canvas-primary transition-colors"
        />
      </div>
      <div>
        <label className="font-sans text-canvas-text text-xs font-medium block mb-1.5">
          내용
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="문의 내용을 입력해주세요"
          className="w-full px-4 py-3 rounded-xl border border-canvas-accent bg-white font-sans text-sm text-canvas-text placeholder-canvas-muted/50 focus:outline-none focus:border-canvas-primary transition-colors resize-none"
        />
      </div>
      <div>
        <label className="font-sans text-canvas-text text-xs font-medium block mb-1.5">
          이메일 (답변 받을 주소)
        </label>
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          className="w-full px-4 py-3 rounded-xl border border-canvas-accent bg-white font-sans text-sm text-canvas-text placeholder-canvas-muted/50 focus:outline-none focus:border-canvas-primary transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-canvas-primary text-white font-sans text-sm font-medium hover:bg-canvas-text transition-colors"
      >
        문의 보내기
      </button>
      <p className="font-sans text-canvas-muted text-xs text-center">
        보통 1-3 영업일 내에 답변드립니다.
      </p>
    </form>
  );
}
