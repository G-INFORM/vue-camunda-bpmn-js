const { defineConfig } = require('@vue/cli-service');
// import { Linter } from 'bpmnlint';
// import linterConfig from './.bpmnlintrc';
// const linter = new Linter(linterConfig);
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      // scss: {
      //   additionalData: `@import "@/assets/css/app.scss";`,
      // },
    },
  },
  chainWebpack: config => {
    config.module
        .rule('xml')
        .test(/\.bpmn$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
    config.module
        .rule('bpmnlint')
        .test(/\.bpmnlintrc$/)
        .use('bpmnlint-loader')
        .loader('bpmnlint-loader')
        .end();


    }
})
