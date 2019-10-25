import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { GET_ALL_ARTISTS, GET_ALL_ARTIST_ALBUMS, GET_ALBUM_PHOTO } from './constants';
import {
  getAllArtistsSuccess,
  getAllArtistsError,
  getArtistAlbumsSuccess,
  getArtistAlbumsError,
  getAlbumPhotoSuccess,
  getAlbumPhotoError,
} from './actions';
import { makeSelectGetAlbumId } from './selectors';

const URI = 'https://jsonplaceholder.typicode.com';

export function* getArtists() {
  const requestURL = `${URI}/users`;

  try {
    const allArtistsResponse = yield call(request, requestURL);

    yield put(getAllArtistsSuccess(allArtistsResponse));
  } catch (err) {
    yield put(getAllArtistsError(err));
  }
}

export function* artistAlbums() {
  const requestURL = `${URI}/albums`;

  try {
    const allArtistsResponse = yield call(request, requestURL);

    yield put(getArtistAlbumsSuccess(allArtistsResponse));
  } catch (err) {
    yield put(getArtistAlbumsError(err));
  }
}

export function* albumPhoto() {
  const albumId = yield select(makeSelectGetAlbumId());

  const requestURL = `${URI}/albums/${albumId}/photos`;

  try {
    const allArtistsResponse = yield call(request, requestURL);

    yield put(getAlbumPhotoSuccess(allArtistsResponse));
  } catch (err) {
    yield put(getAlbumPhotoError(err));
  }
}

export default function* homeData() {
  yield takeLatest(GET_ALL_ARTISTS, getArtists);
  yield takeLatest(GET_ALL_ARTIST_ALBUMS, artistAlbums);
  yield takeLatest(GET_ALBUM_PHOTO, albumPhoto);
}
