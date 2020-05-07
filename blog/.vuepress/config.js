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
  base: '/blog/',
  theme: '@vuepress/theme-blog',
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/rneto',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/rneto',
        },
      ],
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#feed
     */
    summary: false,
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#smoothscroll
     */
    smoothScroll: true,
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/config/#dateformat
     */
    dateFormat: 'MMM DD YYYY',
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
        updatePopup: false
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-164903805-1'
      }
    ]
  ],
}
