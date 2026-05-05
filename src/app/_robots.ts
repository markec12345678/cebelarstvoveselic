import { MetadataRoute } from 'next'

// Ta vrstica bo odpravila trenutno napako
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://cebelarstvo-veselic.si/sitemap.xml',
  }
}