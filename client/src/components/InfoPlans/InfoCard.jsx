import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './InfoCard.module.css';
import logoNav from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function InfoCard({ plan }) {
    const classes = useStyles();
    console.log(plan);
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={(classes.media, styles.picture)}
                    image={logoNav}
                    title='Logo'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5'>
                        {plan.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography paragraph>Cobertura:</Typography>
                    <ul>
                        <li>
                            {
                                plan.benefits[
                                    Math.floor(Math.random() * (16 - 1) + 1)
                                ]
                            }
                        </li>
                        <li>
                            {
                                plan.benefits[
                                    Math.floor(Math.random() * (16 - 1) + 1)
                                ]
                            }
                        </li>
                        <li>
                            {
                                plan.benefits[
                                    Math.floor(Math.random() * (16 - 1) + 1)
                                ]
                            }
                        </li>
                    </ul>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NavLink to={`planDetails/${plan.id_plan}`}>
                    <Button size='small' color='primary'>
                        Mas información
                    </Button>
                </NavLink>
            </CardActions>
        </Card>
    );
}
