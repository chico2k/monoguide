// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   target: 'serverless',
//   enabled: process.env.ANALYZE === 'true',

//   images: {
//     domains: ['localhost'],
//   },
// });

// module.exports = withBundleAnalyzer({});

// next.config.js
module.exports = {
  images: {
    domains: ['localhost'],
  },
};
