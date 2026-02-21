"use client";

import dynamic from "next/dynamic";

const FaceScanner = dynamic(() => import("./FaceScanner"), {
  ssr: false,
  loading: () => (
    <div className="max-w-xl mx-auto px-4 flex flex-col items-center gap-6 py-12">
      <div className="w-20 h-20 rounded-full bg-canvas-surface animate-pulse" />
      <div className="w-64 h-4 rounded-full bg-canvas-surface animate-pulse" />
      <div className="w-full h-72 rounded-3xl bg-canvas-surface animate-pulse" />
    </div>
  ),
});

export default function FaceScannerWrapper() {
  return <FaceScanner />;
}
