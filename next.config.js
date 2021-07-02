const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');


module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com'
    ],
  },
}