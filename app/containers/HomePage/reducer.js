import produce from 'immer';
import {
  GET_ALL_ARTISTS,
  GET_ALL_ARTISTS_SUCCESS,
  GET_ALL_ARTISTS_ERROR,
  GET_ALL_ARTIST_ALBUMS,
  GET_ALL_ARTIST_ALBUMS_SUCCESS,
  GET_ALL_ARTIST_ALBUMS_ERROR,
  GET_ALBUM_PHOTO,
  GET_ALBUM_PHOTO_SUCCESS,
  GET_ALBUM_PHOTO_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  getAllArtists: [],
  artistAlbums: [],
  albumId: {},
  getAlbumPhoto: [],
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
        };
      }
      case GET_ALL_ARTISTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case GET_ALL_ARTIST_ALBUMS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case GET_ALL_ARTIST_ALBUMS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getArtistAlbums: action.payload,
        };
      }
      case GET_ALL_ARTIST_ALBUMS_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case GET_ALBUM_PHOTO: {
        return {
          ...state,
          loading: true,
          error: false,
          albumId: action.payload,
        };
      }
      case GET_ALBUM_PHOTO_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAlbumPhoto: action.payload,
        };
      }
      case GET_ALBUM_PHOTO_ERROR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
    }
  });

export default homeReducer;
