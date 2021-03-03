import webpack from 'webpack'
const TerserPlugin = require('terser-webpack-plugin');
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
    extendRoutes(routes, resolve) {
      const navbarRoutes = [ 'samp', 'crmp', 'wot', 'gta5', 'steam', 'minecraft' ]
      for (const route of navbarRoutes) {
        routes.push({
          name: route, path: `/${route}`, component: resolve(__dirname, 'pages/catalog.vue')
        })
      }
    }
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
    /*postcss: {
      plugins: {
        cssnano: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true
              }
            }
          ]
        }
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
    },
    splitChunks: {
      layouts: true
    },
    extractCSS: true,
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          },
        }),
        // optimize-css-assets-webpack-plugin
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    },
    optimizeCSS: {
      cssProcessor: require('css-mqpacker'),
      cssProcessorPluginOptions: { sort: true }
    }*/
  }
}
