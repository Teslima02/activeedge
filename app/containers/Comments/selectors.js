import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the comments state domain
 */

const selectCommentsDomain = state => state.comments || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Comments
 */

const makeSelectComments = () =>
  createSelector(
    selectCommentsDomain,
    substate => substate,
  );

const makeSelectGetAllComments = () =>
  createSelector(
    selectCommentsDomain,
    subState => subState.getAllComments,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCommentsDomain,
    subState => subState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectCommentsDomain,
    subState => subState.error,
  );

  const makeSelectPostDialog = () =>
  createSelector(
    selectCommentsDomain,
    subState => subState.postDialog,
  );

export default makeSelectComments;
export {
  selectCommentsDomain,
  makeSelectGetAllComments,
  makeSelectLoading,
  makeSelectError,
  makeSelectPostDialog,
};
