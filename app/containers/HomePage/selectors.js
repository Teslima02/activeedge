/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectGetAllArtists = () =>
  createSelector(
    selectHome,
    subState => subState.getAllArtists,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHome,
    subState => subState.error,
  );

const makeSelectGetArtistAlbums = () =>
  createSelector(
    selectHome,
    subState => subState.getArtistAlbums,
  );

const makeSelectGetAlbumId = () =>
  createSelector(
    selectHome,
    subState => subState.albumId,
  );

const makeSelectGetAlbumPhoto = () =>
  createSelector(
    selectHome,
    subState => subState.getAlbumPhoto,
  );

export {
  selectHome,
  makeSelectUsername,
  makeSelectGetAllArtists,
  makeSelectLoading,
  makeSelectError,
  makeSelectGetArtistAlbums,
  makeSelectGetAlbumPhoto,
  makeSelectGetAlbumId,
};
