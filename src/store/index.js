import { createStore, applyMiddleware } from 'redux';
import { app } from '../reducers';

export function configureStore ({ initialState = {} } = {}) {
  const middlewares = [];

  return createStore(
    app,
    initialState,
    applyMiddleware(...middlewares)
  );
}
