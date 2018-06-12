import { createStore, applyMiddleware } from 'redux';
import { logger } from './logger/src/';
import { app } from '../reducers';
import { ENV } from '../utils/environment';

export function configureStore ({ initialState = {} } = {}) {
  const middlewares = [];
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
