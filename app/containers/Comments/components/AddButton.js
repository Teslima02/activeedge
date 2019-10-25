/**
 *
 * AllPosts
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { IconButton, Tooltip, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Add, CloudUpload } from '@material-ui/icons';
import reducer from '../reducer';
import saga from '../saga';
import { openNewCommentDialog } from '../actions';

const defaultToolbarStyles = {
  iconButton: {},
};

export function AddButton({
  classes,
  openNewCommentDialog,
  closeNewPostDialog,
  postDialog,
}) {
  useInjectReducer({ key: 'comments', reducer });
  useInjectSaga({ key: 'comments', saga });

  return (
    <React.Fragment>
      <Tooltip title="Add New Post">
        <IconButton
          className={classes.iconButton}
          onClick={openNewCommentDialog}
        >
          <Add className={classes.deleteIcon} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

AddButton.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewCommentDialog: PropTypes.func,
  closeNewPostDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewCommentDialog: () => dispatch(openNewCommentDialog()),
    // closeNewPostDialog: () => dispatch(closeNewPostDialog()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(defaultToolbarStyles, { name: 'CustomToolbar' }),
  withConnect,
  memo,
)(AddButton);
