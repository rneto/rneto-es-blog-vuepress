module.exports = {
  head: [
    ['link', { rel: 'icon', href: '/images/logo.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#8a278c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: '/images/icons/icon-152x152.png' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#8a278c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/images/icons/icon-144x144' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  title: 'Rafael Neto',
  description: 'Apuntes de un programador Full Stack, JavaScript, HTML, CSS, .NET',
  base: '/',
  theme: '@vuepress/theme-blog',
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#directories
     */
    directories: [
      {
        id: "blog",
        dirname: "_posts",
        title: "Blog",
        path: "/blog/",
        itemPermalink: "/blog/:slug"
      }
    ],
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#nav
     */
    nav: [
      {
        text: 'Blog',
        link: '/blog/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#footer
     */
    footer: {
      contact: [
        {
          type: 'twitter',
          link: 'https://mobile.twitter.com/RNeto',
        },
      ],
      copyright: [
        {
          text: "Rafael Neto © 2022",
          link: "/index.html"
        }
      ]
    },
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#summary
     */
    summary: true,
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#summaryLength
     */
    summaryLength: 250,
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#smoothscroll
     */
    smoothScroll: true,
    /**
     * Ref: https://vuepress-theme-blog.billyyyyy3320.com/config/#dateformat
     */
    dateFormat: 'DD/MM/YYYY',
    NOcomment: {
      service: "vssue",
      prefix: "[Post]",
      owner: "rneto",
      repo: "rneto.es",
      clientId: "d08327ef8b1457b3432a",
      clientSecret: "b698b4ae39532b21aee0521a9c28af4a83362892"
    },
  },
  locales: {
    '/': {
      lang: 'es',
      title: 'Rafael Neto',
      description: 'Apuntes de un programador Full Stack, JavaScript, HTML, CSS, .NET',
    }
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: "Nuevo contenido disponible.",
            buttonText: "Actualizar"
          }
        }
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-164903805-1'
      }
    ],
    [
      'social-share',
      {
        networks: ['twitter'],
        twitterUser: 'rneto',
        fallbackImage: '/images/logo.png',
        isPlain: false,
        noGlobalSocialShare: true,
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://rneto.es',
        dateFormatter: val => {
          return new Date().toISOString()
        }
      }
    ],
    [
      '@vuepress/back-to-top'
    ],
    [
      'vuepress-plugin-nprogress'
    ],
    [
      'reading-progress'
    ],
    [
      'feed',
      {
        canonical_base: 'https://rneto.es',
        feeds: {
          rss2: {
            enable: true,
          },
          atom1: {
            enable: false,
          },
          json1: {
            enable: false,
          },
        },
      }
    ],
    [
      'seo'
    ],
    [
      '@NO-vssue/vuepress-plugin-vssue',
      {
        platform: 'github-v4',
        owner: 'rneto',
        repo: 'rneto.es',
        clientId: 'd08327ef8b1457b3432a',
        clientSecret: 'b698b4ae39532b21aee0521a9c28af4a83362892',
      },

    ],
    [
      '@NO-vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs')
          return dayjs(timestamp).locale('lang').format('DD/MM/YYYY')
        }
      }
    ]
  ],
  //evergreen: true,
}
