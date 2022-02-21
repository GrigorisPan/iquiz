import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { Icon } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  containerButtons: {
    display: 'flex',
    justifyContent: ' space-around',
    flexWrap: 'nowrap',
  },
  editButton: {
    backgroundColor: '#4caf50',
    marginRight: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#6fbf73',
    },
  },
  deleteButton: {
    ...theme.typography.mainButton,
    backgroundColor: '#ff1744',
    marginLeft: '0.2em',
    color: '#ffff',
    '&:hover': {
      backgroundColor: '#ff4569',
    },
  },
}));

export default function TableShow({
  columns,
  rows,
  rowsPerPage,
  page,
  setDeleteId,
  handleClickOpen,
  editBtn,
  editUrl,
  deleteBtn,
}) {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [rowData, setRowData] = useState(rows);
  const [createdAtOrderDirection, setCreatedAtOrderDirection] = useState('asc');
  const [updatedAtOrderDirection, setUpdatedAtOrderDirection] = useState('asc');
  const [query, setQuery] = useState('');
  const [columnToQuery, setColumnToQuery] = useState(`${columns[0].id}`);

  const handleChange = (event) => {
    setColumnToQuery(event.target.value);
  };

  const lowerCaseQuery = query.toLowerCase();

  const sortArray = (arr, orderBy, column) => {
    switch (orderBy) {
      case 'asc':
      default:
        if (column === 'createdAt') {
          return arr.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          );
        } else {
          return arr.sort((a, b) =>
            a.updatedAt > b.updatedAt ? 1 : b.updatedAt > a.updatedAt ? -1 : 0
          );
        }

      case 'desc':
        if (column === 'createdAt') {
          return arr.sort((a, b) =>
            a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
          );
        } else {
          return arr.sort((a, b) =>
            a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
          );
        }
    }
  };
  //console.log(rowData);
  const handleSortRequest = (column) => {
    if (column === 'createdAt') {
      setRowData(sortArray(rows, createdAtOrderDirection, column));
      setCreatedAtOrderDirection(
        createdAtOrderDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setRowData(sortArray(rows, updatedAtOrderDirection, column));
      setUpdatedAtOrderDirection(
        updatedAtOrderDirection === 'asc' ? 'desc' : 'asc'
      );
    }
  };

  return (
    <>
      <Grid
        item
        container
        direction='row'
        justify={matchesXS ? 'center' : 'space-between'}
        style={{ padding: '1em 1em' }}
      >
        <Grid item style={{ width: '10em', margin: '0.5em 0.5em' }}>
          <TextField
            label='Αναζήτηση'
            id='search'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete='false'
          />
        </Grid>
        <Grid item style={{ margin: '0.5em 0.5em' }}>
          <FormControl variant='standard' sx={{ m: 1, maxWidth: 120 }}>
            <InputLabel
              id='simple-select-standard-label'
              style={{ width: '100%' }}
            >
              Επίλεξε στήλη
            </InputLabel>
            <Select
              labelId='simple-select-standard-label'
              id='simple-select-standard'
              value={columnToQuery}
              onChange={handleChange}
              style={{ width: '8rem' }}
              label='Επίλεξε στήλη'
            >
              {columns.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 440, maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.id === 'updatedAt' ? (
                    <TableSortLabel
                      onClick={handleSortRequest.bind(this, 'updatedAt')}
                      active={true}
                      direction={updatedAtOrderDirection}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : column.id === 'createdAt' ? (
                    <TableSortLabel
                      onClick={handleSortRequest.bind(this, 'createdAt')}
                      active={true}
                      direction={createdAtOrderDirection}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData
              .filter((row) =>
                row[`${columnToQuery}`]
                  .toString()
                  .toLowerCase()
                  .includes(`${lowerCaseQuery}`)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                //console.log(row);
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value === 'more' ? (
                            <div className={classes.containerButtons}>
                              {editBtn && (
                                <Button
                                  className={classes.editButton}
                                  component={Link}
                                  to={`${editUrl}/${row.id}`}
                                >
                                  <Icon>
                                    <span className='material-icons'>edit</span>
                                  </Icon>
                                </Button>
                              )}
                              {deleteBtn && (
                                <Button
                                  className={classes.deleteButton}
                                  id={row.id}
                                  onClick={() => {
                                    setDeleteId(row.id);
                                    handleClickOpen();
                                    //console.log(row.id);
                                  }}
                                >
                                  <Icon>
                                    <span className='material-icons'>
                                      delete
                                    </span>
                                  </Icon>
                                </Button>
                              )}
                            </div>
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
