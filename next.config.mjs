const nextConfig = {
  images: { unoptimized: true },
  sassOptions: {
    includePaths: ['./styles'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
