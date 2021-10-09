import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { Icon } from '@material-ui/core';

import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  specialText: {
    color: theme.palette.common.orange,
  },
  root: {
    maxWidth: '70%',
    minWidth: '70%',
    marginBottom: '2em',
    padding: theme.spacing(2),
    overflow: 'auto',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
}));

export default function DigitalClassCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={`/teacher/digiClass/${props.dclass.id}`}
      >
        <Grid item container direction='row'>
          <Grid item sm={matchesXS ? 7 : 10}>
            <Grid item container direction='column'>
              <CardContent>
                <Grid item>
                  <Typography gutterBottom variant='h6'>
                    {props.dclass.title}
                  </Typography>
                  {/* <Typography gutterBottom variant='subtitle2'>
                    Εκπαιδευτικός <br />
                    <span className={classes.specialText}>
                      Grigoris Panagiotopoulos
                    </span>
                  </Typography> */}
                  <Hidden smDown>
                    <Typography gutterBottom variant='subtitle2'>
                      Περιγραφή: <br /> {props.dclass.description}
                    </Typography>
                  </Hidden>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item sm={matchesXS ? 5 : 2}>
            <Grid item container direction='column' alignItems='flex-end'>
              <CardContent>
                <Grid item>
                  <ListItemIcon
                    style={{ marginRight: '0.5em', fontSize: '1em' }}
                  >
                    <Icon
                      style={{
                        marginRight: '0.5em',
                        fontSize: '1.5em',
                      }}
                    >
                      person
                    </Icon>
                    <span className={classes.specialText}>12</span>
                  </ListItemIcon>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    Κωδικός: <span className={classes.specialText}>3</span>
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
