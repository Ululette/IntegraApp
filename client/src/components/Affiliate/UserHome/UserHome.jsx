import React, { useState, useEffect } from 'react';
import supabase from '../../../supabase.config.js';
import Carousel from '../../Guest/LandingPage/Carousel.jsx';
import style from './UserHome.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
}));

function UserHome() {
    const classes = useStyles();
    const affiliateData = JSON.parse(localStorage.getItem('affiliatedata'));
    return (
        <div className={style.home}>
            <div className={style.avatar}>
                <div className={style.image}>
                    <Avatar alt={affiliateData.name} src='' className={classes.large} />
                </div>
                <label htmlFor="">Hola, {affiliateData.name}</label>
            </div>
            <div>
                <Carousel/>
            </div>
        </div>
    );
}

export default UserHome;
