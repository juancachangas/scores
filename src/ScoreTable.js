/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Score Data
function createData(id, firstName, lastName, email, gender, city, country, score, createdAt) {
  return { id, firstName, lastName, email, gender, city, country, score, createdAt };
}

const rows = [
  createData("a67e6828-99d9-4d8d-9cd7-8aff12e95973", "Murdock", "Ledstone", "mledstone0@mayoclinic.com", "Male", "Olofström", "SE", null, "2017-04-05T02:28:37Z"),
  createData("0d9d17cd-c3f4-476b-a089-ae0d973f5cd3", "Jaclin", "Casbourne", "jcasbourne1@nifty.com", "Female", "Kunvald", "CZ", 53, "2017-01-03T23:13:01Z"),
  createData("8a9f557a-9a87-4555-a70e-c20a07eb9488", "Sunshine", "Mattusevich", "smattusevich2@scribd.com", "Female", "Meiyao", "CN", 69, "2018-07-26T23:34:07Z"),
  createData("c87a857e-9b34-48f5-a182-4beffaa592ec", "Hadria", "Dunsmuir", "hdunsmuir3@typepad.com", null, null, "ID", null, "2017-01-13T04:17:49Z"),
  createData("ef71bf15-3191-405f-b855-3f0072582568", "Rainer", "Burrows", "rburrows4@i2i.jp", "Male", "Faratsiho", "MG", 69, "2019-06-05T16:09:27Z"),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ScoreTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Scores listing</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Last name</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#">
          See more scores
        </Link>
      </div>
    </React.Fragment>
  );
}
