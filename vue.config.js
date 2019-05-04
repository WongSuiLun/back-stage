module.exports = {
  publicPath: './',
  outputDir: 'dist-web',
  productionSourceMap: false,
  devServer:{
    open:true,
    hotOnly:false,
    proxy:{
      '/chpc':{
        target:'http://192.168.108.125/',
        changeOrigin:true,
        ws:true,
        pathRewrite:{"^/chpc":""}
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
