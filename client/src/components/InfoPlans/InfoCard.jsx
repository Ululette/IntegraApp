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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="plans" className={classes.avatar}>
            P
          </Avatar>
        }
        title={props.plan.description}
        subheader={props.plan.price}
      />
      <NavLink path to={`planDetails/${props.plan.id_plan}`} style={{ textDecoration: 'none', color: 'black' }}>
        Ver mas
      </NavLink>
      <CardContent>
        <Typography paragraph>Cobertura:</Typography>
        <Typography paragraph>
          {props.plan.benefits.benefits_title}
        </Typography>
        {props.plan.benefits.map(d => (
          <Typography paragraph>
            {d.benefit_description}
          </Typography>)
        )}
      </CardContent>
    </Card>
  );
}