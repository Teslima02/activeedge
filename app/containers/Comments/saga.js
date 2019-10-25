import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { allCommentsSuccess, allCommentsError } from './actions';
import { GET_ALL_COMMENTS } from './constants';

const URI = 'https://jsonplaceholder.typicode.com';

export function* getAllComments() {
  const requestURL = `${URI}/comments`;

  try {
    const allCommentsResponse = yield call(request, requestURL);

    yield put(allCommentsSuccess(allCommentsResponse));
  } catch (err) {
    yield put(allCommentsError(err));
  }
}

// Individual exports for testing
export default function* commentsSaga() {
  yield takeLatest(GET_ALL_COMMENTS, getAllComments);
}
