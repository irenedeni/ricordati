/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  env: {
    NEXT_PUBLIC_GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
  images: {
    domains: ['previews.123rf.com', 'images.unsplash.com'],
  },
}
module.exports = withPWA(nextConfig)
