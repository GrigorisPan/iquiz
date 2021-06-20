import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import { quiz } from './quiz';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonArrow from '../../ui/ButtonArrow';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  specialText: {
    color: theme.palette.common.orange,
  },
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [searched, setSeached] = useState('');
  const requestSearch = (searchValue) => {
    return;
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const onCancelSearch = () => {
    setSeached('');
    requestSearch(searched);
  };

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justify='center'>
        <Paper className={classes.search}>
          <InputBase
            className={classes.input}
            placeholder='Αναζήτηση'
            inputProps={{ 'aria-label': 'Search Quiz' }}
          />
          <IconButton
            type='submit'
            aria-label='search'
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
      <Divider style={{ marginTop: '1em' }} />
      <Grid
        item
        container
        spacing={3}
        justify='center'
        style={{ marginTop: '1.8em' }}
      >
        {quiz.map((item, i) => (
          <Grid item key={i} xs={12} sm={5} md={4} lg={3} xl={3}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image='https://source.unsplash.com/random'
                title='Image title'
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant='subtitle1' component='h2'>
                  {item.title}
                </Typography>

                <Typography variant='h6' paragraph>
                  {item.body}
                </Typography>
                <Typography variant='subtitle2'>
                  Συγγραφέας:{' '}
                  <span className={classes.specialText}>{item.user.name}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.continueButton}
                  component={Link}
                  to={'teacher/quiz/1'}
                >
                  Περισότερα
                  <ButtonArrow
                    width={15}
                    height={15}
                    fill={theme.palette.common.blue}
                  />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
