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
import { CssBaseline, Grid } from '@material-ui/core';
import { getAllArtists } from './actions';
import {
  makeSelectGetAllArtists,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { AllArtistList } from './components/AllArtistList';

const key = 'home';

export function HomePage({ allArtists, artists, loading, error }) {
  // const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    allArtists();
  }, []);

  console.log(artists, 'artists');

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
          <AllArtistList loading={loading} error={error} artists={artists} />

          {/* <AllPostsDialog
            postDialog={postDialog}
            closeNewPostDialog={closeNewPostDialog}
            dispatchNewPostAction={dispatchNewPostAction}
            closeEditPostDialog={closeEditPostDialog}
            dispatchUpdatePostAction={dispatchUpdatePostAction}
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  allArtists: PropTypes.func,
  artists: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  artists: makeSelectGetAllArtists(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    allArtists: () => dispatch(getAllArtists()),
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
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
