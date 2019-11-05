import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems } from './listItems';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Chart from './Chart';
import ScoreTable from './ScoreTable';
import { getData } from './api/index';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [sortedRows, setSortedRows] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('');
  const [order, setOrder] = React.useState('desc');
  const [genderAverages, setGenderAverages] = React.useState(new Map());
  const [countryAverages, setCountryAverages] = React.useState(new Map());
  const [activeChart, setActiveChart] = React.useState('country');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  React.useEffect(() => {
    const fetchData = async () => {
      // Fetch data from endpoint
      let newRows = (await getData()).data;
      const groupByGender = new Map();
      const groupByCountry = new Map();
      newRows.forEach(row => {
        if(groupByGender.has(row.gender)) {
          const gender = groupByGender.get(row.gender);
          gender.totalScore += row.score;
          gender.scores += 1;
          gender.average = (gender.totalScore / gender.scores).toFixed(2)
        } else {
          groupByGender.set(row.gender, {
            totalScore: row.score,
            scores: 1,
            average: 0
          })
        }
        if(groupByCountry.has(row.country)) {
          const country = groupByCountry.get(row.country);
          country.totalScore += row.score;
          country.scores += 1;
          country.average = (country.totalScore / country.scores).toFixed(2)
        } else {
          groupByCountry.set(row.country, {
            totalScore: row.score,
            scores: 1,
            average: 0
          });
        }
      });
      setRows(newRows);
      setGenderAverages(groupByGender);
      setCountryAverages(groupByCountry);
    }
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log(orderBy, order)
    if(orderBy) {
      const newRows = rows.sort((a,b) => {
        const direction = order === 'desc' ? 1 : -1;
        const aEscaped = (a[orderBy] ? a[orderBy] : '');
        const bEscaped = (b[orderBy] ? b[orderBy] : '');
        if(aEscaped < bEscaped) {
          return 1 * direction;
        }
        if (aEscaped > bEscaped) {
          return -1 * direction;
        }
        return  0;
      });
      setSortedRows([...newRows]);
    }
  }, [orderBy, order, rows]);
  const averages = {'gender': genderAverages, 'country': countryAverages}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Holidu Interview Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>
          <ListSubheader inset>Saved reports</ListSubheader>
          <ListItem button onClick={() => setActiveChart('gender')} selected={activeChart === 'gender'}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Scores by gender" />
          </ListItem>
          <ListItem button onClick={() => setActiveChart('country')} selected={activeChart === 'country'}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Scores by country" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart type={activeChart} dataMap={averages[activeChart]}/>
              </Paper>
            </Grid>
            {/* Recent scores */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ScoreTable 
                  rows={sortedRows.length ? sortedRows : rows}
                  order={order}
                  orderBy={orderBy}
                  setOrder={setOrder}
                  setOrderBy={setOrderBy}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
