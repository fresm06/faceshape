import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description:
    "페이스 캔버스의 개인정보처리방침입니다. 사용자의 개인정보를 어떻게 수집, 이용, 보호하는지 안내합니다.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-canvas-text mb-2 tracking-wide">
        개인정보처리방침
      </h1>
      <p className="font-sans text-canvas-muted text-sm mb-10">
        최종 업데이트: 2025년 1월 1일
      </p>

      <div className="prose-canvas space-y-10">
        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            1. 개요
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            페이스 캔버스(이하 &quot;서비스&quot;)는 사용자의 개인정보를 매우
            중요하게 여깁니다. 본 방침은 서비스 이용 시 수집되는 정보와 그
            처리 방식을 설명합니다.
          </p>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed mt-3">
            <strong className="text-canvas-text">핵심 원칙:</strong> 얼굴
            분석은 <strong className="text-canvas-text">브라우저에서만</strong>{" "}
            처리됩니다. 업로드하신 사진이나 카메라 영상은 서버로 전송되지
            않으며, 분석 완료 즉시 메모리에서 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            2. 수집하는 정보
          </h2>
          <div className="space-y-4">
            <div className="bg-canvas-surface rounded-2xl p-5">
              <h3 className="font-sans text-canvas-text text-sm font-semibold mb-2">
                수집하지 않는 정보 (중요)
              </h3>
              <ul className="font-sans text-canvas-muted text-sm space-y-1.5 list-disc list-inside">
                <li>얼굴 사진 또는 카메라 영상</li>
                <li>생체 정보 (얼굴 랜드마크 좌표)</li>
                <li>이름, 이메일, 전화번호 등 개인 식별 정보</li>
              </ul>
              <p className="font-sans text-canvas-muted text-xs mt-3">
                위 정보는 브라우저 내에서만 처리되며 어떠한 서버에도 전송되지
                않습니다.
              </p>
            </div>

            <div className="bg-canvas-surface rounded-2xl p-5">
              <h3 className="font-sans text-canvas-text text-sm font-semibold mb-2">
                자동으로 수집될 수 있는 정보
              </h3>
              <ul className="font-sans text-canvas-muted text-sm space-y-1.5 list-disc list-inside">
                <li>접속 로그 (IP 주소, 접속 시간, 브라우저 종류)</li>
                <li>쿠키 및 유사 기술 (광고 서비스 제공 목적)</li>
                <li>서비스 이용 패턴 (페이지 방문, 클릭 등)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            3. 정보 이용 목적
          </h2>
          <ul className="font-sans text-canvas-muted text-sm space-y-2 list-disc list-inside">
            <li>서비스 운영 및 품질 개선</li>
            <li>서비스 이용 통계 분석</li>
            <li>맞춤형 광고 제공 (Google AdSense)</li>
            <li>서비스 오류 감지 및 보안 유지</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            4. 쿠키 및 광고
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            본 서비스는 Google AdSense를 통해 광고를 제공합니다. Google은
            쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 관련 광고를
            표시할 수 있습니다.
          </p>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed mt-3">
            Google의 광고 쿠키 사용은{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-canvas-primary hover:underline"
            >
              Google 광고 정책
            </a>
            에 따릅니다. 사용자는{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-canvas-primary hover:underline"
            >
              Google 광고 설정
            </a>
            에서 개인화 광고를 비활성화할 수 있습니다.
          </p>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed mt-3">
            브라우저 설정에서 쿠키를 비활성화할 수 있으나, 일부 서비스 기능이
            제한될 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            5. 제3자 정보 공유
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            서비스는 다음의 경우를 제외하고 사용자 정보를 제3자와 공유하지
            않습니다:
          </p>
          <ul className="font-sans text-canvas-muted text-sm space-y-2 list-disc list-inside mt-3">
            <li>사용자의 명시적 동의가 있는 경우</li>
            <li>법적 의무를 이행하기 위해 필요한 경우</li>
            <li>
              서비스 운영에 필수적인 외부 서비스 제공업체 (Google Analytics,
              Google AdSense)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            6. 데이터 보안
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            얼굴 분석 데이터는 브라우저에서만 처리되므로 서버 측 데이터 침해
            위험이 없습니다. 서비스는 HTTPS를 통해 안전하게 운영됩니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            7. 미성년자 보호
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            본 서비스는 만 14세 미만 아동을 대상으로 하지 않습니다. 14세 미만
            아동의 개인정보를 의도적으로 수집하지 않습니다. 보호자께서 자녀가
            서비스를 이용했음을 인지하시는 경우, 아래 연락처로 문의해 주시기
            바랍니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            8. 방침 변경
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            본 개인정보처리방침은 서비스 변경 또는 법령 개정에 따라 업데이트될
            수 있습니다. 변경 시 본 페이지에 공지하며, 중요한 변경의 경우
            서비스 내 공지를 통해 알려드립니다.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-canvas-text mb-3">
            9. 문의
          </h2>
          <p className="font-sans text-canvas-muted text-sm leading-relaxed">
            개인정보처리방침에 관한 문의사항이 있으시면 아래로 연락해 주세요:
          </p>
          <div className="mt-3 bg-canvas-surface rounded-2xl p-5">
            <p className="font-sans text-canvas-text text-sm font-medium">
              페이스 캔버스
            </p>
            <a
              href="/about"
              className="font-sans text-canvas-primary text-sm hover:underline mt-1 inline-block"
            >
              문의하기 →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
