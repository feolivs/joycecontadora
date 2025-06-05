import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

export const generateSitemap = async () => {
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
    { url: '/perfil', changefreq: 'weekly', priority: 0.8 },
    { url: '/configuracoes', changefreq: 'weekly', priority: 0.7 },
    { url: '/ajuda', changefreq: 'monthly', priority: 0.6 },
  ]

  const stream = new SitemapStream({ hostname: 'https://seusite.com' })
  const data = await streamToPromise(Readable.from(links).pipe(stream))
  return data.toString()
}

export const sitemapConfig = {
  hostname: 'https://seusite.com',
  lastmod: new Date().toISOString(),
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  robots: {
    userAgent: '*',
    allow: '/',
    disallow: ['/admin/*', '/api/*'],
  },
} 