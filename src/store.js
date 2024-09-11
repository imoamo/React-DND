// store.js
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // defaults to localStorage for web
import lanesReducer from './reducers/lanesReducer';
import blocksReducer from './reducers/blocksReducer';
import filterReducer from './reducers/filterReducer';

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['lanes', 'blocks']  // Only persist lanes and blocks, omit filter if you don't want to persist it
};

const rootReducer = combineReducers({
  lanes: lanesReducer,
  blocks: blocksReducer,
  filter: filterReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = legacy_createStore(persistedReducer);

// Configure persistor
export const persistor = persistStore(store);

export default store;
