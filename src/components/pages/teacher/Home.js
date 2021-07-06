import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listQuizzes } from '../../../actions/quizActions';
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
import Loader from '../../ui/Loader';
import Button from '@material-ui/core/Button';
import Message from '../../ui/Message';
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
  const dispatch = useDispatch();

  const requestSearch = (searchValue) => {
    return;
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const onCancelSearch = () => {
    setSeached('');
    requestSearch(searched);
  };

  const quizList = useSelector((state) => state.quizList);
  const { loading, error, quizzes } = quizList;

  useEffect(() => {
    dispatch(listQuizzes());
  }, [dispatch]);

  const displayDate = (timestamp) => {
    const todate = new Date(timestamp).getDate();
    const tomonth = new Date(timestamp).getMonth() + 1;
    const toyear = new Date(timestamp).getFullYear();
    const original_date = tomonth + '/' + todate + '/' + toyear;
    return original_date;
  };
  console.log(error);
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Grid container justify='center'>
          <Message severity='error'>{error}</Message>
        </Grid>
      ) : (
        <Grid
          item
          container
          spacing={3}
          justify='center'
          style={{ marginTop: '1.8em' }}
        >
          {quizzes.map((item, i) => (
            <Grid item key={i} xs={12} sm={5} md={4} lg={3} xl={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='https://source.unsplash.com/random'
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h6' component='h2'>
                    {item.title}
                  </Typography>

                  {/* <Typography variant='h6' paragraph>
                  {item.description}
                </Typography> */}
                  <Typography variant='body2'>
                    Συγγραφέας:{' '}
                    <span className={classes.specialText}>
                      {item.users_p.username}
                    </span>
                  </Typography>
                  <Typography variant='subtitle2'>
                    Ημερομηνία:{' '}
                    <span className={classes.specialText}>
                      {displayDate(item.createdAt)}
                    </span>
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
      )}
    </Grid>
  );
}
