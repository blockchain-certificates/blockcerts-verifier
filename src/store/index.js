import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from './logger/src/';
import { app } from '../reducers';
import { ENV } from '../utils/environment';
import getInitialState from './getInitialState';

export function configureStore (initialState = getInitialState()) {
  const middlewares = [thunk];
  if (ENV.debugEnabled) {
    // TODO: ensure the logger code does not make it to production build
    middlewares.push(logger);
  }

  return createStore(
    app,
    initialState,
    applyMiddleware(...middlewares)
  );
}
