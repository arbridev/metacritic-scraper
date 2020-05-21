import { apiURL } from "../constants"

export const actionTypes = { ALBUMS_FETCH_PENDING: 'ALBUMS_FETCH_PENDING', ALBUMS_FETCH_SUCCESS: 'ALBUMS_FETCH_SUCCESS', ALBUMS_FETCH_ERROR: 'ALBUMS_FETCH_ERROR' };

export function fetchAlbumsPending() {
  return {
    type: actionTypes.ALBUMS_FETCH_PENDING
  }
}

export function fetchAlbumsSuccess(payload) {
  return {
    type: actionTypes.ALBUMS_FETCH_SUCCESS,
    payload: payload
  }
}

export function fetchAlbumsError(error) {
  return {
    type: actionTypes.ALBUMS_FETCH_ERROR,
    error: error
  }
}

export function fetchAlbums() {
  return dispatch => {
    dispatch(fetchAlbumsPending());
    let resOk = null;
    fetch(apiURL + '/albums', {
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
        return response.json();
      }
    )
    .then(
      (result) => {
        try {
          if (!resOk) {
              throw result;
          }
          dispatch(fetchAlbumsSuccess(result));
        } catch(error) {
          throw error;
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        if (/NetworkError/i.test(`${error}`)) {
          dispatch(fetchAlbumsError({error: 'Could not connect to server'}));
        } else {
          dispatch(fetchAlbumsError({error: `${error}`}));
        }
      }
    ).catch(error => {
      dispatch(fetchAlbumsError(error))
    });
  }
}