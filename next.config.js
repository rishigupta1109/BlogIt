/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "icon2.cleanpng.com"], //make it 'your-domain.com'
  },
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
};

module.exports = nextConfig;
