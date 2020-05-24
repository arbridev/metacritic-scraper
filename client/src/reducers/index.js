import { combineReducers } from 'redux';
import { albumReducer } from "./albumReducer";
import { genreReducer } from "./genreReducer";

const appReducer = combineReducers({
    album: albumReducer,
    genre: genreReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STATE') {
        state = undefined
    }
  
    return appReducer(state, action)
}

export default rootReducer;