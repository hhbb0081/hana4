/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
  },
};
export default nextConfig;
