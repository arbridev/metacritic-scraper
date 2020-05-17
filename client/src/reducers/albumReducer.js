import { actionTypes } from "../actions/albumFetchActions";

const RESET = 'RESET_ALBUM';

export function reset() {
  return {
    type: RESET
  }
}

const initialState = {
  albumFetchPending: false,
  albumFetchSuccess: {},
  albumFetchError: null
}

export const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch
    case actionTypes.ALBUM_FETCH_PENDING:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: true,
        albumFetchError: initialState.albumFetchError
      })
    case actionTypes.ALBUM_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: false,
        albumFetchSuccess: action.payload
      })
    case actionTypes.ALBUM_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        albumFetchPending: false,
        albumFetchError: action.error
      })
    // Reset
    case RESET:
      return initialState
    default:
      return state
  }
}