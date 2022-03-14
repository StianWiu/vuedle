const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  outputDir: '../dist',
  assetsDir: 'static',
  indexPath: 'templates/index.html',
  transpileDependencies: true
})
