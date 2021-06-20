import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { quiz } from './quiz';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { Button } from '@material-ui/core';
import QuizActions from '../../ui/QuizActions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3),
    overflow: 'hidden',
  },
  cardMedia: {
    width: '70%',
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  moreButton: {
    ...theme.typography.mainButton,
    borderRadius: '50px',
    width: '220px',
    height: '35px',
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
}));

export default function InfoQuiz() {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      className={classes.mainContainer}
      spacing={3}
    >
      <Grid item container xs={12} sm={11} md={9} justify='center'>
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image='https://source.unsplash.com/random'
              title='Image title'
            />
          </Hidden>
          <Grid
            item
            container
            className={classes.fixedHeightPaper}
            justify='center'
          >
            <CardContent>
              <Typography variant='h5'>{quiz[0].title}</Typography>
              <Typography variant='subtitle1' paragraph>
                {quiz[0].body}
              </Typography>
              <Typography variant='subtitle2'>
                Συγγραφέας:{' '}
                <span className={classes.specialText}>{quiz[0].user.name}</span>
              </Typography>
              <Grid item container direction='column'>
                <Grid item>
                  <List>
                    <ListItem style={{ padding: '0.1em 0em' }}>
                      <ListItemIcon
                        className={classes.specialText}
                        style={{ marginRight: '0.5em', fontSize: '0.8em' }}
                      >
                        <Icon
                          style={{
                            marginRight: '0.5em',
                            color: '#8561c5',
                            fontSize: '1.5em',
                          }}
                        >
                          query_builder
                        </Icon>
                        15 δευτερόλεπτα/ερώτηση
                      </ListItemIcon>
                    </ListItem>
                    <ListItem style={{ padding: '0.1em 0em' }}>
                      <ListItemIcon
                        className={classes.specialText}
                        style={{ marginRight: '0.5em', fontSize: '0.8em' }}
                      >
                        <Icon
                          style={{
                            marginRight: '0.5em',
                            color: '#6fbf73',
                            fontSize: '1.5em',
                          }}
                        >
                          replay
                        </Icon>
                        5 φορές
                      </ListItemIcon>
                    </ListItem>
                    <ListItem style={{ padding: '0.1em 0em' }}>
                      <ListItemIcon
                        className={classes.specialText}
                        style={{ marginRight: '0.5em', fontSize: '0.8em' }}
                      >
                        <Icon
                          style={{
                            marginRight: '0.5em',
                            color: '#4dabf5',
                            fontSize: '1.5em',
                          }}
                        >
                          <span>quiz</span>
                        </Icon>
                        15 ερωτήσεις
                      </ListItemIcon>
                    </ListItem>
                    <ListItem style={{ padding: '0.1em 0em' }}>
                      <ListItemIcon
                        className={classes.specialText}
                        style={{ marginRight: '0.5em', fontSize: '0.8em' }}
                      >
                        <Icon
                          style={{
                            marginRight: '0.5em',
                            color: '#ed4b82',
                            fontSize: '1.5em',
                          }}
                        >
                          <span class='material-icons-outlined'>
                            mail_outline
                          </span>
                        </Icon>
                        greg@hotmail.com
                      </ListItemIcon>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item style={{ marginTop: '1em ' }}>
                  <Button className={classes.moreButton} variant='contained'>
                    Έναρξη
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
      <QuizActions />
    </Grid>
  );
}
