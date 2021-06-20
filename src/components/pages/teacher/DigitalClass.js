import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  loginButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '240px',
    height: '40px',
    alignItems: 'center',
    backgroundColor: theme.palette.common.orange,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  button: {
    ...theme.typography.secondaryButton,
    color: theme.palette.common.blue,
  },
  root: {
    maxWidth: '70%',
  },
}));

export default function DigitalClass() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);
  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
    >
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant={matchesXS ? 'h4' : 'h3'}
          style={{
            marginBottom: '1em',
          }}
        >
          Δημιούργησε τώρα μια{' '}
          <span className={classes.specialText}>Ψηφιακή Τάξη</span>
        </Typography>
        <Grid item align='center'>
          <Button onClick={() => setOpen(true)}>
            <Icon
              style={{
                color: '#6fbf73',
                fontSize: '3em',
              }}
            >
              <span>add_box</span>
            </Icon>
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? '1em' : '3em',
            paddingBottom: matchesXS ? '1em' : '3em',
            paddingLeft: matchesXS ? '0em' : '5em',
            paddingRight: matchesXS ? '0em' : '5em',
          },
        }}
      >
        <DialogContent>
          <Grid container direction='column'>
            <Typography
              gutterBottom
              variant={matchesXS ? 'h4' : 'h3'}
              style={{
                marginBottom: '1em',
              }}
            >
              Δημιουργία{' '}
              <span className={classes.specialText}>Ψηφιακή Τάξη</span>
            </Typography>
            <Grid
              item
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={5}
            >
              <Grid item>
                <TextField
                  required
                  label='Τίτλος'
                  id='title'
                  autoComplete='false'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  label='Περιγραφή'
                  id='Περιγραφή'
                  multiline
                  fullWidth
                  rows={4}
                  variant='filled'
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              alignItems='center'
              justify='center'
              direction='row'
              style={{
                marginTop: '2em',
              }}
            >
              <Grid item>
                <Button
                  onClick={() => setOpen(false)}
                  className={classes.button}
                >
                  Πίσω
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' className={classes.loginButton}>
                  Δημοσίευση
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Grid item container xs={12} justify='center'>
        <Divider
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            width: '90%',
          }}
        />
        <Typography
          variant='h4'
          style={{
            marginBottom: '2em',
          }}
        >
          Οι Ψηφιακές σου <span className={classes.specialText}> Τάξεις</span>
        </Typography>
      </Grid>

      <Card className={classes.root}>
        <CardActionArea component={Link} to={'/teacher/digiClass/1'}>
          <Grid item container direction='row'>
            <Grid item sm={matchesXS ? '7' : '10'}>
              <Grid item container direction='column'>
                <CardContent>
                  <Grid item>
                    <Typography gutterBottom variant='h6'>
                      Πληροφορική
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                      Εκπαιδευτικός <br />
                      <span className={classes.specialText}>
                        Grigoris Panagiotopoulos
                      </span>
                    </Typography>
                    <Hidden smDown>
                      <Typography gutterBottom variant='subtitle2'>
                        Περιγραφή: <br /> They should be easy to scan for
                        relevant and actionable information. Elements, like text
                        and images, should be placed on them in a way that
                        clearly indicates hierarchy.
                      </Typography>
                    </Hidden>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
            <Grid item sm={matchesXS ? '5' : '2'}>
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
    </Grid>
  );
}
