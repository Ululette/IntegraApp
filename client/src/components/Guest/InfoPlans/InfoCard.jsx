import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
        zIndex: 3,
    },
});

export default function InfoCard({ plan }) {
    const classes = useStyles();
    console.log(plan);
    console.log('HOLAAA');
    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant='h5'>
                        {plan.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography paragraph>Cobertura:</Typography>
                    <List>
                        <ListItemText
                            primary={`-${
                                plan.benefits[Math.floor(Math.random() * 8)]
                                    .description
                            }`}
                        />
                        <ListItemText
                            primary={`-${
                                plan.benefits[Math.floor(Math.random() * 8)]
                                    .description
                            }`}
                        />
                        <ListItemText
                            primary={`-${
                                plan.benefits[
                                    Math.floor(Math.random() * (8 - 1) + 1)
                                ].description
                            }`}
                        />
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}
