module.exports = {
  publicPath: './',
  outputDir: 'dist-web',
  productionSourceMap: false,
  devServer: {
    open: true,
    hotOnly: false,
    proxy: {
      '/chpc': {
        target: 'http://192.168.101.147/',
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/chpc": "" }
      },
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
        'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  }
}
