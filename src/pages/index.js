import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function BlogShowcase() {
    const [posts, setPosts] = useState([]);
    const [currentPostIndex, setCurrentPostIndex] = useState(0);

    useEffect(() => {
        async function fetchBlogPosts() {
            try {
                let blogAPIPath = null;
                const envResponse = await fetch('/system/getENV'); // Fetch the NODE_ENV from your Pages Function
                const { NODE_ENV } = await envResponse.json();

                console.log('NODE_ENV:', NODE_ENV)

                if (!NODE_ENV || NODE_ENV === 'development') {
                    blogAPIPath = 'http://beta.nightsquawk.tech/blog/feed.json';
                } else {
                    blogAPIPath = 'https://nightsquawk.tech/blog/feed.json';
                }

                const response = await fetch(blogAPIPath); // Adjust the path as necessary
                const data = await response.json();

                const parsedPosts = data.items.map((item) => ({
                    title: item.title,
                    link: item.url,
                    date: item.date_modified,
                    author: item.author.name,
                    tags: item.tags,
                    summary: item.summary || item.content_text,
                    image: item.image || '/img/brand/LOGO_275x200_CLR-BG.svg', // Fallback image if none found
                }));

                setPosts(parsedPosts);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        }

        fetchBlogPosts();

        const interval = setInterval(() => {
            setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
        }, 3000); // Change post every 3 seconds

        return () => clearInterval(interval);
    }, [posts.length]);

    if (posts.length === 0) {
        return <div></div>;
    }

    const { title, link, date, author, tags, image, summary } = posts[currentPostIndex];

    return (
        <div className={styles.blogShowcase}>
            <Link to={link}>
                <div className={styles.blogImageContainer}>
                    <Heading as="h2">{title}</Heading>
                    <p className={styles.blogSubtext}>{date} - Written by {author}</p>
                    <img src={image} alt={title} className={styles.blogImage}/>
                    <p className={styles.blogSummary}>{summary}</p>
                </div>
            </Link>
        </div>
    );
}

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <div className={styles.heroContainer}>
            <header className={styles.heroBanner}>
                <div className={styles.heroContentLeft}>
                    <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
                    <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
                    <p className={styles.heroDescription}>Welcome to NightSquawk Tech!</p>
                    <p className={styles.heroDescription}>
                        We bring you the latest promotions on games and tech items, along with quick guides on technology stacks and programming tutorials.
                    </p>
                    <p className={styles.heroDescription}>
                        Dive into our blog for insightful articles, or explore our documentation for detailed guides.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link className="button button--primary button--lg" to="/blog">
                            Visit Blog
                        </Link>
                        <Link className="button button--secondary button--lg" to="/docs/intro">
                            View Documentation
                        </Link>
                    </div>
                </div>
                <div className={styles.heroContentRight}>
                    <BlogShowcase />
                </div>
            </header>
        </div>
    );
}

export default function Home() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <HomepageHeader />
        </Layout>
    );
}
