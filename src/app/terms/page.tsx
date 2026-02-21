import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관",
  description:
    "페이스 캔버스 서비스 이용약관입니다. 서비스 이용 시 적용되는 규정과 조건을 확인해주세요.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-canvas-text mb-2 tracking-wide">
        이용약관
      </h1>
      <p className="font-sans text-canvas-muted text-sm mb-10">
        최종 업데이트: 2025년 1월 1일
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제1조 (목적)
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            본 이용약관은 페이스 캔버스(이하 &quot;서비스&quot;)가 제공하는 AI
            얼굴형 진단 서비스의 이용 조건 및 절차, 서비스 운영자와 이용자의
            권리, 의무 및 책임 사항 등을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제2조 (용어 정의)
          </h2>
          <div className="space-y-3">
            {[
              {
                term: "서비스",
                def: '페이스 캔버스가 운영하는 AI 얼굴형 진단 및 스타일 추천 웹사이트 및 관련 서비스 일체를 의미합니다.',
              },
              {
                term: "이용자",
                def: "본 약관에 동의하고 서비스를 이용하는 모든 사람을 의미합니다.",
              },
              {
                term: "콘텐츠",
                def: "서비스 내에 게시된 텍스트, 이미지, 분석 결과 등 모든 정보를 의미합니다.",
              },
            ].map(({ term, def }) => (
              <div key={term} className="bg-canvas-surface rounded-xl p-4">
                <span className="font-sans text-canvas-text text-sm font-semibold">
                  &ldquo;{term}&rdquo;
                </span>
                <span className="font-sans text-canvas-muted text-sm">
                  {" "}
                  — {def}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제3조 (약관의 효력 및 변경)
          </h2>
          <ol className="font-sans text-canvas-muted text-sm space-y-2 list-decimal list-inside">
            <li>
              본 약관은 서비스를 이용하는 모든 이용자에 대해 효력을 갖습니다.
            </li>
            <li>
              서비스는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본
              약관을 변경할 수 있습니다.
            </li>
            <li>
              약관이 변경되는 경우 변경 사항을 서비스 내에 공지하며, 공지 후
              7일 이후부터 효력이 발생합니다.
            </li>
            <li>
              이용자가 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할
              수 있습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제4조 (서비스 이용)
          </h2>
          <ol className="font-sans text-canvas-muted text-sm space-y-2 list-decimal list-inside">
            <li>서비스는 회원가입 없이 누구나 무료로 이용할 수 있습니다.</li>
            <li>
              서비스는 얼굴형 진단 및 스타일 추천을 목적으로 AI 기술을
              사용합니다. 분석 결과는 참고용이며 전문 뷰티 상담을 대체하지
              않습니다.
            </li>
            <li>
              모든 얼굴 이미지 분석은 이용자의 브라우저에서만 처리됩니다.
              이미지 데이터는 서버로 전송되지 않습니다.
            </li>
            <li>
              서비스는 운영 상 필요한 경우 서비스의 전부 또는 일부를 일시
              중단하거나 종료할 수 있습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제5조 (이용자의 의무)
          </h2>
          <p className="font-sans text-canvas-muted text-sm mb-3">
            이용자는 다음 행위를 해서는 안 됩니다:
          </p>
          <ul className="font-sans text-canvas-muted text-sm space-y-2 list-disc list-inside">
            <li>타인의 이미지를 무단으로 사용하는 행위</li>
            <li>서비스의 정상적인 운영을 방해하는 행위</li>
            <li>
              서비스의 콘텐츠를 허가 없이 상업적으로 이용하거나 복제하는 행위
            </li>
            <li>서비스를 불법적인 목적으로 이용하는 행위</li>
            <li>기타 관련 법령에 위반되는 행위</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제6조 (서비스의 면책)
          </h2>
          <ol className="font-sans text-canvas-muted text-sm space-y-2 list-decimal list-inside">
            <li>
              서비스의 얼굴형 분석 결과는 AI 알고리즘에 기반한 참고 정보이며,
              정확성을 보장하지 않습니다.
            </li>
            <li>
              서비스는 이용자가 분석 결과를 바탕으로 내린 결정에 대해 책임을
              지지 않습니다.
            </li>
            <li>
              천재지변, 서버 장애 등 불가항력적 사유로 인한 서비스 중단에
              대해서는 책임을 지지 않습니다.
            </li>
            <li>
              서비스에 링크된 외부 사이트의 콘텐츠에 대해서는 책임을 지지
              않습니다.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제7조 (광고)
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            서비스는 Google AdSense를 통한 광고를 게재합니다. 이용자는 서비스
            이용 중 광고가 노출될 수 있음에 동의합니다. 광고 콘텐츠는 Google의
            정책에 따라 결정되며, 서비스는 광고 내용에 대한 책임을 지지
            않습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제8조 (지적재산권)
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            서비스의 콘텐츠(텍스트, 디자인, 로고 등)에 대한 저작권은 페이스
            캔버스에 귀속됩니다. 이용자는 서비스의 콘텐츠를 개인적, 비상업적
            목적으로만 이용할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제9조 (준거법 및 관할)
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            본 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련하여
            발생하는 분쟁은 대한민국 법원을 관할 법원으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            제10조 (문의)
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            이용약관에 관한 문의사항은{" "}
            <a
              href="/about"
              className="text-canvas-primary hover:underline"
            >
              서비스 소개 페이지
            </a>
            의 문의 양식을 통해 연락해 주세요.
          </p>
        </section>
      </div>
    </div>
  );
}
