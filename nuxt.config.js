import webpack from 'webpack'
export default {
  target: 'static',
  head: {
    title: 'PlaySell',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
    ],
    script: [
    ],
  },
  server: {
    port: 5000
  },
  css: [
    '~/styles/style.scss',
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
  ],
  components: false,
  buildModules: [
    '@nuxtjs/moment',
  ],
  moment: {
    defaultLocale: 'ru',
    locales: ['ru']
  },
  router: {
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/auth-next',
  ],
  build: {
    transpile: [/^element-ui/],
    plugins:[
      new webpack.ProvidePlugin({
        $: "jquery", jQuery: "jquery", "window.jQuery": "jquery",
      })
    ],
    loaders: {
      file: { esModule: false },
      url: { esModule: false }
    },
  }
}
