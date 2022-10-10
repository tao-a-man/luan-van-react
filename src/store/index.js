// Redux Persis
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer'; // giá trị trả về từ combineReducers

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['language', 'token', 'roleId', 'firstName'],
    stateReconciler: autoMergeLevel2,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
