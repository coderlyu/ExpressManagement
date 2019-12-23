const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const name = 'coderly blog' // page title

const port = process.env.port || process.env.npm_config_port || 9527
module.exports = {
  publicPath: '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://123.206.109.108:8083',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('@/components'))
      .set('view', resolve('@/views'))
      config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack:{
    name: name,
    externals: {
      'BMap': 'BMap'
    }
  }
}
