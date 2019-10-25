import {
  GET_ALL_ARTISTS,
  GET_ALL_ARTISTS_SUCCESS,
  GET_ALL_ARTISTS_ERROR,
  GET_ALL_ARTIST_ALBUMS,
  GET_ALL_ARTIST_ALBUMS_ERROR,
  GET_ALL_ARTIST_ALBUMS_SUCCESS,
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

export function getArtistAlbums() {
  return {
    type: GET_ALL_ARTIST_ALBUMS,
  };
}

export function getArtistAlbumsSuccess(data) {
  return {
    type: GET_ALL_ARTIST_ALBUMS_SUCCESS,
    payload: data,
  };
}

export function getArtistAlbumsError() {
  return {
    type: GET_ALL_ARTIST_ALBUMS_ERROR,
  };
}
