import { Helmet } from 'react-helmet-async'

export const defaultSEO = {
  title: 'Meu Dashboard',
  description: 'Um dashboard moderno e responsivo',
  keywords: 'dashboard, admin, painel, controle',
  author: 'Seu Nome',
  siteUrl: 'https://seusite.com',
  twitterHandle: '@seutwitter',
  ogImage: '/images/og-image.jpg',
}

export const SEO = ({
  title,
  description,
  keywords,
  ogImage,
}: {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
}) => {
  const seo = {
    title: title ? `${title} | ${defaultSEO.title}` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    ogImage: ogImage || defaultSEO.ogImage,
  }

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={defaultSEO.author} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={defaultSEO.siteUrl} />
      <meta property="og:image" content={seo.ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={defaultSEO.siteUrl} />
    </Helmet>
  )
} 