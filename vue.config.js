const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/a',
  outputDir: 'dist/a',
  transpileDependencies: true
})
