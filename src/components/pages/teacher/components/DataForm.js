import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Button, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: '0em',
    },
  },
  continueButton: {
    ...theme.typography.secondaryButton,
    borderColor: theme.palette.common.blue,
    color: theme.palette.common.blue,
    height: 40,
    width: 145,
    marginTop: '0.7em',
  },
  dateTime: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 250,
    [theme.breakpoints.down('xs')]: {
      width: 185,
    },
  },
  textField: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7em',
    },
    fontSize: '1em',
  },
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
}));
export default function DataForm() {
  const classes = useStyles();
  const theme = useTheme();
  const [currentFile, setCurrentFile] = useState('undefined');

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const selectFile = (e) => {
    setCurrentFile(e.target.files[0]);
  };

  return (
    <Grid
      container
      justify='center'
      alignContent='center'
      className={classes.mainContainer}
    >
      <Grid
        item
        container
        direction='column'
        spacing={2}
        xs={12}
        sm={10}
        md={9}
        lg={6}
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
            label='Κατηγορία'
            id='category'
            autoComplete='false'
            fullWidth
          />
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='type-user-select-label'>Χρόνος/Ερώτηση</InputLabel>
            <Select labelId='type-user-select-label' id='user-select'>
              <MenuItem>10</MenuItem>
              <MenuItem>15</MenuItem>
              <MenuItem>20</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            label='Περιγραφή'
            id='Περιγραφή'
            multiline
            rows={4}
            fullWidth
            variant='filled'
          />
        </Grid>
        <Grid item>
          <div className='file-name'>
            {currentFile ? currentFile.name : null}
          </div>
          <label htmlFor='btn-upload'>
            <input
              id='btn-upload'
              name='btn-upload'
              style={{ display: 'none' }}
              type='file'
              accept='image/*'
              onChange={selectFile}
            />
            <Button
              className='btn-choose'
              variant='outlined'
              component='span'
              className={classes.continueButton}
            >
              Εισαγωγή
            </Button>
          </label>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='type-user-select-label'>Κατάσταση</InputLabel>
            <Select labelId='type-user-select-label' id='user-select'>
              <MenuItem>Ιδιωτικό</MenuItem>
              <MenuItem>Δημόσιο</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <form className={classes.dateTime} noValidate>
            <TextField
              id='start dateTime'
              label='Έναρξη'
              type='datetime-local'
              defaultValue='2021-01-01T10:30'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
        <Grid item>
          <form className={classes.dateTime} noValidate>
            <TextField
              id='end dateTime'
              label='Λήξη'
              type='datetime-local'
              defaultValue='2021-01-01T10:30'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}
