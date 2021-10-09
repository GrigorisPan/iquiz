import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Icon } from '@material-ui/core';

import { listQuizzes } from '../../../actions/quizActions';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
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
  editButton: {
    backgroundColor: '#4caf50',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  deleteButton: {
    backgroundColor: '#ff1744',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
}));

export default function Library({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const [searched, setSeached] = useState('');
  const dispatch = useDispatch();
  const user_id = 1;
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const requestSearch = (searchValue) => {
    return;
  };

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

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justify='center'>
        <Grid item>
          <Typography
            gutterBottom
            variant={matchesXS ? 'h4' : 'h3'}
            align='center'
            style={{
              marginBottom: '1em',
            }}
          >
            Τα <span className={classes.specialText}>Κουίζ </span>σου
          </Typography>
        </Grid>
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
          {quizzes.map(
            (item, i) =>
              item.user_id === user_id && (
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
                      <Grid
                        item
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                      >
                        <Button
                          className={classes.editButton}
                          component={Link}
                          to={`#`}
                        >
                          <Icon>
                            <span class='material-icons-outlined'>edit</span>
                          </Icon>
                        </Button>

                        <Button
                          className={classes.deleteButton}
                          component={Link}
                          to={`#`}
                        >
                          <Icon>
                            <span class='material-icons-outlined'>delete</span>
                          </Icon>
                        </Button>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              )
          )}
        </Grid>
      )}
    </Grid>
  );
}
