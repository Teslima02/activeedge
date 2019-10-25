import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the albumPhotos state domain
 */

const selectAlbumPhotosDomain = state => state.albumPhotos || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AlbumPhotos
 */

const makeSelectAlbumPhotos = () =>
  createSelector(
    selectAlbumPhotosDomain,
    substate => substate,
  );

export default makeSelectAlbumPhotos;
export { selectAlbumPhotosDomain };
