/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  basePath: '/dardoc',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dardoc',
        basePath: false,
        permanent: false,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.justboil.me',
      },
    ],
  },
};

export default nextConfig;
