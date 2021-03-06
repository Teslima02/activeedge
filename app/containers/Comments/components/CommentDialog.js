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
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import makeSelectAllPosts from '../selectors';
import reducer from '../reducer';
import saga from '../saga';

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

export function CommentDialog({
  dispatchNewCommentAction,
  postDialog,
  openEditCommentDialog,
  closeEditCommentDialog,
  closeNewCommentDialog,
  dispatchNewPostAction,
  dispatchUpdatePostAction,
}) {
  const classes = useStyles();
  useInjectReducer({ key: 'allPosts', reducer });
  useInjectSaga({ key: 'allPosts', saga });

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    body: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    setValues({
      ...postDialog.data,
    });
  }, [postDialog.data]);

  return (
    <div>
      <Dialog
        {...postDialog.props}
        onClose={closeNewCommentDialog}
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
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-title"
                label="email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-description"
                label="body"
                className={classes.textField}
                value={values.body}
                onChange={handleChange('body')}
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
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-title"
                label="email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-description"
                label="body"
                className={classes.textField}
                value={values.body}
                onChange={handleChange('body')}
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
              onClick={() => {
                dispatchNewCommentAction(values);
                closeNewCommentDialog();
              }}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
            <Button
              onClick={() => closeNewCommentDialog()}
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
                dispatchUpdatePostAction(values);
                closeNewCommentDialog();
              }}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
            <Button
              onClick={() => closeNewCommentDialog()}
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

CommentDialog.propTypes = {
  dispatchNewPostAction: PropTypes.func,
  closeNewCommentDialog: PropTypes.func,
  postDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allPosts: makeSelectAllPosts(),
});

function mapDispatchToProps(dispatch) {
  return {
    // closeNewCommentDialog: () => dispatch(closeNewCommentDialog()),
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
)(CommentDialog);
