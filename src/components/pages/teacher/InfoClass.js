import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Icon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Hidden from '@material-ui/core/Hidden';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    minHeight: '88vh',
  },
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
    padding: theme.spacing(2),
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  table: {
    minWidth: 500,
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
}));

function createData(user, score, quiz_num) {
  return { user, score, quiz_num };
}

const rows = [
  createData('Γρηγόρης', 500, 5),
  createData('Ακης', 450, 6),
  createData('Ιωάννα', 350, 5),
  createData('Δημήτρης', 150, 5),
];

export default function InfoClass() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container direction='column' className={classes.mainContainer}>
      <Grid item container justify='center' className={classes.container}>
        <Card className={classes.root}>
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
        </Card>
      </Grid>

      <Grid item style={{ marginTop: '5em' }}>
        <Grid item container direction='row'>
          <Grid item xs={12} sm={12} md={4}>
            <Grid item container direction='column'>
              <Grid item align='center'>
                <List>
                  <Typography
                    component='h2'
                    variant='h6'
                    color='primary'
                    gutterBottom
                  >
                    Προτεινόμενα Κουίζ
                  </Typography>
                  <Divider />
                  <ListItem>
                    <Typography gutterBottom variant='subtitle2'>
                      Προτεινόμενα Κουίζ
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography gutterBottom variant='subtitle2'>
                      Προτεινόμενα Κουίζ
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography gutterBottom variant='subtitle2'>
                      Προτεινόμενα Κουίζ
                    </Typography>
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Grid
              item
              container
              direction='column'
              alignItems={matchesXS ? 'center' : 'flex-end'}
            >
              <Grid item align='center'>
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  Βαθμολογική Κατάταξη
                </Typography>
                <TableContainer>
                  <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Χρήστης</TableCell>
                        <TableCell align='right'>Βαθμολογία</TableCell>
                        <TableCell align='right'>Αρ. Κουίζ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.user}>
                          <TableCell component='th' scope='row'>
                            {row.user}
                          </TableCell>
                          <TableCell align='right'>{row.score}</TableCell>
                          <TableCell align='right'>{row.quiz_num}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
