/**
 *
 * AllPosts
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Grid,
  Paper,
  TextField,
  makeStyles,
  FormControlLabel,
  Icon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import makeSelectAllPosts from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import { closeNewPostDialog } from '../actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export function AllPostsDialog({ postDialog, closeNewPostDialog }) {
  const classes = useStyles();
  useInjectReducer({ key: 'allPostsDialog', reducer });
  useInjectSaga({ key: 'allPostsDialog', saga });

  const [values, setValues] = React.useState({
    title: '',
    description: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // useEffect(() => {
  //   console.log(postDialog, 'effect postDialog');
  // });

  // const closeComposeDialog = () => {
  //   postDialog.type === 'edit' ? closeNewPostDialog : closeNewPostDialog;
  // };

  return (
    <div>
      <Dialog
        {...postDialog.props}
        onClose={closeNewPostDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <AppBar position="static" elevation={1}>
          <Toolbar>
            <Typography variant="h6">
              {postDialog.type === 'new' ? 'New Post' : 'Edit Post'}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {postDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-title"
                label="Title"
                className={classes.textField}
                value={values.title}
                onChange={handleChange('title')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-description"
                label="Description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                fullWidth
                multiline
                rows="4"
              />
            </div>
          ) : (
            <div>
              <TextField
                id="standard-title"
                label="Title"
                className={classes.textField}
                value={values.title}
                onChange={handleChange('title')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-description"
                label="Description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                fullWidth
                multiline
                rows="4"
              />
            </div>
          )}
        </DialogContent>
        {postDialog.type === 'new' ? (
          <DialogActions>
            <Button
              onClick={closeNewPostDialog}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
            <Button
              onClick={closeNewPostDialog}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button
              onClick={() => {
                // saveBondsProduct(setValues);
                closeNewPostDialog;
              }}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={closeNewPostDialog}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

AllPostsDialog.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  closeNewPostDialog: PropTypes.func,
  postDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allPosts: makeSelectAllPosts(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewPostDialog: () => dispatch(closeNewPostDialog()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AllPostsDialog);
