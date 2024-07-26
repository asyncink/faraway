/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const VERSION = process.env.VERSION || packageJson.version

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  pageExtensions: ['page.tsx', 'page.ts', 'rest.ts'],
  experimental: { scrollRestoration: true },
  env: { VERSION },

  images: {
    deviceSizes: [440, 768, 1024, 1200, 1440, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp']
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}

module.exports = withBundleAnalyzer(config)
