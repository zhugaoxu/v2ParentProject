
const path = require('path')
function resolve(dir) {
	return path.join(__dirname, dir)
}
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
        target: `ss`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
    },
  },
  lintOnSave: false,

  chainWebpack(config) {

		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
	},
}
