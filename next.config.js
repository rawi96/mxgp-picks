/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  async redirects() {
    return [
      {
        source: '/design',
        destination: 'https://www.figma.com/file/yhoptKQa09IV2KmqKLeyw4/MXGP-PICKS?node-id=0:1',
        permanent: true,
      },
      {
        source: '/src',
        destination: 'https://github.com/rawi96/mxgp-picks',
        permanent: true,
      },
    ];
  },
});
