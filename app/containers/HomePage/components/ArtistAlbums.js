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
// import AddButton from './AddButton';
import reducer from '../reducer';
import saga from '../saga';
import LoadingIndicator from '../../../components/LoadingIndicator';

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
//   dense: {
//     marginTop: 19,
//   },
//   menu: {
//     width: 200,
//   },
// }));

export function ArtistAlbums({
  artistAlbums,
  loading,
  error,
  openEditPostDialog,
  dispatchDeletePostAction,
}) {
  // const classes = useStyles();
  useInjectReducer({ key: 'allPosts', reducer });
  useInjectSaga({ key: 'allPosts', saga });

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
      name: 'userId',
      label: 'User Id',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'title',
      label: 'Title',
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
          const Post = artistAlbums.find(post => value === post.id);

          if (value === '') {
            return '';
          }
          return (
            <FormControlLabel
              label="Edit"
              control={<Icon>create</Icon>}
              onClick={evt => {
                evt.stopPropagation();
                openEditPostDialog(Post);
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
  };

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  return (
    <div>
      <MUIDataTable
        title="Artist Albums"
        data={artistAlbums}
        columns={columns}
        options={options}
      />
    </div>
  );
}

ArtistAlbums.propTypes = {
  artistAlbums: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openEditPostDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
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
)(ArtistAlbums);
