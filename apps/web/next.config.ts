import type { NextConfig } from 'next'

const remoteImageHosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? 'res.cloudinary.com')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean)

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@du/content-seed', '@du/schemas', '@du/types', '@du/ui', '@du/utils'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1600, 1920],
    remotePatterns: remoteImageHosts.map((hostname) => ({ protocol: 'https', hostname })),
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
