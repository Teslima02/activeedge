/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  CssBaseline,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import { getAllArtists, getArtistAlbums, getAlbumPhoto } from './actions';
import {
  makeSelectGetAllArtists,
  makeSelectLoading,
  makeSelectError,
  makeSelectArtistAlbums,
  makeSelectGetArtistAlbums,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { AllArtistList } from './components/AllArtistList';
import { ArtistAlbums } from './components/ArtistAlbums';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const key = 'home';

export function HomePage({
  allArtists,
  artists,
  loading,
  error,
  artistAlbumsAction,
  artistAlbums,
  albumIdAction,
  history,
}) {
  // const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    allArtists();
    artistAlbumsAction();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="All Artists" {...a11yProps(0)} />
                <Tab label="Artist Albums" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <AllArtistList
                loading={loading}
                error={error}
                artists={artists}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ArtistAlbums
                loading={loading}
                error={error}
                artistAlbums={artistAlbums}
                albumIdAction={albumIdAction}
                history={history}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  history: PropTypes.object,
  albumIdAction: PropTypes.func,
  artistAlbumsAction: PropTypes.func,
  artists: PropTypes.array,
  allArtists: PropTypes.func,
  artistAlbums: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  artistAlbums: makeSelectGetArtistAlbums(),
  artists: makeSelectGetAllArtists(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    albumIdAction: evt => dispatch(getAlbumPhoto(evt)),
    artistAlbumsAction: () => dispatch(getArtistAlbums()),
    allArtists: () => dispatch(getAllArtists()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
