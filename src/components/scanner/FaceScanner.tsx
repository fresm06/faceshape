"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import ScanOverlay from "./ScanOverlay";
import type { Gender } from "@/types/face.types";
import { extractMeasurements, measurementsToQueryParams } from "@/lib/face-analysis/face-measurements";
import { classifyFaceShape } from "@/lib/face-analysis/face-classifier";

type CaptureMode = "upload" | "camera";
type ScanStage = "scanning" | "analyzing" | "complete";

export default function FaceScanner() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [gender, setGender] = useState<Gender>("unspecified");
  const [captureMode, setCaptureMode] = useState<CaptureMode>("upload");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStage, setScanStage] = useState<ScanStage>("scanning");
  const [error, setError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // ---- 카메라 시작 ----
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch {
      setError("카메라 접근 권한이 필요합니다. 브라우저 설정을 확인해주세요.");
    }
  }, []);

  // ---- 카메라 중지 ----
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // ---- 모드 전환 ----
  const handleModeChange = useCallback(
    (mode: CaptureMode) => {
      setCaptureMode(mode);
      setPreviewUrl(null);
      setError(null);
      if (mode === "camera") {
        startCamera();
      } else {
        stopCamera();
      }
    },
    [startCamera, stopCamera]
  );

  // ---- 이미지 파일 선택 ----
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setError(null);
    },
    []
  );

  // ---- 카메라 캡처 ----
  const captureFromCamera = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const url = canvas.toDataURL("image/jpeg", 0.9);
    setPreviewUrl(url);
    stopCamera();
  }, [stopCamera]);

  // ---- 얼굴 분석 실행 ----
  const analyzeImage = useCallback(async () => {
    if (!previewUrl) return;
    setError(null);
    setIsScanning(true);
    setScanStage("scanning");

    try {
      // 이미지 로딩
      const img = new Image();
      img.src = previewUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
      });

      setScanStage("analyzing");

      // MediaPipe 초기화 및 분석
      const { initFaceLandmarker, detectFaceLandmarks } = await import(
        "@/lib/face-analysis/mediapipe-loader"
      );
      await initFaceLandmarker();
      const result = await detectFaceLandmarks(img);

      if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
        throw new Error("얼굴을 감지하지 못했습니다.");
      }

      const landmarks = result.faceLandmarks[0];
      const measurements = extractMeasurements(landmarks);

      if (!measurements) {
        throw new Error("얼굴 측정에 실패했습니다.");
      }

      const faceShape = classifyFaceShape(measurements);
      const queryParams = measurementsToQueryParams(measurements);

      setScanStage("complete");

      // 이미지 메모리 해제
      URL.revokeObjectURL(previewUrl);

      await new Promise((r) => setTimeout(r, 800));

      router.push(`/result/${faceShape}?${queryParams}&gender=${gender}`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "분석 중 오류가 발생했습니다.";
      setError(message);
      setIsScanning(false);
    }
  }, [previewUrl, gender, router]);

  return (
    <>
      <ScanOverlay isVisible={isScanning} stage={scanStage} />

      <div className="max-w-xl mx-auto px-4">
        {/* ---- 성별 선택 ---- */}
        <div className="mb-8">
          <p className="font-sans text-canvas-muted text-sm mb-3 text-center">
            더 정확한 헤어스타일 추천을 위해 선택해주세요
          </p>
          <div className="flex gap-3 justify-center">
            {(
              [
                { value: "female", label: "여성" },
                { value: "unspecified", label: "선택 안함" },
                { value: "male", label: "남성" },
              ] as const
            ).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setGender(value)}
                className={`px-6 py-2.5 rounded-full font-sans text-sm transition-all duration-200 ${
                  gender === value
                    ? "bg-canvas-primary text-white shadow-sm"
                    : "bg-canvas-surface text-canvas-muted hover:bg-canvas-accent/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ---- 촬영 방법 탭 ---- */}
        <div className="flex rounded-2xl bg-canvas-surface p-1 mb-6">
          {(
            [
              { value: "upload", label: "📁 사진 업로드" },
              { value: "camera", label: "📷 카메라 촬영" },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleModeChange(value)}
              className={`flex-1 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-200 ${
                captureMode === value
                  ? "bg-white text-canvas-text shadow-sm"
                  : "text-canvas-muted hover:text-canvas-text"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ---- 캡처 영역 ---- */}
        <div className="relative">
          {captureMode === "upload" ? (
            // 업로드 영역
            <div>
              {!previewUrl ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-canvas-accent rounded-3xl p-10 text-center hover:border-canvas-primary hover:bg-canvas-surface/50 transition-all duration-200"
                  style={{ minHeight: 280 }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                      const url = URL.createObjectURL(file);
                      setPreviewUrl(url);
                      setError(null);
                    }
                  }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-canvas-surface flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 text-canvas-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-serif text-canvas-text text-lg">
                        사진을 드래그하거나
                      </p>
                      <p className="font-sans text-canvas-muted text-sm mt-1">
                        클릭하여 파일을 선택해주세요
                      </p>
                    </div>
                    <p className="font-sans text-canvas-accent text-xs">
                      JPG, PNG, WebP 지원 · 정면 얼굴 사진을 권장합니다
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden bg-canvas-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="업로드된 얼굴 사진"
                    className="w-full object-cover"
                    style={{ maxHeight: 400 }}
                  />
                  <button
                    onClick={() => setPreviewUrl(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-canvas-text/60 text-white flex items-center justify-center hover:bg-canvas-text transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            // 카메라 영역
            <div className="relative">
              <div
                className="relative rounded-3xl overflow-hidden bg-canvas-text"
                style={{ minHeight: 340 }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full object-cover"
                />
                {/* Oval guide overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="border-2 border-dashed border-canvas-accent/60 rounded-full"
                    style={{ width: 200, height: 260 }}
                  />
                </div>
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="캡처된 사진"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Hidden canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />

              {!previewUrl && isCameraActive && (
                <button
                  onClick={captureFromCamera}
                  className="mt-4 w-full py-4 rounded-2xl bg-canvas-primary text-white font-sans text-lg font-medium hover:bg-canvas-text transition-colors"
                >
                  📸 촬영하기
                </button>
              )}
              {previewUrl && (
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                    startCamera();
                  }}
                  className="mt-4 w-full py-3 rounded-2xl border border-canvas-accent text-canvas-muted font-sans text-sm hover:bg-canvas-surface transition-colors"
                >
                  다시 촬영하기
                </button>
              )}
            </div>
          )}
        </div>

        {/* ---- 오류 메시지 ---- */}
        {error && (
          <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200">
            <p className="font-sans text-red-600 text-sm text-center">{error}</p>
            <p className="font-sans text-red-400 text-xs text-center mt-1">
              정면을 바라보는 선명한 얼굴 사진을 사용해주세요
            </p>
          </div>
        )}

        {/* ---- 분석 시작 버튼 ---- */}
        {previewUrl && !isScanning && (
          <button
            onClick={analyzeImage}
            className="mt-6 w-full py-5 rounded-2xl bg-canvas-primary text-white font-serif text-xl tracking-wide hover:bg-canvas-text transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            얼굴형 분석 시작하기 →
          </button>
        )}

        {/* ---- 프라이버시 안내 ---- */}
        <div className="mt-8 p-4 rounded-2xl bg-canvas-surface/60 text-center">
          <p className="font-sans text-canvas-muted text-xs leading-relaxed">
            🔒 분석은 <strong>브라우저에서만</strong> 진행됩니다.
            <br />
            이미지는 서버로 전송되지 않으며 분석 즉시 삭제됩니다.
          </p>
        </div>
      </div>
    </>
  );
}
