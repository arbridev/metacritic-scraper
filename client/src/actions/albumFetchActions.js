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
    let resOk = null;
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
      response => {
        resOk = response.ok;
        return response.json()
      }
    )
    .then(
      (result) => {
        try {
          if (!resOk) {
            throw result;
          }
          dispatch(fetchAlbumSuccess(result));
        } catch(error) {
          throw error;
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        if (/NetworkError/i.test(`${error}`)) {
          dispatch(fetchAlbumError({error: 'Could not connect to server'}));
        } else {
          dispatch(fetchAlbumError({error: `${error}`}));
        }
      }
    ).catch(error => {
      dispatch(fetchAlbumError(error))
    });
  }
}