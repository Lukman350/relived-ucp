/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? "https://relivedrp.com" : "http://localhost:3000",
};

module.exports = nextConfig;
