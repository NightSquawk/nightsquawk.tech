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

const footer = {
    links: [
        {
            title: 'Content',
            items: [
                {to: '/docs/category/casparcg', label: 'CasparCG'},
                {to: '/docs/category/syncthing', label: 'Syncthing'},
                {to: '/docs/category/zoho', label: 'Zoho'},
            ]
        },
        {
            title: 'Legal',
            items: [
                {html: `<a href="#" class="termly-display-preferences">Consent Preferences</a>`,},
                {html: `<a href="/private_policy.html" class="termly-privacy-policy">Privacy Policy</a>`,},
                {html: `<a href="/cookie_policy.html" class="termly-cookie-policy">Cookie Policy</a>`,},
                // {
                //     html: `<a href="#" class="termly-terms-and-conditions">Terms and Conditions</a>`,
                // },
                {html: `<a href="https://app.termly.io/notify/29ecafad-d68a-4754-9874-8f3458288d6c">Do Not Sell or Share My Personal information</a>`,},
            ],
        },
    ],
    style: 'dark',
    copyright: `Copyright © ${new Date().getFullYear()} NightSquawk Tech - Your Nightly Read`,
}

const navbar = {
    title: 'NightSquawk Tech',
    logo: {
        alt: 'NightSquawk Tech Logo',
        src: 'img/brand/LOGO_275x200_CLR-BG.svg',
    },
    items: [
        // {
        //     type: 'docSidebar',
        //     sidebarId: 'tutorialSidebar',
        //     position: 'left',
        //     label: 'Tutorial',
        // },
        {
            type: 'dropdown',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Software',
            items: [
                {to: '/docs/category/casparcg', label: 'CasparCG'},
                {to: '/docs/category/syncthing', label: 'Syncthing'},
                {to: '/docs/category/zoho', label: 'Zoho'},
                // {to: '/blog', label: 'Blog'},
            ]
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
            href: 'https://github.com/NightSquawk/nightsquawk.tech',
            label: 'GitHub',
            position: 'right',
        },
    ],
}

const headtags = {
    headTags: [
        {
            tagName: 'script',
            attributes: {
                src: '/js/gtag.js',
            }
        },
        {
            tagName: 'script',
            attributes: {
                src: '/js/adsense.js',
            }
        },
        {
            tagName: 'script',
            attributes: {
                src: '/js/gcm.js',
            }
        },
        {
            tagName: 'script',
            attributes: {
                src: '/js/cfwa.js',
            }
        },
    ]
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

        // GENERAL
        {name: 'keywords', content: 'tech, blog'},

        // TWITTER
        {name: 'twitter:card', content: 'summary_large_image'},

        // GOOGLE ADS
        {name: 'google-adsense-account', content: 'ca-pub-2399094887093765'},
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

const GoogleTagManager = {
    gtag: {
        trackingID: 'G-LH4XY2QF0M',
        anonymizeIP: false,
    },
    googleTagManager: {
        containerId: 'GTM-MXF4B9NG',
    },
}

const MarkdownSettings = {
    markdown: {
        mermaid: true,
    },
}

/** @type {import('@docusaurus/types').Config} */
const config = {
    ...base,
    ...org,
    ...MarkdownSettings,

    themes: ['@docusaurus/theme-mermaid'],

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
                        'https://github.com//NightSquawk/nightsquawk.tech/edit/development/',
                },
                blog: {
                    showReadingTime: true,
                    editUrl:
                        'https://github.com//NightSquawk/nightsquawk.tech/edit/development/',
                    feedOptions: {
                        type: 'json',
                        copyright: `Copyright © ${new Date().getFullYear()} NightSquawk Tech.`,
                        createFeedItems: async (params) => {
                            const { blogPosts, defaultCreateFeedItems, siteConfig } = params;

                            let siteUrl = 'https://beta.nightsquawk.tech';

                            try {
                                const envResponse = await fetch('/system/getENV');
                                const { NODE_ENV } = await envResponse.json();
                                console.log('NODE_ENV:', NODE_ENV);

                                if (NODE_ENV === 'production') {
                                    siteUrl = 'https://nightsquawk.tech';
                                }
                            } catch {
                                console.warn('Falling back to development site URL');
                            }

                            // Use the default feed items creation method
                            const feedItems = await defaultCreateFeedItems(params);

                            // Map over the feed items to append the image URL
                            return feedItems.map(item => {
                                // Find the corresponding blog post using the permalink
                                const correspondingPost = blogPosts.find(post => post.metadata.permalink === item.link.replace(siteConfig.url, ''));

                                // Construct the image URL
                                const imageUrl = correspondingPost?.metadata.frontMatter.image
                                    ? `${siteConfig.url}${correspondingPost.metadata.frontMatter.image}`
                                    : `${siteConfig.url}/img/brand/LOGO_275x200_CLR-BG.svg`;

                                // Return the existing feed item with the image URL appended
                                return {
                                    ...item,
                                    image: imageUrl,  // Add the image URL to the feed item
                                };
                            });
                        },
                    },
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
                ...GoogleTagManager,
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
            navbar: navbar,
            footer: footer,
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
    ...headtags,
};

export default config;
