import { actionTypes as genresFetch } from "../actions/genresFetchActions";

const RESET = 'RESET_GENRE';

export function reset() {
  return {
    type: RESET
  }
}

const initialState = {
  genresFetchPending: false,
  genresFetchSuccess: [],
  genresFetchError: null
}

export const genreReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch genres
    case genresFetch.GENRES_FETCH_PENDING:
      return Object.assign({}, state, {
        ...state,
        genresFetchPending: true,
        genresFetchSuccess: initialState.genresFetchSuccess,
        genresFetchError: initialState.genresFetchError
      })
    case genresFetch.GENRES_FETCH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        genresFetchPending: false,
        genresFetchSuccess: action.payload
      })
    case genresFetch.GENRES_FETCH_ERROR:
      return Object.assign({}, state, {
        ...state,
        genresFetchPending: false,
        genresFetchError: action.error
      })
    // Reset
    case RESET:
      return initialState
    default:
      return state
  }
}