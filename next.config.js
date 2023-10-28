// see breakdown of code bloat
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  env: {},
  images: {
    domains: [],
  },
  experimental: {
    appDir: true,
    isrMemoryCacheSize: 50,
  },
})
