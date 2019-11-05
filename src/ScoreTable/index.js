/* eslint-disable no-script-url */

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';


const labels = [{
  id: 'last_name',
  label: 'Last Name'
  },{
    id: 'first_name',
    label: 'First Name'
  },{
    id: 'gender',
    label: 'Gender'
  },{
    id: 'city',
    label: 'City'
  },{
    id: 'country',
    label: 'Country'
  },{
    id: 'score',
    label: 'Score'
  }
];

const ScoreTable = ({
  rows, 
  orderBy,
  setOrderBy,
  order,
  setOrder
}) => {
  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {labels.map(header => {
              const isActive = orderBy === header.id;
              return (
                <TableCell
                  key={header.id}
                  sortDirection={ isActive ? order : false}
                >
                  <TableSortLabel
                    active={isActive}
                    direction={order}
                    onClick={() => {
                      setOrderBy(header.id);
                      setOrder(order === 'desc' ? 'asc' : 'desc');
                    }}
                  >
                    {header.label}
                  </TableSortLabel>
                </TableCell>
                );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
export default ScoreTable;