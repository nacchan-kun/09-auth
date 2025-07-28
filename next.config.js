/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  generateBuildId: () => {
    return Date.now().toString();
  }
};

module.exports = nextConfig;