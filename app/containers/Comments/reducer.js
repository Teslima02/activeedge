/*
 *
 * Comments reducer
 *
 */
import produce from 'immer';
import {
  OPEN_NEW_COMMENT_DIALOG,
  CLOSE_NEW_COMMENT_DIALOG,
  OPEN_EDIT_COMMENT_DIALOG,
  CLOSE_EDIT_COMMENT_DIALOG,
  GET_ALL_COMMENTS,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_ERROR,
  SAVE_NEW_COMMENT,
  SAVE_NEW_COMMENT_SUCCESS,
  SAVE_NEW_COMMENT_ERROR,
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from './constants';


export const initialState = {
  getAllComments: [],
  newPost: {},
  // updatePost: {},
  postData: {},
  loading: false,
  error: false,
  postDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const commentsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case GET_ALL_COMMENTS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case GET_ALL_COMMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllComments: action.payload,
        };
      }
      case GET_ALL_COMMENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case OPEN_NEW_COMMENT_DIALOG: {
        return {
          ...state,
          postDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case CLOSE_NEW_COMMENT_DIALOG: {
        return {
          ...state,
          postDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
    }
  });

export default commentsReducer;
