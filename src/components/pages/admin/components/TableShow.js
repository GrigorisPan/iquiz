import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

  return (
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
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
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
                                  console.log(row.id);
                                }}
                              >
                                <Icon>
                                  <span className='material-icons'>delete</span>
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
  );
}
