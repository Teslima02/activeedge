/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { CssBaseline, Typography, Grid } from '@material-ui/core';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { AllArtistList } from './components/AllArtistList';

const key = 'home';

export function HomePage({
  username,
  // loading,
  // error,
  // repos,
  onSubmitForm,
  // onChangeUsername,
}) {
  // const classes = useStyles();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
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
          <AllArtistList
            loading={loading}
            error={error}
            getAllPosts={getAllPosts}
            openEditPostDialog={openEditPostDialog}
            dispatchDeletePostAction={dispatchDeletePostAction}
          />

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
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
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
