import { actionTypes as albumFetch } from "../actions/albumFetchActions";
import { actionTypes as albumsFetch } from "../actions/albumsFetchActions";

const RESET = 'RESET_ALBUM';

export function reset() {
  return {
    type: RESET
  }
}

const initialState = {
  albumFetchPending: false,
  albumFetchSuccess: {},
  albumFetchError: null,
  albumsFetchPending: false,
  albumsFetchSuccess: [],
  albumsFetchError: null
}

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch album
    case albumFetch.ALBUM_FETCH_PENDING:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: true,
        albumFetchSuccess: initialState.albumFetchSuccess,
        albumFetchError: initialState.albumFetchError
      })
    case albumFetch.ALBUM_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: false,
        albumFetchSuccess: action.payload
      })
    case albumFetch.ALBUM_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: false,
        albumFetchError: action.error
      })
    // Fetch albums
    case albumsFetch.ALBUMS_FETCH_PENDING:
      return Object.assign({}, state, {
        ...state,
        albumsFetchPending: true,
        albumsFetchSuccess: initialState.albumsFetchSuccess,
        albumsFetchError: initialState.albumsFetchError
      })
    case albumsFetch.ALBUMS_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        albumsFetchPending: false,
        albumsFetchSuccess: action.payload
      })
    case albumsFetch.ALBUMS_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        albumsFetchPending: false,
        albumsFetchError: action.error
      })
    // Reset
    case RESET:
      return initialState
    default:
      return state
  }
}