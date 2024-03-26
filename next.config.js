/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'itry.s3.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        pathname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['https://itryweb.com', "http://ec2-34-200-54-241.compute-1.amazonaws.com", "*.itryweb.com", "*.ec2-34-200-54-241.compute-1.amazonaws.com"],
      allowedForwardedHosts: ['https://itryweb.com', "http://ec2-34-200-54-241.compute-1.amazonaws.com/", "*.itryweb.com", "*.ec2-34-200-54-241.compute-1.amazonaws.com"],
    },
  },
};