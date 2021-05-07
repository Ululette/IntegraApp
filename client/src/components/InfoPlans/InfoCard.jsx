import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();

  return (
      <Card className={classes.root} key={props.plan.id}>
        <CardHeader
        avatar={
          <Avatar aria-label="plans" className={classes.avatar}>
            P
          </Avatar>
        }
        title={props.plan.title}
        subheader={props.plan.sub}
      />
      <NavLink path to={`plansDetails/${props.plan.id}`} style={{textDecoration:'none'}}>
        Ver mas
      </NavLink>
        <CardContent>
          <Typography paragraph>Covertura:</Typography>
          <Typography paragraph>
            {props.plan.cover}
          </Typography>
        </CardContent>
    </Card>
  );
}