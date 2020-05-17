import { apiURL } from "../constants"

export const actionTypes = { ALBUM_FETCH_PENDING: 'ALBUM_FETCH_PENDING', ALBUM_FETCH_SUCCESS: 'ALBUM_FETCH_SUCCESS', ALBUM_FETCH_ERROR: 'ALBUM_FETCH_ERROR' };

export function fetchAlbumPending() {
    return {
      type: actionTypes.ALBUM_FETCH_PENDING
    }
}

export function fetchAlbumSuccess(payload) {
    return {
      type: actionTypes.ALBUM_FETCH_SUCCESS,
      payload: payload
    }
}

export function fetchAlbumError(error) {
    return {
      type: actionTypes.ALBUM_FETCH_ERROR,
      error: error
    }
}

export function fetchAlbum(albumId) {
  return dispatch => {
    dispatch(fetchAlbumPending());
    fetch(apiURL + '/album/' + albumId, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        //   Token: user.token
        // },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
    })
    .then(
      response => response.text(),
      // Do not use catch, because that will also catch
      // any errors in the dispatch and resulting render,
      // causing a loop of 'Unexpected batch number' errors.
      // https://github.com/facebook/react/issues/6895
      error => {
        throw error;
      }
    )
    .then(text => {
      // Error responses are not catched by fetch API
      try {
        const json = JSON.parse(text);
        if (json.error === undefined) { // only errors contains an 'error' property
          dispatch(fetchAlbumSuccess(json));
        } else {
          dispatch(fetchAlbumError(json));
        }
      } catch(textError) {
        console.error(textError);
        throw text;
      }
    })
    .catch(error => dispatch(fetchAlbumError(error)));
  }
}