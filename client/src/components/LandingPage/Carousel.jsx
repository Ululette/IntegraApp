import React, { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styles from './Carousel.module.css';
import supabase from '../../supabase.config';
import { teal } from '@material-ui/core/colors';

export default function InfoPlanes() {
    const [news, setNews] = useState([]);
    const [currCard, setCurrCard] = useState(0);
    const [shouldAutoSlide,setAutoSlide] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            let { data: news } = await supabase.from('news').select('*');
            setNews(news);
        };
        fetchNews();
    }, []);
    
    if (news.length === 0) return <h1>Cargando...</h1>;
    
    const leftNeww = news[currCard > 1 ? currCard - 1 : news.length - 1];
    const neww = news[currCard];
    const rightNeww = news[currCard < news.length - 1 ? currCard + 1 : 0];

    const forward = () =>{
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard < news.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
    }
    const back = () =>{
        if(shouldAutoSlide){
            setAutoSlide(false);
        }
        currCard > 0 ? setCurrCard(currCard - 1) : setCurrCard(news.length - 1);
    }
    
    const autoSlide=()=>{
        currCard < news.length - 1 ? setCurrCard(currCard + 1) : setCurrCard(0);
    }

    setTimeout(()=>{
        if(shouldAutoSlide){
            autoSlide()
        }
    },2000);

    return (
        <div className={styles.carousel}>
            <div className={styles.left} onClick={back}>
                <ArrowBackIosIcon style={{ color: teal[300] }} />
            </div>
            <div className={styles.card}>
                <MediaCard neww={leftNeww} />
                <MediaCard neww={neww} />
                <MediaCard neww={rightNeww} />
            </div>
            <div className={styles.right} onClick={forward}>
                <ArrowForwardIosIcon style={{ color: teal[300] }} />
            </div>
        </div>
    );
}
