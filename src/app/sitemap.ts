import type { MetadataRoute } from "next";
import { faceShapeOrder } from "@/lib/data/face-shape-data";

const BASE_URL = "https://facecanvas.kr";

export const dynamic = "force-static";

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
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
