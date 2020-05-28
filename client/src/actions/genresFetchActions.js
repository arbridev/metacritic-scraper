import { apiURL } from "../constants"

export const actionTypes = { GENRES_FETCH_PENDING: 'GENRES_FETCH_PENDING', GENRES_FETCH_SUCCESS: 'GENRES_FETCH_SUCCESS', GENRES_FETCH_ERROR: 'GENRES_FETCH_FETCH_ERROR' };

export function fetchGenresPending() {
  return {
    type: actionTypes.GENRES_FETCH_PENDING
  }
}

export function fetchGenresSuccess(payload) {
  return {
    type: actionTypes.GENRES_FETCH_SUCCESS,
    payload: payload
  }
}

export function fetchGenresError(error) {
  return {
    type: actionTypes.GENRES_FETCH_ERROR,
    error: error
  }
}

export function fetchGenres() {
  return dispatch => {
    dispatch(fetchGenresPending());
    let resOk = null;
    console.log('Url:', apiURL + '/genres');
    fetch(apiURL + '/genres', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
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
          dispatch(fetchGenresSuccess(result));
        } catch(error) {
          throw error;
        }
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        if (/NetworkError/i.test(`${error}`)) {
          dispatch(fetchGenresError({error: 'Could not connect to server'}));
        } else {
          dispatch(fetchGenresError({error: `${error}`}));
        }
      }
    ).catch(error => {
      dispatch(fetchGenresError(error))
    });
  }
}