import {
  GET_ALL_ARTISTS,
  GET_ALL_ARTISTS_SUCCESS,
  GET_ALL_ARTISTS_ERROR,
} from './constants';

export function getAllArtists() {
  return {
    type: GET_ALL_ARTISTS,
  };
}

export function getAllArtistsSuccess(data) {
  return {
    type: GET_ALL_ARTISTS_SUCCESS,
    payload: data,
  };
}

export function getAllArtistsError() {
  return {
    type: GET_ALL_ARTISTS_ERROR,
  };
}
