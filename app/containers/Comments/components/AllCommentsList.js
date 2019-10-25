/**
 *
 * AllPosts
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles, FormControlLabel, Icon, List } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import AddButton from './AddButton';
import { makeSelectPostDialog, makeSelectGetAllPosts } from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import {
  openNewPostDialog,
  closeNewPostDialog,
  allPosts,
  openEditCommentDialog,
} from '../actions';
import LoadingIndicator from '../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

export function AllCommentsList({
  getAllComments,
  loading,
  error,
  openEditCommentDialog,
  dispatchDeletePostAction,
}) {
  const classes = useStyles();
  useInjectReducer({ key: 'comments', reducer });
  useInjectSaga({ key: 'comments', saga });

  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
          return (
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'body',
      label: 'Body',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Edit',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const Post = getAllComments.find(post => value === post.id);

          if (value === '') {
            return '';
          }
          return (
            <FormControlLabel
              label="Edit"
              control={<Icon>create</Icon>}
              onClick={evt => {
                evt.stopPropagation();
                openEditCommentDialog(Post);
              }}
            />
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Delete',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const Post = getAllComments.find(post => value === post.id);

          if (value === '') {
            return '';
          }
          return (
            <FormControlLabel
              label="Delete"
              control={<Icon>delete</Icon>}
              onClick={evt => {
                evt.stopPropagation();
                dispatchDeletePostAction(Post);
              }}
            />
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => <AddButton />,
  };

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  return (
    <div>
      <MUIDataTable
        title="All Posts"
        data={getAllComments}
        columns={columns}
        options={options}
      />
    </div>
  );
}

AllCommentsList.propTypes = {
  getAllComments: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  // getAllPosts: makeSelectGetAllPosts(),
  // postDialog: makeSelectPostDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditCommentDialog: evt => dispatch(openEditCommentDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AllCommentsList);
