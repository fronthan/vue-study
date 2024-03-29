const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  outputDir: path.resolve(__dirname, "../backend/dist"),
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:3000"
      }
    }
  }

});