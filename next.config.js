/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["itry.s3.amazonaws.com", "img.icons8.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['https://itryweb.com'],
    },
  },
};