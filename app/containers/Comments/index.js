/**
 *
 * Comments
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectComments, {
  makeSelectGetAllComments,
  makeSelectLoading,
  makeSelectError,
  makeSelectPostDialog,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AllCommentsList } from './components/AllCommentsList';
import { getAllComments, closeNewCommentDialog, openEditCommentDialog, closeEditCommentDialog, saveNewComment } from './actions';
import { CommentDialog } from './components/CommentDialog';

export function Comments({
  dispatchNewCommentAction,
  closeEditCommentDialog,
  openEditCommentDialog,
  closeNewCommentDialog,
  postDialog,
  dispatchAllCommentsAction,
  getAllComments,
  loading,
  error,
}) {
  useInjectReducer({ key: 'comments', reducer });
  useInjectSaga({ key: 'comments', saga });

  useEffect(() => {
    dispatchAllCommentsAction();
  }, []);

  console.log(dispatchAllCommentsAction, 'dispatchAllCommentsAction');
  console.log(getAllComments, 'getAllComments');

  return (
    <div>
      <Helmet>
        <title>Comments</title>
        <meta name="description" content="Description of Comments" />
      </Helmet>

      <AllCommentsList
        getAllComments={getAllComments}
        loading={loading}
        error={error}
      />

      <CommentDialog 
        postDialog={postDialog}
        closeNewCommentDialog={closeNewCommentDialog}
        closeEditCommentDialog={closeEditCommentDialog}
        dispatchNewCommentAction={dispatchNewCommentAction}
      />
    </div>
  );
}

Comments.propTypes = {
  dispatchAllCommentsAction: PropTypes.func,
  getAllComments: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  getAllComments: makeSelectGetAllComments(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  postDialog: makeSelectPostDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchAllCommentsAction: () => dispatch(getAllComments()),
    closeNewCommentDialog: () => dispatch(closeNewCommentDialog()),
    // openEditCommentDialog: () => dispatch(openEditCommentDialog()),
    closeEditCommentDialog: () => dispatch(closeEditCommentDialog()),
    dispatchNewCommentAction: evt => dispatch(saveNewComment(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Comments);
