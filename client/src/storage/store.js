import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
// import { loadState, saveState } from './local';
import { loadState, saveState } from './session';

const initialState = loadState();
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => saveState(store.getState()));

export default store;