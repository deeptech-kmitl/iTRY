/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["itry.s3.amazonaws.com", "img.icons8.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverActions: {
    // edit: updated to new key. Was previously `allowedForwardedHosts`
    allowedOrigins: ['https://itryweb.com/'],
  },
};