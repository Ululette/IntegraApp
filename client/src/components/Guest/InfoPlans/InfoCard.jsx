import React from 'react';
import Card from '@material-ui/core/Card';
import styles from './InfoCard.module.css';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import './backgroundmedia.css';
import Button from '@material-ui/core/Button';

export default function InfoCard({ plan }) {
    const newName = `integra-${plan.name.toLowerCase().substring(8)}`;

    function handleTab(e) {
        // Función que me abre una nueva pestaña con la comparativa de planes
        const win = window.open('/plandetails', "_blank");
        win.focus();
      }

    return (
        <Card className={styles.root}>
            <div className={`${styles.media} ${newName}`}>
                <img
                    src='../../../assets/images/logo-simple.png'
                    alt='Integra logo.'
                />
                <h2>{plan.name}</h2>
            </div>
            <CardContent>
                <Typography className={styles.cobertura} paragraph>
                    Cobertura:
                </Typography>
                <List>
                    <ListItemText
                        primary={`✔${plan.benefits[0].title}`}
                    />
                    <ListItemText
                        primary={`✔${plan.benefits[1].description}`}
                    />
                    <ListItemText
                        primary={`✔${plan.benefits[2].description}`}
                    />
                </List>
            </CardContent>
            <CardContent>
                {/* <a href='/plandetails'> */}
                    <Button
                        variant='outlined'
                        color='secondary'
                        className={styles.buttonInfo}
                        onClick={handleTab}
                    >
                        Mas informacion
                    </Button>
                {/* </a> */}
            </CardContent>
        </Card>
    );
}
