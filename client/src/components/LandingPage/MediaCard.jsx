import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PopUp from './PupUp';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});



export default function MediaCard(props) {

    const classes = useStyles();

    const togglePopup = () => {
        setShowPup(!showPopup);
        console.error('show: ', showPopup)
    }

    const [showPopup, setShowPup] = useState(false)

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.neww.Img}
                    title='Contemplative Reptile'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {props.neww.Title}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                    >
                        {props.neww.Summary}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size='small' color='primary' onClick={togglePopup}>
                    Mas información
                </Button>
            </CardActions>
            {showPopup &&
                <PopUp
                    news={props.neww}
                    text='Cerrar'
                    closePopup={togglePopup}
                    show={showPopup}
                />
            }
        </Card>
    );
}
