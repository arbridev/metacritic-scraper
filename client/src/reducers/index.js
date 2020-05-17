import { combineReducers } from 'redux';
import { albumReducer } from "./albumReducer";

const appReducer = combineReducers({
    album: albumReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_STATE') {
        state = undefined
    }
  
    return appReducer(state, action)
}

export default rootReducer;