/**
 *
 * AlbumPhotos
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
import { GridList, GridListTile } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import makeSelectAlbumPhotos from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectGetAlbumPhoto } from '../HomePage/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
}));

export function AlbumPhotos({ getAllAlbumPhotos }) {
  useInjectReducer({ key: 'albumPhotos', reducer });
  useInjectSaga({ key: 'albumPhotos', saga });

  const classes = useStyles();

  console.log(getAllAlbumPhotos, 'getAllAlbumPhotos');
  return (
    <div>
      <Helmet>
        <title>AlbumPhotos</title>
        <meta name="description" content="Description of AlbumPhotos" />
      </Helmet>

      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {getAllAlbumPhotos.map(tile => (
            <GridListTile key={tile.id} cols={tile.cols || 1}>
              <img src={tile.thumbnailUrl} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

AlbumPhotos.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllAlbumPhotos: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  albumPhotos: makeSelectAlbumPhotos(),
  getAllAlbumPhotos: makeSelectGetAlbumPhoto(),
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
)(AlbumPhotos);
