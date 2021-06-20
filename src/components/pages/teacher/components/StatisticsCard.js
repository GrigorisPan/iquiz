import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  specialText2: {
    color: theme.palette.common.blue,
    fontWeight: 450,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
}));

export default function StatisticsCard() {
  const classes = useStyles();
  const theme = useTheme();
  const [reports, setReports] = useState(false);

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const reportsHandler = () => {
    setReports((prevState) => !prevState);
  };

  return (
    <Grid item container sm={12} md={9} lg={8}>
      <Card className={classes.root}>
        <Grid item container direction='row'>
          <Grid item xs={12} sm={6} md={7}>
            <Grid item container direction='column'>
              <CardContent>
                <Grid item align={matchesXS ? 'center' : ''}>
                  <Typography gutterBottom variant='subtitle1' component='h2'>
                    Computer
                  </Typography>

                  <Typography variant='h6' paragraph>
                    The Best Computer quiz
                  </Typography>
                  <Typography variant='subtitle2'>
                    Συγγραφέας:{' '}
                    <span className={classes.specialText}>John Doe</span>
                  </Typography>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
            <Grid item container direction='column' alignItems='center'>
              <CardContent>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    Χρήστες: <span className={classes.specialText2}>3</span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Βαθμολογίας:{' '}
                    <span className={classes.specialText2}>50</span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Σωστών Απ.:{' '}
                    <span className={classes.specialText2}>8</span>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant='subtitle2'>
                    ΜΟ Λανθασμένων Απ.:{' '}
                    <span className={classes.specialText2}>8</span>
                  </Typography>
                </Grid>
                <Grid item container alignItems='center'>
                  <Typography
                    gutterBottom
                    variant='subtitle2'
                    style={{ paddingRight: '1em' }}
                  >
                    Αναφορές: <span className={classes.specialText2}>1</span>
                  </Typography>
                  <Button
                    onClick={reportsHandler}
                    style={{ marginLeft: '1em' }}
                  >
                    <Icon>
                      <span class='material-icons-outlined'>expand_more</span>
                    </Icon>
                  </Button>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
        {reports && (
          <CardContent>
            <Typography
              gutterBottom
              variant={matchesXS ? 'h5' : 'h4'}
              align='center'
            >
              Αναφορές{' '}
            </Typography>
            <Divider
              style={{
                marginBottom: '1em',
                marginTop: '1em',
              }}
            />
            <Grid item container direction='row' justify='center'>
              <Grid item>
                <Typography
                  gutterBottom
                  variant='body2'
                  style={{ paddingRight: '1em' }}
                >
                  Χρήστης: <span className={classes.specialText}>Γρηγόρης</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant='body2'
                  style={{ paddingRight: '1em' }}
                >
                  Αρ. Ερωτήσεων: <span className={classes.specialText}>8</span>
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant='body2'
                  style={{ paddingRight: '1em' }}
                >
                  Ημερομηνία:{' '}
                  <span className={classes.specialText}>17/05/2021</span>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
}
