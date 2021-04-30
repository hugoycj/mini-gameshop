module.exports = {
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.node = {
      fs: 'empty',
    }
    return config
  },
}
