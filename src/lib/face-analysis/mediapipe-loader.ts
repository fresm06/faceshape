import type { FaceLandmarker } from "@mediapipe/tasks-vision";

let faceLandmarkerInstance: FaceLandmarker | null = null;
let initPromise: Promise<FaceLandmarker> | null = null;

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export type LoadingState = "idle" | "loading" | "ready" | "error";

let loadingState: LoadingState = "idle";
let loadingCallbacks: Array<(state: LoadingState) => void> = [];

const notifyCallbacks = (state: LoadingState) => {
  loadingState = state;
  loadingCallbacks.forEach((cb) => cb(state));
};

export const onLoadingStateChange = (
  cb: (state: LoadingState) => void
): (() => void) => {
  loadingCallbacks.push(cb);
  cb(loadingState);
  return () => {
    loadingCallbacks = loadingCallbacks.filter((c) => c !== cb);
  };
};

export async function initFaceLandmarker(): Promise<FaceLandmarker> {
  if (faceLandmarkerInstance) return faceLandmarkerInstance;
  if (initPromise) return initPromise;

  notifyCallbacks("loading");

  initPromise = (async () => {
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const { FaceLandmarker, FilesetResolver } = vision;

      const filesetResolver = await FilesetResolver.forVisionTasks(WASM_PATH);

      faceLandmarkerInstance = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath: MODEL_URL,
            delegate: "GPU",
          },
          outputFaceBlendshapes: false,
          runningMode: "IMAGE",
          numFaces: 1,
        }
      );

      notifyCallbacks("ready");
      return faceLandmarkerInstance;
    } catch (err) {
      console.error("MediaPipe FaceLandmarker 초기화 오류:", err);
      initPromise = null;
      notifyCallbacks("error");
      throw err;
    }
  })();

  return initPromise;
}

export async function detectFaceLandmarks(
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
) {
  const landmarker = await initFaceLandmarker();
  const result = landmarker.detect(imageElement);
  return result;
}

export function getLoadingState(): LoadingState {
  return loadingState;
}
