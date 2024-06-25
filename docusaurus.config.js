// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const base = {
    title: 'NightSquawk Tech',
    tagline: 'Your nightly read',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://nightsquawk.tech',

    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',
}

const org = {
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'NightSquawk', // Usually your GitHub org/user name.
    projectName: 'nightsquawk.tech', // Usually your repo name.
}

const seo = {

    // META TAGS
    metadata: [
        {name: 'keywords', content: 'tech, blog'},
        {name: 'twitter:card', content: 'summary_large_image'},
    ],

    // OPEN GRAPH TAGS
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://nightsquawk.tech',
        site_name: 'NightSquawk Tech',
        images: [
            {
                url: 'https://nightsquawk.tech/img/brand/HEADER_700x120_CLR-BG.svg',
                alt: 'NightSquawk Tech Logo',
            },
        ],
    },
}

/** @type {import('@docusaurus/types').Config} */
const config = {
    ...base,
    ...org,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl:
                        'https://github.com/NightSquawk/nightsquawk.tech',
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com/NightSquawk/nightsquawk.tech',
                    feedOptions: {
                        type: 'all',
                        copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
                        createFeedItems: async (params) => {
                            const {blogPosts, defaultCreateFeedItems, ...rest} = params;
                            return defaultCreateFeedItems({
                                // keep only the 10 most recent blog posts in the feed
                                blogPosts: blogPosts.filter((item, index) => index < 10),
                                ...rest,
                            });
                        },
                    },
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            ...seo,
            announcementBar: {
                id: 'under-construction',
                content:
                    'Website under construction. Please check back later for updates.',
                backgroundColor: '#fafbfc',
                textColor: '#091E42',
                isCloseable: false,
            },
            image: 'img/brand/HEADER_700x120_CLR-BG.svg',
            navbar: {
                title: 'NightSquawk Tech',
                logo: {
                    alt: 'NightSquawk Tech Logo',
                    src: 'img/brand/LOGO_275x200_CLR-BG.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Tutorial',
                    },
                    {
                        type: 'dropdown',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Example Dropdown',
                        items: [{to: '/blog', label: 'Blog'},{to: '/blog', label: 'Blog'},]
                    },
                    {to: '/blog', label: 'Blog', position: 'left'},
                    {
                        href: 'https://github.com/NightSquawk',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Tutorial',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/docusaurus',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/docusaurus',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/facebook/docusaurus',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} NightSquawk Tech. Your nightly read.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
