/*
 *
 * Comments actions
 *
 */

import {
  OPEN_NEW_COMMENT_DIALOG,
  CLOSE_NEW_COMMENT_DIALOG,
  OPEN_EDIT_COMMENT_DIALOG,
  CLOSE_EDIT_COMMENT_DIALOG,
  SAVE_NEW_COMMENT,
  GET_ALL_COMMENTS,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_ERROR,
  SAVE_NEW_COMMENT_SUCCESS,
  SAVE_NEW_COMMENT_ERROR,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './constants';

export function openNewCommentDialog() {
  return {
    type: OPEN_NEW_COMMENT_DIALOG,
  };
}

export function closeNewCommentDialog() {
  return {
    type: CLOSE_NEW_COMMENT_DIALOG,
  };
}

export function openEditCommentDialog(data) {
  return {
    type: OPEN_EDIT_COMMENT_DIALOG,
    payload: data,
  };
}

export function closeEditCommentDialog() {
  return {
    type: CLOSE_EDIT_COMMENT_DIALOG,
  };
}

export function getAllComments() {
  return {
    type: GET_ALL_COMMENTS,
  };
}

export function allCommentsSuccess(data) {
  return {
    type: GET_ALL_COMMENTS_SUCCESS,
    payload: data,
  };
}

export function allCommentsError(data) {
  return {
    type: GET_ALL_COMMENTS_ERROR,
    payload: data,
  };
}

export function saveNewComment(data) {
  return {
    type: SAVE_NEW_COMMENT,
    payload: data,
  };
}

export function saveNewCommentSuccess(data) {
  return {
    type: SAVE_NEW_COMMENT_SUCCESS,
    payload: data,
  };
}

export function saveNewCommentError(data) {
  return {
    type: SAVE_NEW_COMMENT_ERROR,
    payload: data,
  };
}

export function updateComment(data) {
  return {
    type: UPDATE_COMMENT,
    payload: data,
  };
}

export function updateCommentSuccess(data) {
  return {
    type: UPDATE_COMMENT_SUCCESS,
    payload: data,
  };
}

export function updateCommentError(data) {
  return {
    type: UPDATE_COMMENT_ERROR,
    payload: data,
  };
}

export function deleteComment(data) {
  return {
    type: DELETE_COMMENT,
    payload: data,
  };
}

export function deleteCommentSuccess(data) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: data,
  };
}

export function deleteCommentError() {
  return {
    type: DELETE_COMMENT_ERROR,
    payload: data,
  };
}
