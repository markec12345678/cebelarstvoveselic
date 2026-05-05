import type { MetadataRoute } from 'next'

// Ta vrstica je ključna za uspeh 'npm run build' pri uporabi 'output: export'
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: 'https://cebelarstvo-veselic.si/',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Tukaj lahko kasneje dodaš še ostale podstrani (npr. /trgovina, /obiski)
  ]
}