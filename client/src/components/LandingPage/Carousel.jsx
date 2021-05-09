import React, { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Styles from './Carousel.module.css';
import supabase from '../../supabase.config';

export default function InfoPlanes() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchNews = async () => {
            let { data: news } = await supabase.from('news').select('*');

            setNews(news);
        };
        fetchNews();
    }, []);

    const [currCard, setCurrCard] = useState(0);
    if (news.length === 0) return <h1>Cargando...</h1>;

    const leftNeww = news[currCard > 1 ? currCard - 1 : news.length - 1];
    const neww = news[currCard];
    const rightNeww = news[currCard < news.length - 1 ? currCard + 1 : 0];

    const forward = () =>
        currCard < news.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
    const back = () =>
        currCard > 0 ? setCurrCard(currCard - 1) : setCurrCard(news.length - 1);

    return (
        <div className={Styles.carousel}>
            <div className={Styles.card}>
                <div className={Styles.left} onClick={back}>
                    <ArrowBackIosIcon />
                </div>
                <MediaCard className={Styles.center} neww={leftNeww} />
                <MediaCard className={Styles.center} neww={neww} />
                <MediaCard className={Styles.center} neww={rightNeww} />
                <div className={Styles.right} onClick={forward}>
                    <ArrowForwardIosIcon />
                </div>
            </div>
        </div>
    );
}
