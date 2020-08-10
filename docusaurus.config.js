module.exports = {
  title: 'Documedia',
  tagline: 'Tutoriales y documentación de trabajo para dimedia',
  url: 'https://docu.dimedia.xyz',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'dimedia', // Usually your GitHub org/user name.
  projectName: 'documedia', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: '3481bc4c7b411f6b34d307b7e56b8a73',
      indexName: 'dimedia_xyz',
      algoliaOptions: {},
    },
    navbar: {
      title: 'DIMEDIA.XYZ',
      logo: {
        alt: 'DIMEDIA',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Documentación',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/zurdors/documedia',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentación',
          items: [
            {
              label: 'AWS',
              to: 'docs/',
            },
            {
              label: 'BITNAMI',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Síguenos',
          items: [
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/dimediax/',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/dimedia.xyz',
            },
            {
              label: 'Twitter',
              href: 'http://twitter.com/dimediamx',
            },
          ],
        },
        {
          title: 'Más',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zurdors/documedia/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} DIMEDIA, construido con Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/zurdors/documedia/edit/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/zurdors/documedia/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
