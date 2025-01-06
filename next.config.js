const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Remova ou comente a definição da ContentSecurityPolicy
/*
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app https://www.googletagmanager.com https://quelespiqueblog.vercel.app https://scripts.simpleanalyticscdn.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
  frame-src giscus.app https://www.googletagmanager.com https://quelespiqueblog.vercel.app https://scripts.simpleanalyticscdn.com;
`;
*/

const securityHeaders = [
  // Remova o header da Content Security Policy
  /*
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  */
  // Mantenha os outros headers conforme necessário
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders, // Agora sem a CSP
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!dev && !isServer) {
      // Replace React with Preact only in client production build
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
})
