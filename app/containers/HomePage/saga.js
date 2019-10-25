import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { GET_ALL_ARTISTS } from './constants';
import { getAllArtistsSuccess, getAllArtistsError } from './actions';

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

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(GET_ALL_ARTISTS, getArtists);
}
