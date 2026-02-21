import type { MetadataRoute } from "next";
import { faceShapeOrder } from "@/lib/data/face-shape-data";

const BASE_URL = "https://facecanvas.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const faceShapePages = faceShapeOrder.map((shape) => ({
    url: `${BASE_URL}/result/${shape}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/scan`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...faceShapePages,
  ];
}
