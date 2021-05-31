import React, { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import Flicking from '@egjs/react-flicking';
import styles from './Carousel.module.css';
import supabase from '../../../supabase.config';

export default function InfoPlanes() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            let { data: news } = await supabase.from('news').select('*');
            setNews(news);
        };
        fetchNews();
    }, []);

    if (news.length === 0) return <h1>Cargando...</h1>;

    return (
        <div className={styles.carousel}>
            <Flicking
                className={styles.card}
                gap={10}
                circular={true}
                moveType='freeScroll'
            >
                {news.map((el, idx) => (
                    <MediaCard neww={el} key={`new-${idx}`} />
                ))}
            </Flicking>
        </div>
    );
}
