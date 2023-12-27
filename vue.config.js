
module.exports = {
  outputDir: 'app',
  productionSourceMap: false,
  devServer: {
    hot: false,
    disableHostCheck: true,
    port: 8080,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },

    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: ``,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
    },
  },
  lintOnSave: false,

}
