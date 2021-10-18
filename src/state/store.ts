import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers  from "./reducers";
import { ActionType } from "./actions-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

const state = store.getState();

