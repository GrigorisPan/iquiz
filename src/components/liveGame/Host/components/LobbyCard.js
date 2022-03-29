import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  exitButton: {
    ...theme.typography.mainButton,
    padding: '0em 0em',
    color: '#cdcd00',
    margin: ' 0em 0.5em',
    '&:hover': {
      backgroundColor: '#cdcd00',
      color: '#fff',
    },
  },
  banButton: {
    ...theme.typography.mainButton,
    padding: '0em 0em',
    color: '#ff4569',
    margin: ' 0em 0.5em',
    '&:hover': {
      backgroundColor: '#ff4569',
      color: '#fff',
    },
  },
}));

export default function LobbyCard({ players, kickHandler, banHandler }) {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: '#e0e0e0',
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: '100%',
            },
          }}
        >
          <Paper
            elevation={6}
            style={{
              minHeight: '25em',
              minWidth: '40em',
              maxHeight: '25em',
              maxWidth: '40em',
              overflow: 'auto',
            }}
          >
            <Grid item container justify='center'>
              {players.map((player, i) => {
                if (player.name) {
                  return (
                    <Grid key={i} item container justify='center'>
                      <Grid item>
                        <Typography
                          variant='subtitle1'
                          style={{
                            color: '#3d3d3d',
                            fontWeight: '500',
                          }}
                        >
                          {player.name}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        style={{
                          alignSelf: 'center',
                          marginLeft: '1em',
                        }}
                      >
                        <Button
                          className={classes.exitButton}
                          onClick={() => kickHandler(player.playerId)}
                        >
                          <Icon>
                            <span className='material-icons-outlined'>
                              logout
                            </span>
                          </Icon>
                        </Button>
                        <Button
                          className={classes.banButton}
                          onClick={() => banHandler(player.playerId)}
                        >
                          <Icon>
                            <span className='material-icons-outlined'>
                              block
                            </span>
                          </Icon>
                        </Button>
                      </Grid>
                    </Grid>
                  );
                }
              })}
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </>
  );
}
