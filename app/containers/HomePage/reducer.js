import produce from 'immer';
import {
  GET_ALL_ARTISTS,
  GET_ALL_ARTISTS_SUCCESS,
  GET_ALL_ARTISTS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  getAllArtists: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_ARTISTS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case GET_ALL_ARTISTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllArtists: action.payload,
          // draft: { 'draft.getAllPosts': action.payload },
        };
      }
      case GET_ALL_ARTISTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
    }
  });

export default homeReducer;
