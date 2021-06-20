import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 270,
    marginLeft: '2.5em',
    [theme.breakpoints.down('md')]: {
      marginLeft: '1.5em',
      height: 50,
      width: 240,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0em',
      height: 45,
      width: 200,
    },
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export default function QuizActions() {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid item container justify='center'>
      <Paper className={classes.paper}>
        <Grid item container direction='column'>
          <Grid item>
            <Typography variant={matchesSM ? 'h5' : 'h3'}>
              Περισσότερες Επιλογές:
            </Typography>
          </Grid>
          <Divider style={{ marginTop: '1em' }} />
          <Grid
            item
            container
            direction='row'
            justify='space-between'
            style={{ marginTop: '1em', marginBottom: '2em' }}
          >
            <Grid item>
              <ListItemIcon style={{ fontSize: '1em' }}>
                <Icon
                  style={{
                    marginRight: '0.5em',
                    color: '#ffeb3b',
                    fontSize: '2em',
                  }}
                >
                  done
                </Icon>
                <Typography variant='subtitle1'>Live Κουίζ</Typography>
              </ListItemIcon>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Button variant='outlined' className={classes.continueButton}>
                Δημιουργία Ψηφιακής Αίθουσας
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction='row'>
            <Grid item>
              <ListItemIcon style={{ fontSize: '1em' }}>
                <Icon
                  style={{
                    marginRight: '0.5em',
                    color: '#ffeb3b',
                    fontSize: '2em',
                  }}
                >
                  done
                </Icon>
                <Typography variant='subtitle1'>Ψηφιακή Τάξη</Typography>
              </ListItemIcon>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              <Button variant='contained' className={classes.continueButton}>
                Ορισμός ως Προτεινόμενο
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
