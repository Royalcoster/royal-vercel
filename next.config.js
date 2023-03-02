module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/customRing',
        permanent: true,
      },
    ]
  },
}
