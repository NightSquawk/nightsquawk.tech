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
                const response = await fetch('https://nightsquawk.tech/blog/feed.json'); // Adjust the path as necessary
                const data = await response.json();

                const parsedPosts = data.items.map((item) => ({
                    title: item.title,
                    link: item.url,
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
        return <div>No post found</div>;
    }

    const { title, link, image, summary } = posts[currentPostIndex];

    return (
        <div className={styles.blogShowcase}>
            <Link to={link}>
                <div className={styles.blogImageContainer}>
                    <img src={image} alt={title} className={styles.blogImage} />
                    <div className={styles.blogTitleOverlay}>
                        <h2 className={styles.blogTitle}>{title}</h2>
                    </div>
                </div>
            </Link>
            <p className={styles.blogSummary}>{summary}</p>
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
                </div>
                <div className={styles.heroContentRight}>
                    <BlogShowcase />
                </div>
            </header>
            <main>
                <HomepageFeatures />
            </main>
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
