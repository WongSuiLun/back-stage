module.exports = {
  publicPath: './',
  outputDir: 'dist-web',
  productionSourceMap: false,
  devServer: {
    open: true
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
