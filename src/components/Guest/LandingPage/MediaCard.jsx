import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './MediaCard.module.css';
import PopUp from './PopUp';

export default function MediaCard({ neww }) {
    const togglePopup = () => {
        setShowPup(!showPopup);
    };
    const [showPopup, setShowPup] = useState(false);

    return (
        <Card className={styles.root}>
            <CardActionArea>
                <CardMedia className={styles.media} image={neww.img} />
                <CardContent className={styles.containerData}>
                    <Typography
                        className={styles.title}
                        gutterBottom
                        variant='h5'
                    >
                        {neww.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {neww.summary}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={styles.popup}>
                <Button size='small' color='primary' onClick={togglePopup}>
                    Mas información
                </Button>
            </CardActions>
            {showPopup && (
                <PopUp
                    news={neww}
                    text='Cerrar'
                    closePopup={togglePopup}
                    show={showPopup}
                />
            )}
        </Card>
    );
}
