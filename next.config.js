/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: '580337358287',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.superherodb.com',
      },
    ],
  },
}

module.exports = nextConfig
