const withPWA = require('next-pwa')({
  dest: 'public'
})

const settings = {
  reactStrictMode: true,
  swcMinify: true,// next.js config
}

module.exports = process.env.NODE_ENV === 'development' ? settings : withPWA(settings);